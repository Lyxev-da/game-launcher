import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { warmCloverSprites } from "./clover";
import {
  CRYSTAL_REBIRTHS, TIERS, TOTAL_ENTRIES, UPGRADES, autoInterval, canRebirth,
  clearSave, crystalUnlocked, cursedUnlocked, glitchedUnlocked, CURSED_REBIRTHS, GLITCHED_REBIRTHS, discoveredCount, fmtOdds, getCrystalChance, getCursedChance, getGlitchedChance, doRebirth, fmt, getLuck, newSave,
  rebirthCost, rollBatch, rollsPerClick, valueMult, ROLL_DURATION, tierProbabilities, drawTier,
  addLifetime,
  type RollResult, type UpgradeId,
} from "./game/data";
import { useGameSession } from "./game/useGameSession";
import { sfx } from "./game/sound";
import { Block, BlockButton, CloverImg, PixelIcon, RarityText, variantPrefix } from "./components/ui";
import { IndexModal, Modal, OfflineModal, RebirthModal, RevealBanner, SettingsModal, ShopModal, type RevealData } from "./components/panels";
import { ParticleCanvas, type ParticleHandle } from "./components/ParticleCanvas";
import { RollHistory } from "./components/RollHistory";

type ModalName = "shop" | "index" | "settings" | "history" | "rebirth" | "offline";
/** Hot-pink hue shared by the rebirth icon and every rebirth panel/button. */
const REBIRTH_HUE = 330;
const FEED_LIMIT = 60;
/** The rarity rail: 36 cells scroll past the marker; the real result sits at cell 30. */
const SPIN_ITEMS = 36;
const SPIN_TARGET = 30;
/** The reel stops this early, leaving a beat for the landing flash before the reveal. */
const SPIN_SETTLE = 420;
type SpinState = { key: number; items: Array<{ tier: number; variant: RollResult["variant"] }>; jitter: number; hue: number };

export default function App() {
  const { save, saveRef, commit, ownerRef, status, storageEnabled, saveError, persistNow, claimOffline, retrySession } = useGameSession();
  const worldRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glyphRef = useRef<HTMLSpanElement>(null);
  const particleRef = useRef<ParticleHandle>(null);
  const pointerBounds = useRef<DOMRect | null>(null);
  const ids = useRef(0);
  const [lastRoll, setLastRoll] = useState<{ tier: number; variant: RollResult["variant"] }>({ tier: 0, variant: "normal" });
  const [spin, setSpin] = useState<SpinState | null>(null);
  const spinTimer = useRef<number | undefined>(undefined);
  const spinEndAt = useRef(0);
  const spinKey = useRef(0);
  const burstTimer = useRef<number | undefined>(undefined);
  const shownOfflineReceipt = useRef<string | null>(null);
  const [offlineClaimError, setOfflineClaimError] = useState(false);
  const readyAt = useRef(0);
  const autoReadyAt = useRef(0);
  const cooldownTimer = useRef<number | undefined>(undefined);
  const bannerTimer = useRef<number | undefined>(undefined);
  const glyphAnimation = useRef<Animation | null>(null);
  const [cooldown, setCooldown] = useState({ active: false, duration: ROLL_DURATION, token: 0 });
  const [feed, setFeed] = useState<RollResult[]>([]);
  const [banner, setBanner] = useState<RevealData | null>(null);
  const [glitchFlash, setGlitchFlash] = useState(0);
  const flashTimer = useRef<number | undefined>(undefined);
  const [modal, setModal] = useState<ModalName | null>(null);
  const modalRef = useRef<ModalName | null>(null);
  const [visible, setVisible] = useState(() => !document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const effects = !save.performance && !reducedMotion;
  const effectsRef = useRef(effects);
  effectsRef.current = effects;
  const luck = getLuck(save);
  const found = discoveredCount(save);
  const shownTier = TIERS[lastRoll.tier];
  const shownCrystal = lastRoll.variant === "crystal";
  const shownCursed = lastRoll.variant === "cursed";
  const shownGlitched = lastRoll.variant === "glitched";
  const sessionBlocked = status !== "active";
  const uiBlocked = !!modal || sessionBlocked;
  const canAfford = UPGRADES.some((upgrade) => save.upgrades[upgrade.id] < upgrade.max && save.clovers >= upgrade.cost(save.upgrades[upgrade.id]));
  const rebirthReady = canRebirth(save);
  const crystals = crystalUnlocked(save);
  const cursedOn = cursedUnlocked(save);
  const glitchedOn = glitchedUnlocked(save);
  // All-time play time: counted every 15 seconds while the tab is visible and we own the save.
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!ownerRef.current || document.hidden) return;
      const current = saveRef.current;
      commit({ ...current, lifetime: { ...current.lifetime, playMs: current.lifetime.playMs + 15000 } });
    }, 15000);
    return () => window.clearInterval(timer);
  }, [commit, ownerRef, saveRef]);

  useEffect(() => { sfx.enabled = save.sound; }, [save.sound]);
  useEffect(() => warmCloverSprites(TIERS, crystals, cursedOn, glitchedOn), [crystals, cursedOn, glitchedOn]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReducedMotion(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    const visibility = () => {
      setVisible(!document.hidden);
      if (document.hidden) sfx.stopAll();
    };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);

  useEffect(() => {
    const reward = save.offlineReward;
    if (sessionBlocked || !visible || !reward || shownOfflineReceipt.current === reward.id) return;
    shownOfflineReceipt.current = reward.id;
    setOfflineClaimError(false);
    modalRef.current = "offline";
    setModal("offline");
    particleRef.current?.clear();
  }, [save.offlineReward, sessionBlocked, visible]);

  const beginCooldown = useCallback((duration: number, now = performance.now()) => {
    readyAt.current = now + duration;
    window.clearTimeout(cooldownTimer.current);
    setCooldown((previous) => ({ active: true, duration, token: previous.token + 1 }));
    cooldownTimer.current = window.setTimeout(() => setCooldown((previous) => ({ ...previous, active: false })), duration);
  }, []);

  const burstFor = useCallback((result: RollResult, value: number) => {
    if (!effectsRef.current) return;
    const world = worldRef.current?.getBoundingClientRect();
    const button = buttonRef.current?.getBoundingClientRect();
    if (!world || !button) return;
    particleRef.current?.burst({
      x: button.left + button.width / 2 - world.left,
      y: button.top + button.height / 2 - world.top,
      tier: result.tier,
      variant: result.variant,
      value,
    });
  }, []);

  /**
   * One roll = one 3.2-second spin of the rarity rail. The outcome is decided
   * and saved the instant the spin starts; only the presentation waits for the
   * rail to stop. Manual clicks and the auto roller share the same rail, so
   * exactly one spin runs at a time.
   */
  const doRoll = useCallback((source: "manual" | "auto" = "manual") => {
    const now = performance.now();
    const gate = source === "auto" ? autoReadyAt : readyAt;
    // Extra input is rejected before any RNG, sound, DOM or state work happens.
    if (!ownerRef.current || now < gate.current || now < spinEndAt.current || modalRef.current || document.hidden) return;
    const current = saveRef.current;
    beginCooldown(ROLL_DURATION, now);
    spinEndAt.current = now + ROLL_DURATION;
    autoReadyAt.current = Math.max(autoReadyAt.current, now + autoInterval(current));
    const batch = rollBatch(current, () => ++ids.current);
    if (!commit(addLifetime(batch.next, batch.results))) return;
    if (!document.hidden) sfx.spin(ROLL_DURATION / 1000);

    // The rail: random fillers drawn from the player's real odds, with the true result at the marker.
    if (effectsRef.current) {
      const probabilities = tierProbabilities(getLuck(current));
      const items = Array.from({ length: SPIN_ITEMS }, (_, i) =>
        i === SPIN_TARGET
          ? { tier: batch.best.tier, variant: batch.best.variant }
          : { tier: drawTier(probabilities), variant: (Math.random() < 0.06 ? "shiny" : "normal") as RollResult["variant"] });
      const win = batch.best;
      const winHue = win.variant === "glitched" ? 185 : win.variant === "cursed" ? 345 : win.variant === "crystal" ? 203 : TIERS[win.tier].hue;
      setSpin({ key: ++spinKey.current, items, jitter: (Math.random() - 0.5) * 26, hue: winHue });
    }

    window.clearTimeout(spinTimer.current);
    spinTimer.current = window.setTimeout(() => {
      spinEndAt.current = 0;
      setSpin(null);
      const best = batch.best;
      if (effectsRef.current) {
        glyphAnimation.current?.cancel();
        glyphAnimation.current = glyphRef.current?.animate([
          { transform: "scale(1) rotate(0deg)" },
          { transform: "scale(0.91) rotate(-3deg)", offset: 0.25 },
          { transform: "scale(1.045) rotate(2deg)", offset: 0.65 },
          { transform: "scale(1) rotate(0deg)" },
        ], { duration: 360, easing: "ease-out" }) ?? null;
      }
      setFeed((previous) => [...batch.results.slice().reverse(), ...previous].slice(0, FEED_LIMIT));
      setLastRoll({ tier: best.tier, variant: best.variant });
      const crystal = best.variant === "crystal";
      const data: RevealData = { key: best.id, tier: best.tier, variant: best.variant, crit: best.crit, value: best.value, isNew: best.isNew };
      if (!document.hidden && !modalRef.current) sfx.roll(best.tier, best.variant === "shiny", best.crit, crystal, best.variant === "cursed", best.variant === "glitched");
      if (TIERS[best.tier].drama >= 1 || best.variant !== "normal" || best.isNew) {
        window.clearTimeout(bannerTimer.current);
        setBanner(data);
        // Glitched finds hold the banner longer so its animation can play out.
        bannerTimer.current = window.setTimeout(() => setBanner(null), best.variant === "glitched" ? 3400 : 1800);
      }
      if (best.variant === "glitched" && effectsRef.current) {
        window.clearTimeout(flashTimer.current);
        setGlitchFlash((n) => n + 1);
        flashTimer.current = window.setTimeout(() => setGlitchFlash(0), 820);
      }
      burstFor(best, batch.gained);
    }, ROLL_DURATION);
  }, [beginCooldown, burstFor, commit, ownerRef, saveRef]);

  /** Drops an in-flight spin (the outcome is already saved) after a rebirth or reset. */
  const cancelSpin = useCallback(() => {
    window.clearTimeout(spinTimer.current);
    spinEndAt.current = 0;
    setSpin(null);
  }, []);

  // Auto roll is a second roller on its own timer, running beside manual clicks.
  useEffect(() => {
    if (sessionBlocked || !save.auto || !autoInterval(save) || modal || !visible) return;
    let timer = 0;
    const tick = () => {
      doRoll("auto");
      timer = window.setTimeout(tick, Math.max(autoInterval(saveRef.current), autoReadyAt.current - performance.now() + 4));
    };
    timer = window.setTimeout(tick, Math.max(autoInterval(save), autoReadyAt.current - performance.now() + 4));
    return () => window.clearTimeout(timer);
  }, [save.auto, save.upgrades.auto, modal, visible, doRoll, sessionBlocked, saveRef]);

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      if (!ownerRef.current) return;
      if (event.code === "Escape") {
        if (modalRef.current) { modalRef.current = null; setModal(null); }
        return;
      }
      if (event.code !== "Space" || modalRef.current) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
      if (target instanceof HTMLElement && target.closest("button") && target !== buttonRef.current) return;
      event.preventDefault();
      if (event.repeat) return; // holding Space never repeats
      doRoll("manual");
    };
    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  }, [doRoll, ownerRef]);

  useEffect(() => () => {
    window.clearTimeout(cooldownTimer.current);
    window.clearTimeout(bannerTimer.current);
    window.clearTimeout(burstTimer.current);
    window.clearTimeout(flashTimer.current);
    window.clearTimeout(spinTimer.current);
    glyphAnimation.current?.cancel();
    sfx.stopAll();
  }, []);

  const closeModal = () => { modalRef.current = null; setModal(null); };
  const openModal = (name: ModalName) => { if (!ownerRef.current) return; sfx.open(); modalRef.current = name; setModal(name); if (name === "offline") setOfflineClaimError(false); particleRef.current?.clear(); };

  const buy = (id: UpgradeId, max = false) => {
    if (!ownerRef.current) return;
    const current = saveRef.current;
    const upgrade = UPGRADES.find((item) => item.id === id)!;
    let level = current.upgrades[id];
    let wallet = current.clovers;
    let purchased = 0;
    while (level < upgrade.max && wallet >= upgrade.cost(level)) {
      wallet -= upgrade.cost(level++);
      purchased++;
      if (!max) break;
    }
    if (!purchased) return sfx.deny();
    if (!commit({ ...current, clovers: wallet, upgrades: { ...current.upgrades, [id]: level }, auto: id === "auto" && current.upgrades.auto === 0 ? true : current.auto })) return;
    persistNow();
    sfx.buy();
  };

  const toggleAuto = () => {
    if (!ownerRef.current) return;
    const current = saveRef.current;
    sfx.click();
    commit({ ...current, auto: !current.auto });
    persistNow();
  };

  const rebirth = () => {
    if (!ownerRef.current) return;
    const current = saveRef.current;
    if (!canRebirth(current)) return sfx.deny();
    if (!window.confirm(`Rebirth now for ${fmt(rebirthCost(current.rebirths))} clovers?\n\nThis wipes your clovers and upgrades. Your index and settings stay.`)) return;
    if (!commit(doRebirth(current))) return;
    persistNow();
    cancelSpin();
    setFeed([]);
    setLastRoll({ tier: 0, variant: "normal" });
    window.clearTimeout(burstTimer.current);
    setBanner(null);
    particleRef.current?.clear();
    window.clearTimeout(bannerTimer.current);
    closeModal();
    sfx.rebirth();
    beginCooldown(300);
  };

  const reset = () => {
    if (!window.confirm("Reset all clovers, upgrades, rebirths and discoveries?")) return;
    if (!ownerRef.current) return;
    const old = saveRef.current;
    if (!commit({ ...newSave(), sound: old.sound, performance: old.performance })) return;
    clearSave();
    persistNow();
    cancelSpin();
    setFeed([]);
    setLastRoll({ tier: 0, variant: "normal" });
    window.clearTimeout(burstTimer.current);
    setBanner(null);
    particleRef.current?.clear();
    window.clearTimeout(bannerTimer.current);
    closeModal();
  };

  const collectOffline = () => {
    const receipt = saveRef.current.offlineReward;
    if (!receipt) return closeModal();
    const collected = claimOffline(receipt.id);
    if (collected === null) { setOfflineClaimError(true); return; }
    setOfflineClaimError(false);
    closeModal();
    sfx.collectOffline();
    beginCooldown(220);
  };

  return (
    <main className={`world${!effects ? " low-effects" : ""}${uiBlocked || !visible ? " is-paused" : ""}`} ref={worldRef}>
      <div className="world-grid" aria-hidden="true" />
      <div className="world-glow" aria-hidden="true" />

      {/* ---------- TOP HUD ---------- */}
      <header className="hud-top" inert={uiBlocked}>
        <div className="hud-logo">
          <CloverImg tier={0} size="sm" className="logo-clover" />
          <span className="logo-copy">
            <span className="tx-stroke logo-title">CLOVER <em>RNG</em></span>
            <span className="tx-label logo-sub">ROLL FOR RARITY</span>
          </span>
        </div>

        <div className="hud-stats">
          <Block className="stat" faceClassName="stat-face">
            <CloverImg tier={0} size="sm" className="stat-icon" />
            <span className="stat-copy">
              <span className="tx-stroke stat-value">{fmt(save.clovers)}</span>
              <span className="tx-label">CLOVERS</span>
            </span>
          </Block>
          <Block className="stat" faceClassName="stat-face">
            <PixelIcon name="gem" className="stat-gem" />
            <span className="stat-copy">
              <span className={`tx-stroke stat-value is-gold${save.luckScale < 1 ? " is-dimmed" : ""}`}>x{luck < 0.01 ? luck.toFixed(3) : luck.toFixed(2)}</span>
              <span className="tx-label">LUCK</span>
            </span>
          </Block>
          {save.rebirths > 0 && (
            <Block tone="dark" className="stat stat-rebirth" faceClassName="stat-face">
              <PixelIcon name="rebirth" className="stat-gem" />
              <span className="stat-copy">
                <span className="tx-stroke stat-value is-fire">{save.rebirths}</span>
                <span className="tx-label">REBIRTHS</span>
              </span>
            </Block>
          )}
        </div>

        <div className="hud-actions">
          <div className="offline-action">
            <BlockButton tone={save.offlineReward ? "gold" : "metal"} className="settings-btn offline-btn" faceClassName="settings-face" onClick={() => openModal("offline")} aria-label={save.offlineReward ? `${fmt(save.offlineReward.amount)} offline clovers ready to collect` : "View offline earnings"} title="Offline earnings">
              <PixelIcon name="offline" />
            </BlockButton>
            {save.offlineReward && <Block tone="green" className="offline-badge" faceClassName="offline-badge-face"><span className="tx-stroke">+</span></Block>}
          </div>
          <BlockButton className="settings-btn" faceClassName="settings-face" onClick={() => openModal("settings")} aria-label="Open settings">
            <PixelIcon name="gear" />
          </BlockButton>
        </div>
      </header>

      {/* ---------- LEFT DOCK ---------- */}
      <nav className="dock" aria-label="Game menu" inert={uiBlocked}>
        <div className="dock-item">
          <BlockButton className="dock-btn" faceClassName="dock-face" onClick={() => openModal("shop")} aria-label="Open shop">
            <PixelIcon name="bag" className="dock-icon" />
            <span className="tx-stroke dock-label">SHOP</span>
          </BlockButton>
          {canAfford && <Block tone="red" className="dock-badge" faceClassName="dock-badge-face"><span className="tx-stroke">!</span></Block>}
        </div>

        <div className="dock-item">
          <BlockButton className="dock-btn" faceClassName="dock-face" onClick={() => openModal("index")} aria-label={`Open index, ${found} of ${TOTAL_ENTRIES} discovered`}>
            <PixelIcon name="book" className="dock-icon" />
            <span className="tx-stroke dock-label">INDEX</span>
          </BlockButton>
          <Block tone="tint" className="dock-badge is-wide" faceClassName="dock-badge-face" style={{ "--h": 272 } as CSSProperties}>
            <span className="tx-stroke">{found}/{TOTAL_ENTRIES}</span>
          </Block>
        </div>

        <div className="dock-item">
          <BlockButton tone={rebirthReady ? "tint" : "metal"} style={rebirthReady ? ({ "--h": REBIRTH_HUE } as CSSProperties) : undefined} className={`dock-btn rebirth-dock${rebirthReady ? " is-ready" : ""}`} faceClassName="dock-face" onClick={() => openModal("rebirth")} aria-label={rebirthReady ? "Rebirth is ready" : "Open rebirth"}>
            <PixelIcon name="rebirth" className="dock-icon" />
            <span className="tx-stroke dock-label">REBIRTH</span>
          </BlockButton>
          {rebirthReady ? (
            <Block tone="tint" className="dock-badge" faceClassName="dock-badge-face" style={{ "--h": REBIRTH_HUE } as CSSProperties}><span className="tx-stroke">!</span></Block>
          ) : save.rebirths > 0 ? (
            <Block tone="dark" className="dock-badge is-wide" faceClassName="dock-badge-face"><span className="tx-stroke">{save.rebirths}</span></Block>
          ) : null}
        </div>

        <div className="dock-item history-dock">
          <BlockButton className="dock-btn" faceClassName="dock-face" onClick={() => openModal("history")} aria-label="Open recent rolls">
            <PixelIcon name="log" className="dock-icon" />
            <span className="tx-stroke dock-label">LOG</span>
          </BlockButton>
        </div>
      </nav>

      {/* ---------- RIGHT FEED ---------- */}
      <aside className="feed" aria-label="Recent rolls" inert={uiBlocked}>
        <Block faceClassName="feed-face">
          <span className="tx-stroke feed-title">RECENT ROLLS</span>
          <RollHistory feed={feed} />
        </Block>
      </aside>

      {/* ---------- CENTER STAGE ---------- */}
      <section className="play-space" aria-label="Clover roller" inert={uiBlocked}>
        <div className={`stage stage-${shownTier.id}${shownCrystal ? " is-crystal-stage" : ""}${shownCursed ? " is-cursed-stage" : ""}${shownGlitched ? " is-glitched-stage" : ""}`} style={{ "--h": shownGlitched ? 185 : shownCursed ? 345 : shownCrystal ? 203 : shownTier.hue } as CSSProperties}>
          <div className="stage-light" aria-hidden="true" />
          {spin && effects && <SpinRail spin={spin} />}

          <button
            ref={buttonRef}
            className={`luck-button${cooldown.active ? " is-cooling" : ""}`}
            type="button"
            disabled={cooldown.active || sessionBlocked}
            onPointerDown={() => {
              if (cooldown.active || sessionBlocked) return;
              sfx.press();
              if (navigator.vibrate) navigator.vibrate(8);
            }}
            onClick={() => doRoll("manual")}
            onKeyDown={(event) => { if (event.repeat && (event.code === "Enter" || event.code === "Space")) event.preventDefault(); }}
            onKeyUp={(event) => { if (event.code === "Space") event.preventDefault(); }}
            onPointerEnter={(event) => { pointerBounds.current = event.currentTarget.getBoundingClientRect(); }}
            onPointerMove={(event) => {
              if (!effects || event.pointerType !== "mouse" || !pointerBounds.current) return;
              const rect = pointerBounds.current;
              const x = clampUnit((event.clientX - rect.left) / rect.width - 0.5);
              const y = clampUnit((event.clientY - rect.top) / rect.height - 0.5);
              // The tilt snaps to blocky 4-degree steps, like the pixel edges.
              const ry = Math.round(x * 3) * 4;
              const rx = Math.round(-y * 3) * 4;
              event.currentTarget.style.setProperty("--ry", `${ry}deg`);
              event.currentTarget.style.setProperty("--rx", `${rx}deg`);
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty("--ry", "0deg");
              event.currentTarget.style.setProperty("--rx", "0deg");
              pointerBounds.current = null;
            }}
            aria-label={`Roll for a clover. Last roll: ${variantPrefix(lastRoll.variant).toLowerCase()}${shownTier.name}. Luck x${luck.toFixed(2)}.`}
            aria-keyshortcuts="Space Enter"
          >
            <span className="hex-frame" aria-hidden="true">
              <span className="hex-face">
                <span ref={glyphRef} className="clover-pop">
                  <CloverImg tier={lastRoll.tier} variant={lastRoll.variant} size="lg" className="hero-clover" animated={effects && !modal} effects={effects} />
                </span>
              </span>
            </span>
            <span className="button-shadow" aria-hidden="true" />
          </button>

          <span className="stage-spark stage-spark-one" aria-hidden="true" />
          <span className="stage-spark stage-spark-two" aria-hidden="true" />
          <span className="stage-spark stage-spark-three" aria-hidden="true" />
          <span className="stage-spark stage-spark-four" aria-hidden="true" />
        </div>

        <div className="play-copy">
          <p className="tx-stroke roll-cta">CLICK TO ROLL!</p>

          <div className="cool-row">
            <div className={`cool${cooldown.active ? " is-active" : ""}`}>
              <span className="tx-label">ROLLING</span>
              <span className="cooldown-track px">
                <i key={cooldown.token} className={cooldown.active ? "is-filling" : ""} style={{ "--roll-duration": `${cooldown.duration}ms` } as CSSProperties} />
              </span>
              <span className={`tx-stroke cool-state${cooldown.active ? "" : " is-ready"}`}>{cooldown.active ? "WAIT" : "READY"}</span>
            </div>
            <BlockButton
              tone={save.auto ? "green" : "metal"}
              className="auto-btn"
              faceClassName="auto-btn-face"
              onClick={toggleAuto}
              aria-pressed={save.auto}
              aria-label="Toggle auto roll"
            >
              <PixelIcon name="auto" muted={!save.auto} className="auto-btn-icon" />
              <span className="tx-stroke auto-btn-label">AUTO</span>
              <span className="tx-label auto-btn-state">{save.auto ? "ON" : "OFF"}</span>
            </BlockButton>
          </div>

          <div className="roll-chips">
            <Block tone="dark" className="chip chip-last-roll" faceClassName="chip-face">
              <CloverImg tier={lastRoll.tier} variant={lastRoll.variant} size="sm" sparkles={false} effects={false} className="chip-clover" />
              <span className="tx-label">LAST</span>
              <RarityText tier={lastRoll.tier} variant={lastRoll.variant} animated={effects} className="chip-name">{variantPrefix(lastRoll.variant)}{shownTier.label}</RarityText>
            </Block>
            <Block tone="dark" className="chip" faceClassName="chip-face">
              <PixelIcon name="dice" className="chip-icon" />
              <span className="tx-stroke chip-value">x{rollsPerClick(save)}</span>
              <span className="tx-label">PER CLICK</span>
            </Block>
            <Block tone="dark" className="chip" faceClassName="chip-face">
              <PixelIcon name="coin" className="chip-icon" />
              <span className="tx-stroke chip-value">x{valueMult(save).toFixed(1)}</span>
              <span className="tx-label">VALUE</span>
            </Block>
            <Block tone="dark" className="chip" faceClassName="chip-face">
              <PixelIcon name="log" className="chip-icon" />
              <span className="tx-stroke chip-value">{fmt(save.rolls)}</span>
              <span className="tx-label">ROLLS</span>
            </Block>
            {crystals && (
              <Block tone="tint" className="chip chip-crystal" faceClassName="chip-face" style={{ "--h": 203 } as CSSProperties}>
                <PixelIcon name="crystal" className="chip-icon" />
                <span className="tx-label">CRYSTAL</span>
                <span className="tx-stroke chip-value">1 IN {fmtOdds(1 / getCrystalChance(save))}</span>
              </Block>
            )}
            {cursedOn && (
              <Block tone="tint" className="chip chip-crystal chip-cursed" faceClassName="chip-face" style={{ "--h": 345 } as CSSProperties}>
                <PixelIcon name="cursed" className="chip-icon" />
                <span className="tx-label">CURSED</span>
                <span className="tx-stroke chip-value">1 IN {fmtOdds(1 / getCursedChance(save))}</span>
              </Block>
            )}
            {glitchedOn && (
              <Block tone="tint" className="chip chip-crystal chip-glitched" faceClassName="chip-face" style={{ "--h": 185 } as CSSProperties}>
                <PixelIcon name="glitched" className="chip-icon" />
                <span className="tx-label">GLITCHED</span>
                <span className="tx-stroke chip-value">1 IN {fmtOdds(1 / getGlitchedChance(save))}</span>
              </Block>
            )}
          </div>

          <p className="tx-label space-hint">{save.rebirths >= 1 && !crystals ? `OR PRESS SPACE / ${CRYSTAL_REBIRTHS - save.rebirths} MORE REBIRTH${CRYSTAL_REBIRTHS - save.rebirths === 1 ? "" : "S"} TO UNLOCK CRYSTALS` : crystals && !cursedOn ? `OR PRESS SPACE / ${CURSED_REBIRTHS - save.rebirths} MORE REBIRTH${CURSED_REBIRTHS - save.rebirths === 1 ? "" : "S"} TO UNLOCK CURSED` : cursedOn && !glitchedOn ? `OR PRESS SPACE / ${GLITCHED_REBIRTHS - save.rebirths} MORE REBIRTH${GLITCHED_REBIRTHS - save.rebirths === 1 ? "" : "S"} TO UNLOCK GLITCHED` : "OR PRESS SPACE"}</p>
        </div>
      </section>

      {/* ---------- FX ---------- */}
      <ParticleCanvas ref={particleRef} enabled={effects} paused={uiBlocked || !visible} />
      {banner && !modal && !sessionBlocked && <RevealBanner key={banner.key} data={banner} />}
      {glitchFlash > 0 && effects && (
        <div key={glitchFlash} className="glitch-flash" aria-hidden="true">
          <i className="glitch-flash-bar glitch-flash-bar-a" /><i className="glitch-flash-bar glitch-flash-bar-b" /><i className="glitch-flash-bar glitch-flash-bar-c" />
        </div>
      )}

      {modal === "shop" && <ShopModal save={save} onBuy={(id) => buy(id)} onBuyMax={(id) => buy(id, true)} onClose={closeModal} />}
      {modal === "index" && <IndexModal save={save} onClose={closeModal} />}
      {modal === "rebirth" && <RebirthModal save={save} onRebirth={rebirth} onClose={closeModal} />}
      {modal === "offline" && !sessionBlocked && <OfflineModal save={save} effects={effects} storageEnabled={storageEnabled} claimError={offlineClaimError} onClaim={collectOffline} onEnableAuto={() => { if (commit({ ...saveRef.current, auto: true })) { persistNow(); sfx.click(); closeModal(); } }} onOpenShop={() => openModal("shop")} onClose={closeModal} />}
      {modal === "history" && (
        <Modal title="RECENT ROLLS" headTone="tint" headHue={199} icon="log" onClose={closeModal}>
          <RollHistory feed={feed} />
        </Modal>
      )}
      {modal === "settings" && (
        <SettingsModal
          save={save}
          onToggleSound={() => { const next = !saveRef.current.sound; sfx.enabled = next; commit({ ...saveRef.current, sound: next }); if (next) sfx.click(); }}
          onTogglePerformance={() => { sfx.click(); commit({ ...saveRef.current, performance: !saveRef.current.performance }); }}
          onLuckScale={(scale) => { sfx.click(); commit({ ...saveRef.current, luckScale: scale }); }}
          onReset={reset}
          onClose={closeModal}
        />
      )}
      {sessionBlocked && visible && <Modal title={status === "other-tab" ? "ONE SAVE. ONE SESSION." : "LOADING YOUR SAVE"} headTone="gold" icon="offline" onClose={retrySession} dismissible={false} className="session-modal">
        <div className="session-notice">
          <PixelIcon name="offline" className="session-icon" />
          <span className="tx-stroke">{status === "other-tab" ? "YOUR CLOVERS ARE SAFE" : "JUST A MOMENT..."}</span>
          <p>{status === "other-tab" ? "This game is active in another tab. Close or switch away from that tab to continue here. Your rewards can only be collected once." : "Checking your saved progress and offline rewards."}</p>
          {status === "other-tab" && <BlockButton tone="green" className="session-retry" faceClassName="session-retry-face" onClick={retrySession}><span className="tx-stroke">TRY AGAIN</span></BlockButton>}
          {saveError && <p className="offline-error">Browser storage could not be accessed. Please check your browser settings.</p>}
        </div>
      </Modal>}
    </main>
  );
}

const clampUnit = (n: number) => Math.max(-0.5, Math.min(0.5, n));

/**
 * The horizontal rarity rail. Remounts per spin (key), starts at rest and
 * decelerates over the full roll so the marked result lands under the pointer.
 */
function SpinRail({ spin }: { spin: SpinState }) {
  const railRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [landed, setLanded] = useState(false);

  // The reel stops just before the reveal; the last beat is a colour hit on the winning slot.
  useEffect(() => {
    setLanded(false);
    const timer = window.setTimeout(() => setLanded(true), ROLL_DURATION - SPIN_SETTLE);
    return () => window.clearTimeout(timer);
  }, [spin.key]);

  useLayoutEffect(() => {
    const rail = railRef.current;
    const strip = stripRef.current;
    const cell = strip?.children[0] as HTMLElement | undefined;
    if (!rail || !strip || !cell) return;
    const gap = parseFloat(getComputedStyle(strip).columnGap || "8") || 8;
    const pad = parseFloat(getComputedStyle(strip).paddingLeft || "8") || 8;
    const target = pad + SPIN_TARGET * (cell.offsetWidth + gap) + cell.offsetWidth / 2;
    const dx = Math.max(0, target - rail.clientWidth / 2 + spin.jitter);
    strip.style.transition = "none";
    strip.style.transform = "translateX(0)";
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        strip.style.transition = `transform ${ROLL_DURATION - SPIN_SETTLE}ms cubic-bezier(0.1, 0.72, 0.12, 1)`;
        strip.style.transform = `translateX(${-dx}px)`;
      });
    });
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
  }, [spin.key, spin.jitter]);

  return (
    <div className={`spin-rail${landed ? " is-landed" : ""}`} style={{ "--win": spin.hue } as CSSProperties} aria-hidden="true">
      <Block tone="dark" className="spin-frame" faceClassName="spin-frame-face">
        <span className="tx-label spin-caption">ROLLING</span>
        <div ref={railRef} className="spin-window px">
          <div ref={stripRef} className="spin-strip">
            {spin.items.map((item, index) => {
              const tier = TIERS[item.tier];
              const hue = item.variant === "glitched" ? 185 : item.variant === "cursed" ? 345 : item.variant === "crystal" ? 203 : tier.hue;
              return (
                <span
                  key={index}
                  className={`spin-cell px${index === SPIN_TARGET ? " is-target" : ""}`}
                  style={{ "--h": hue, "--rc": item.variant === "normal" && !tier.rainbow ? tier.color : "#ffffff" } as CSSProperties}
                >
                  <CloverImg tier={item.tier} variant={item.variant} size="sm" sparkles={false} effects={false} className="spin-clover" />
                  <i className="spin-cell-bar" />
                </span>
              );
            })}
          </div>
          <i className="spin-fade spin-fade-l" />
          <i className="spin-fade spin-fade-r" />
          <i className="spin-beam" />
        </div>
      </Block>
      <i className="spin-marker spin-marker-top" />
      <i className="spin-marker spin-marker-bottom" />
    </div>
  );
}
