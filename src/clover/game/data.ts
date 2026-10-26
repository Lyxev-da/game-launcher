// @ts-nocheck
export const SAVE_VERSION = 8;

export type Tier = {
  id: string;
  label: string;
  name: string;
  chance: number;
  value: number;
  hue: number;
  rainbow?: boolean;
  color: string;
  particles: number;
  drama: 0 | 1 | 2 | 3 | 4;
  effect: string;
  added?: boolean;
};

export const TIERS: Tier[] = ([
  { id: "common", label: "COMMON", name: "Clover", chance: 1, value: 1, hue: 131, color: "#5df25f", particles: 12, drama: 0, effect: "The original four-leaf lucky charm" },
  { id: "uncommon", label: "UNCOMMON", name: "Mint Clover", chance: 4, value: 4, hue: 162, color: "#3ff2c0", particles: 14, drama: 0, effect: "Dewdrop jewels and etched mint veins" },
  { id: "rare", label: "RARE", name: "Frost Clover", chance: 18, value: 18, hue: 199, color: "#73d7ff", particles: 16, drama: 1, effect: "Frozen branches and crystalline ice shards" },
  { id: "epic", label: "EPIC", name: "Void Clover", chance: 60, value: 70, hue: 272, color: "#c07bff", particles: 18, drama: 1, effect: "Fractured leaves around a dark vortex" },
  { id: "legendary", label: "LEGENDARY", name: "Golden Clover", chance: 180, value: 240, hue: 45, color: "#ffd23f", particles: 22, drama: 2, effect: "A pixel crown, gold filigree and a royal gleam" },
  { id: "mythic", label: "MYTHIC", name: "Ruby Clover", chance: 450, value: 750, hue: 352, color: "#ff6782", particles: 24, drama: 2, effect: "A faceted ruby core with ember sparks" },
  { id: "divine", label: "DIVINE", name: "Seraph Clover", chance: 900, value: 1800, hue: 32, color: "#ffcc92", particles: 28, drama: 3, effect: "An ivory sun rune and a floating halo" },
  { id: "cosmic", label: "COSMIC", name: "Nebula Clover", chance: 1800, value: 4200, hue: 232, color: "#9bb3ff", particles: 30, drama: 3, effect: "A star-speckled nebula and orbiting stardust" },
  { id: "eclipse", label: "ECLIPSE", name: "Eclipse Clover", chance: 3500, value: 9500, hue: 292, color: "#e7a1ff", particles: 32, drama: 3, effect: "Shadowed leaves encircled by a violet corona" },
  { id: "aurora", label: "AURORA", name: "Aurora Clover", chance: 6500, value: 20000, hue: 176, color: "#80ffe0", particles: 34, drama: 4, effect: "Northern-light ribbons with a luminous crystal core" },
  { id: "singularity", label: "SINGULARITY", name: "Singularity Clover", chance: 11000, value: 45000, hue: 258, color: "#c6acff", particles: 36, drama: 4, effect: "A black-hole core and an orbiting accretion disc" },
  { id: "prismatic", label: "PRISMATIC", name: "Prism Clover", chance: 18000, value: 100000, hue: 0, rainbow: true, color: "#ffffff", particles: 40, drama: 4, effect: "Four gemstone leaves, prismatic shards and a rainbow sheen" },
  { id: "solar", label: "SOLAR", name: "Solar Clover", chance: 26000, value: 150000, hue: 38, color: "#ffd23f", particles: 40, drama: 3, effect: "Sunray flares spill gold across four petals" },
  { id: "moonlit", label: "MOONLIT", name: "Moonlit Clover", chance: 40000, value: 230000, hue: 222, color: "#dfe9ff", particles: 42, drama: 3, effect: "A silver crescent bitten from every leaf" },
  { id: "tidal", label: "TIDAL", name: "Tidal Clover", chance: 60000, value: 350000, hue: 192, color: "#7ff0ff", particles: 44, drama: 3, effect: "Rolling waves carved into wet green leaves" },
  { id: "inferno", label: "INFERNO", name: "Inferno Clover", chance: 90000, value: 520000, hue: 16, color: "#ff8a4a", particles: 46, drama: 4, effect: "Stepped flame tongues licking every leaf" },
  { id: "glacier", label: "GLACIER", name: "Glacier Clover", chance: 140000, value: 800000, hue: 205, color: "#9fe2ff", particles: 48, drama: 4, effect: "A hollow ring of ice with cracked, glassy leaves" },
  { id: "sakura", label: "SAKURA", name: "Sakura Clover", chance: 220000, value: 1300000, hue: 330, color: "#ffb3d6", particles: 50, drama: 4, effect: "Bloom-shaped petals drifting with pixel blossoms" },
  { id: "thunder", label: "THUNDER", name: "Thunder Clover", chance: 340000, value: 2100000, hue: 56, color: "#fff36b", particles: 52, drama: 4, effect: "Diamond-cut leaves split by lightning streaks" },
  { id: "verdant", label: "VERDANT", name: "Verdant Clover", chance: 520000, value: 3200000, hue: 118, color: "#9dff8a", particles: 54, drama: 4, effect: "Teardrop leaves wrapped in climbing vines" },
  { id: "obsidian", label: "OBSIDIAN", name: "Obsidian Clover", chance: 800000, value: 5000000, hue: 270, color: "#b48cff", particles: 56, drama: 4, effect: "Squared black glass with violet facets" },
  { id: "celestial", label: "CELESTIAL", name: "Celestial Clover", chance: 1200000, value: 7500000, hue: 240, color: "#c8d8ff", particles: 58, drama: 4, effect: "Four-point star leaves scattered with starlight" },
  { id: "chrono", label: "CHRONO", name: "Chrono Clover", chance: 1800000, value: 12000000, hue: 35, color: "#e0a84e", particles: 60, drama: 4, effect: "Gear-toothed leaves that turn the clock back" },
  { id: "infinite", label: "INFINITE", name: "Infinite Clover", chance: 4000000, value: 30000000, hue: 290, color: "#ffe27a", particles: 64, drama: 4, effect: "A figure-eight of light carved into every leaf" },
  { id: "dewdrop", label: "DEWDROP", name: "Dewdrop Clover", chance: 8, value: 8, hue: 181, color: "#8ceadd", particles: 14, drama: 0, effect: "Pearl-edged leaves holding four tiny drops of morning dew", added: true },
  { id: "copper", label: "COPPER", name: "Copper Clover", chance: 32, value: 36, hue: 23, color: "#e9a07b", particles: 17, drama: 1, effect: "Hammered copper leaves with turquoise patina and riveted veins", added: true },
  { id: "honey", label: "HONEY", name: "Honey Clover", chance: 110, value: 135, hue: 39, color: "#ffc85e", particles: 20, drama: 1, effect: "Golden honeycomb leaves with amber cells and glossy nectar", added: true },
  { id: "lotus", label: "LOTUS", name: "Lotus Clover", chance: 280, value: 420, hue: 319, color: "#f6a9d5", particles: 23, drama: 2, effect: "Soft rose petals cupping a jade heart and ivory veins", added: true },
  { id: "amethyst", label: "AMETHYST", name: "Amethyst Clover", chance: 1200, value: 2600, hue: 266, color: "#b99aff", particles: 29, drama: 3, effect: "Four faceted violet geodes split by pale crystalline seams", added: true },
  { id: "venom", label: "VENOM", name: "Venom Clover", chance: 4800, value: 14000, hue: 93, color: "#c7f95c", particles: 33, drama: 3, effect: "Black-green leaves with toxic lime veins and acid droplets", added: true },
  { id: "tempest", label: "TEMPEST", name: "Tempest Clover", chance: 45000, value: 260000, hue: 207, color: "#9be8ff", particles: 43, drama: 3, effect: "Storm-blue leaves wrapped in silver wind and electric forks", added: true },
  { id: "bloodmoon", label: "BLOODMOON", name: "Bloodmoon Clover", chance: 2500000, value: 17500000, hue: 351, color: "#ff8295", particles: 62, drama: 4, effect: "Dark wine leaves bearing four scarlet eclipses and lunar sigils", added: true },
  { id: "empyrean", label: "EMPYREAN", name: "Empyrean Clover", chance: 10000000, value: 80000000, hue: 45, color: "#fff1b8", particles: 72, drama: 4, effect: "Ivory-gold celestial petals with sapphire inlays and a radiant seal", added: true },
  { id: "starfall", label: "STARFALL", name: "Starfall Clover", chance: 2.5, value: 3, hue: 246, color: "#aebdff", particles: 15, drama: 0, effect: "Midnight-blue leaves crossed by a little falling star", added: true },
  { id: "moss", label: "MOSS", name: "Moss Clover", chance: 10, value: 12, hue: 139, color: "#93c979", particles: 16, drama: 0, effect: "Velvet moss, tiny fern curls and dew-bright spores", added: true },
  { id: "marigold", label: "MARIGOLD", name: "Marigold Clover", chance: 70, value: 95, hue: 34, color: "#ffbd4a", particles: 19, drama: 1, effect: "A warm marigold rosette with ember-gold petal seams", added: true },
  { id: "coral", label: "CORAL", name: "Coral Clover", chance: 210, value: 340, hue: 8, color: "#ff8878", particles: 21, drama: 1, effect: "Reef-pink leaves branching into tiny coral fans", added: true },
  { id: "sapphire", label: "SAPPHIRE", name: "Sapphire Clover", chance: 720, value: 1500, hue: 216, color: "#65a9ff", particles: 27, drama: 2, effect: "Royal-blue facets with a white sapphire glint", added: true },
  { id: "phantom", label: "PHANTOM", name: "Phantom Clover", chance: 8500, value: 32000, hue: 278, color: "#c5a8ff", particles: 35, drama: 3, effect: "Lavender afterimages drift one pixel behind each leaf", added: true },
  { id: "rift", label: "RIFT", name: "Rift Clover", chance: 32000, value: 190000, hue: 193, color: "#67f0e0", particles: 41, drama: 3, effect: "A turquoise fault-line opens through four dark petals", added: true },
  { id: "stormglass", label: "STORMGLASS", name: "Stormglass Clover", chance: 180000, value: 1300000, hue: 202, color: "#b4eeff", particles: 49, drama: 4, effect: "Sea-glass leaves striped by silver rain and lightning", added: true },
  { id: "crownfire", label: "CROWNFIRE", name: "Crownfire Clover", chance: 900000, value: 9000000, hue: 17, color: "#ff9b55", particles: 59, drama: 4, effect: "A small crown of clean white-hot flame above each heart", added: true },
  { id: "eventide", label: "EVENTIDE", name: "Eventide Clover", chance: 2700000, value: 26000000, hue: 282, color: "#d3a3ff", particles: 68, drama: 4, effect: "Violet dusk bands settle beneath the first evening stars", added: true },
  { id: "firefly", label: "FIREFLY", name: "Firefly Clover", chance: 3, value: 3, hue: 92, color: "#c9ff79", particles: 13, drama: 0, effect: "Tiny lanterns glow in the four leaves after dusk", added: true },
  { id: "fern", label: "FERN", name: "Fern Clover", chance: 12, value: 14, hue: 145, color: "#77d69a", particles: 17, drama: 0, effect: "Paired fern fronds curl along each leaf vein", added: true },
  { id: "sunstone", label: "SUNSTONE", name: "Sunstone Clover", chance: 90, value: 115, hue: 27, color: "#ffad58", particles: 20, drama: 1, effect: "Apricot crystal plates catch a warm inner sunrise", added: true },
  { id: "bellflower", label: "BELLFLOWER", name: "Bellflower Clover", chance: 330, value: 490, hue: 292, color: "#bb98e8", particles: 24, drama: 2, effect: "Violet bell-shaped blooms ring the four-leaf heart", added: true },
  { id: "garnet", label: "GARNET", name: "Garnet Clover", chance: 1000, value: 2200, hue: 344, color: "#e34c70", particles: 29, drama: 3, effect: "Deep red gemstone facets converge on a bright core", added: true },
  { id: "mirage", label: "MIRAGE", name: "Mirage Clover", chance: 9500, value: 45000, hue: 188, color: "#7ee5d5", particles: 37, drama: 3, effect: "Two heat-hazed afterimages shimmer around clear mint leaves", added: true },
  { id: "paradox", label: "PARADOX", name: "Paradox Clover", chance: 38000, value: 240000, hue: 320, color: "#ff82ca", particles: 44, drama: 3, effect: "Opposite-color halves join along a single impossible seam", added: true },
  { id: "wildfire", label: "WILDFIRE", name: "Wildfire Clover", chance: 650000, value: 6300000, hue: 8, color: "#ff7350", particles: 56, drama: 4, effect: "Four bright ember trails coil around a charcoal leaf edge", added: true },
  { id: "archangel", label: "ARCHANGEL", name: "Archangel Clover", chance: 1500000, value: 14000000, hue: 208, color: "#d9f3ff", particles: 64, drama: 4, effect: "Feather-white leaves carry a fine blue-gold halo pattern", added: true },
  { id: "null", label: "NULL", name: "Null Clover", chance: 3000000, value: 32000000, hue: 272, color: "#b6a1d4", particles: 70, drama: 4, effect: "A silent violet outline surrounds four ink-dark empty leaves", added: true },
] satisfies Tier[]).sort((a, b) => a.chance - b.chance);

/* ---------------- variants ---------------- */

export type Variant = "normal" | "shiny" | "crystal" | "cursed" | "glitched";
export const VARIANTS: Variant[] = ["normal", "shiny", "crystal", "cursed", "glitched"];

export const SHINY_VALUE = 5;
export const BASE_SHINY = 1 / 50;
/** Crystal: 25x the clovers, 500x harder than shiny to roll. */
export const CRYSTAL_VALUE = 25;
export const CRYSTAL_RARITY = 500;
export const CRYSTAL_REBIRTHS = 5;
/** Cursed: 100x the clovers, 10x harder than crystal to roll. Unlocks at 10 rebirths. */
export const CURSED_VALUE = 100;
export const CURSED_RARITY = 10;
export const CURSED_REBIRTHS = 10;
/** Glitched: 400x payout, five times rarer than cursed, unlocked at rebirth 15. */
export const GLITCHED_VALUE = 400;
export const GLITCHED_RARITY = 5;
export const GLITCHED_REBIRTHS = 15;
/** Glitched remains the final variant unlock for the expanded rarity ladder. */

export const TOTAL_ENTRIES = TIERS.length * VARIANTS.length;
/** Auto rolls run on their own clock. A free roller runs from the very start. */
/** Pause between spins for the free auto roller; Auto Speed shortens it. */
export const FREE_AUTO_DELAY = 1500;
export const AUTO_BASE_DELAY = 800;
export const MIN_AUTO_DELAY = 200;
/** Every roll is one 3.2s spin of the rarity rail; nothing else can roll meanwhile. */
export const ROLL_DURATION = 3200;

/* ---------------- rebirth ---------------- */

export const REBIRTH_BASE_COST = 250000;
export const REBIRTH_COST_GROWTH = 2.2;
export const REBIRTH_MAX = 50;
/** +35% luck and +25% clover value per rebirth, forever. */
export const REBIRTH_LUCK = 0.35;
export const REBIRTH_VALUE = 0.25;

export const rebirthCost = (rebirths: number) => Math.round(REBIRTH_BASE_COST * REBIRTH_COST_GROWTH ** rebirths);
export const rebirthLuck = (rebirths: number) => 1 + REBIRTH_LUCK * rebirths;
export const rebirthValue = (rebirths: number) => 1 + REBIRTH_VALUE * rebirths;

/* ---------------- save ---------------- */

export type UpgradeId = "luck" | "auto" | "multi" | "shiny" | "value" | "crit";
export type Upgrades = Record<UpgradeId, number>;

export type OfflineReward = {
  id: string;
  amount: number;
  awayMs: number;
  creditedMs: number;
  capped: boolean;
  createdAt: number;
};

export type Save = {
  version: number;
  clovers: number;
  totalEarned: number;
  rolls: number;
  upgrades: Upgrades;
  found: Record<string, number>;
  best: number;
  rebirths: number;
  sound: boolean;
  auto: boolean;
  performance: boolean;
  luckScale: number;
  lastActiveAt: number;
  offlineReward: OfflineReward | null;
  totalOfflineEarned: number;
  lifetime: Lifetime;
};

/** Post-spin pause: 0.80s at level 1, down to 0.20s at level 12. */
export function autoDelay(level: number): number {
  return level <= 0 ? 0 : Math.max(MIN_AUTO_DELAY, Math.round(AUTO_BASE_DELAY * 0.86 ** (level - 1)));
}

export type UpgradeDef = {
  id: UpgradeId;
  name: string;
  blurb: string;
  max: number;
  cost: (level: number) => number;
  effect: (level: number) => string;
};

const luckMultiplier = (level: number) => 1.09 ** level;

export const UPGRADES: UpgradeDef[] = [
  { id: "luck", name: "LUCK BOOST", blurb: "Compounding luck for the rarest finds", max: 60, cost: (l) => Math.round(15 * 1.3 ** l), effect: (l) => `x${luckMultiplier(l).toFixed(2)}` },
  { id: "value", name: "CLOVER VALUE", blurb: "A permanent boost to every payout", max: 50, cost: (l) => Math.round(40 * 1.33 ** l), effect: (l) => `x${(1 + 0.4 * l).toFixed(1)}` },
  { id: "multi", name: "MULTI ROLL", blurb: "More clovers in one paced roll", max: 40, cost: (l) => Math.round(150 * 1.33 ** l), effect: (l) => `${l + 1} ROLL${l === 0 ? "" : "S"}` },
    { id: "auto", name: "AUTO SPEED", blurb: "Shorter pause between automatic spins", max: 12, cost: (l) => Math.round(60 * 1.48 ** l), effect: (l) => `${((ROLL_DURATION + (l > 0 ? autoDelay(l) : FREE_AUTO_DELAY)) / 1000).toFixed(1)}s/ROLL` },
  { id: "shiny", name: "SHINY CHARM", blurb: "Discover shimmering, 5x-value variants", max: 25, cost: (l) => Math.round(250 * 1.42 ** l), effect: (l) => `${Math.round(BASE_SHINY * (1 + 0.3 * l) * 100)}%` },
  { id: "crit", name: "CRIT ROLL", blurb: "A chance for a 10x-value payout", max: 20, cost: (l) => Math.round(600 * 1.42 ** l), effect: (l) => `${l * 3}%` },
];

/* ---------------- lifetime stats ---------------- */

/** Stats that survive rebirths, so they are a true all-time record. */
export type Lifetime = {
  rolls: number;
  shinies: number;
  crystals: number;
  cursed: number;
  glitched: number;
  crits: number;
  discoveries: number;
  rebirths: number;
  biggest: number;
  rarest: { tier: number; tierId?: string; variant: Variant } | null;
  playMs: number;
};

export function newLifetime(): Lifetime {
  return {
    rolls: 0, shinies: 0, crystals: 0, cursed: 0, glitched: 0, crits: 0, discoveries: 0, rebirths: 0, biggest: 0,
    rarest: null, playMs: 0,
  };
}

/** Higher is rarer. Cursed beats crystal, crystal beats any plain tier; shinies beat plain at the same tier. */
const variantRank = (variant: Variant) => (variant === "glitched" ? 3000 : variant === "cursed" ? 2000 : variant === "crystal" ? 1000 : 0);
const rarityScore = (x: { tier: number; variant: Variant }) =>
  variantRank(x.variant) + x.tier * 10 + (x.variant === "shiny" ? 5 : 0);

export function addLifetime(s: Save, results: RollResult[]): Save {
  const l: Lifetime = { ...s.lifetime };
  l.rolls += results.length;
  for (const r of results) {
    if (r.variant === "shiny") l.shinies++;
    if (r.variant === "crystal") l.crystals++;
    if (r.variant === "cursed") l.cursed++;
    if (r.variant === "glitched") l.glitched++;
    if (r.crit) l.crits++;
    if (r.isNew) l.discoveries++;
    if (r.value > l.biggest) l.biggest = r.value;
    if (!l.rarest || rarityScore(r) > rarityScore(l.rarest)) l.rarest = { tier: r.tier, tierId: TIERS[r.tier].id, variant: r.variant };
  }
  return { ...s, lifetime: l };
}

/* ---------------- upgrade curves ---------------- */


export const newSave = (): Save => ({
  version: SAVE_VERSION,
  clovers: 0,
  totalEarned: 0,
  rolls: 0,
  upgrades: { luck: 0, auto: 0, multi: 0, shiny: 0, value: 0, crit: 0 },
  found: {},
  best: 0,
  rebirths: 0,
  sound: true,
  auto: true,
  performance: false,
  luckScale: 1,
  lastActiveAt: Date.now(),
  offlineReward: null,
  totalOfflineEarned: 0,
  lifetime: newLifetime(),
});

export const LUCK_SCALES = [
  { v: 1, label: "FULL" },
  { v: 0.5, label: "/2" },
  { v: 0.2, label: "/5" },
  { v: 0.05, label: "/20" },
  { v: 0.01, label: "/100" },
  { v: 0.001, label: "/1K" },
];

/* ---------------- derived stats ---------------- */

export const crystalUnlocked = (s: Save) => s.rebirths >= CRYSTAL_REBIRTHS;
export const cursedUnlocked = (s: Save) => s.rebirths >= CURSED_REBIRTHS;
export const glitchedUnlocked = (s: Save) => s.rebirths >= GLITCHED_REBIRTHS;
/** Whether a variant can drop yet (normal and shiny always can). */
export const variantUnlocked = (s: Save, variant: Variant) => variant === "glitched" ? glitchedUnlocked(s) : variant === "cursed" ? cursedUnlocked(s) : variant === "crystal" ? crystalUnlocked(s) : true;
export const discoveredCount = (s: Save) => Object.values(s.found).filter((n) => n > 0).length;
export const indexBonus = (s: Save) => 0.1 * discoveredCount(s);
export const baseLuck = (s: Save) => luckMultiplier(s.upgrades.luck) * (1 + indexBonus(s)) * rebirthLuck(s.rebirths);
export const getLuck = (s: Save) => baseLuck(s) * s.luckScale;
export const getShinyChance = (s: Save) => Math.min(0.5, BASE_SHINY * (1 + 0.3 * s.upgrades.shiny));

/**
 * Crystal and cursed odds grow with luck, damping the flat "luck does nothing for
 * variants" curve. 1x at luck 1, ~2.8x at 5,800 luck, capped so a full rebirth
 * stack can't flood the feed.
 */
export const VARIANT_LUCK_EXPONENT = 0.12;
export const VARIANT_LUCK_CAP = 8;
export const variantLuck = (s: Save) => Math.min(VARIANT_LUCK_CAP, Math.max(1, getLuck(s) ** VARIANT_LUCK_EXPONENT));
export const getCrystalChance = (s: Save) => crystalUnlocked(s) ? (getShinyChance(s) / CRYSTAL_RARITY) * variantLuck(s) : 0;
export const getCursedChance = (s: Save) => cursedUnlocked(s) ? (getShinyChance(s) / (CRYSTAL_RARITY * CURSED_RARITY)) * variantLuck(s) : 0;
export const getGlitchedChance = (s: Save) => glitchedUnlocked(s) ? getCursedChance(s) / GLITCHED_RARITY : 0;
export const rollsPerClick = (s: Save) => 1 + s.upgrades.multi;
export const valueMult = (s: Save) => (1 + 0.4 * s.upgrades.value) * rebirthValue(s.rebirths);
export const critChance = (s: Save) => Math.min(0.6, s.upgrades.crit * 0.03);
/** Gap between auto rolls (0 when Auto Roll isn't bought). Runs independently of the manual cooldown. */
/** Time from one spin start to the next: the 3.2s spin plus a pause the Auto Speed upgrade shortens. */
export const autoInterval = (s: Save) => ROLL_DURATION + (s.upgrades.auto > 0 ? autoDelay(s.upgrades.auto) : FREE_AUTO_DELAY);
/** Cooldown after a manual click. */
/** A manual roll locks the roller for exactly one spin. */
export const rollCooldown = (_s: Save) => ROLL_DURATION;
export const manualRollsPerSecond = (s: Save) => (rollsPerClick(s) * 1000) / rollCooldown(s);
export const autoRollsPerSecond = (s: Save) => {
  const interval = autoInterval(s);
  return interval > 0 ? (rollsPerClick(s) * 1000) / interval : 0;
};
/** Rolls per second for someone clicking nonstop with Auto Roll running beside them. */
export const activeRollsPerSecond = (s: Save) => autoRollsPerSecond(s) + manualRollsPerSecond(s);
/** Passive (auto-only) rolls per second, used for offline simulation. */
export const passiveRollsPerSecond = (s: Save) => (s.auto ? autoRollsPerSecond(s) : 0);
export const canRebirth = (s: Save) => s.rebirths < REBIRTH_MAX && s.clovers >= rebirthCost(s.rebirths);

export const variantValue = (variant: Variant) => variant === "glitched" ? GLITCHED_VALUE : variant === "cursed" ? CURSED_VALUE : variant === "crystal" ? CRYSTAL_VALUE : variant === "shiny" ? SHINY_VALUE : 1;
export const variantBaseOdds = (variant: Variant) => variant === "glitched" ? (CRYSTAL_RARITY * CURSED_RARITY * GLITCHED_RARITY) / BASE_SHINY : variant === "cursed" ? (CRYSTAL_RARITY * CURSED_RARITY) / BASE_SHINY : variant === "crystal" ? CRYSTAL_RARITY / BASE_SHINY : variant === "shiny" ? 1 / BASE_SHINY : 1;
export const variantChance = (s: Save, variant: Variant) => variant === "glitched" ? getGlitchedChance(s) : variant === "cursed" ? getCursedChance(s) : variant === "crystal" ? getCrystalChance(s) : variant === "shiny" ? getShinyChance(s) : Math.max(0, 1 - getShinyChance(s) - getCrystalChance(s) - getCursedChance(s) - getGlitchedChance(s));

export const foundKey = (tier: number, variant: Variant) => `${TIERS[tier].id}${variant === "normal" ? "" : `:${variant}`}`;

/** Exact expected payout of one ordinary roll, including rounding, crits and variants. Used for offline pay. */
export function expectedPayout(s: Save): number {
  const probabilities = tierProbabilities(getLuck(s));
  const shiny = getShinyChance(s);
  const crystal = getCrystalChance(s);
  const cursed = getCursedChance(s);
  const glitched = getGlitchedChance(s);
  const crit = critChance(s);
  const multiplier = valueMult(s);
  const variants = [
    { chance: Math.max(0, 1 - shiny - crystal - cursed - glitched), value: 1 },
    { chance: shiny, value: SHINY_VALUE },
    { chance: crystal, value: CRYSTAL_VALUE },
    { chance: cursed, value: CURSED_VALUE },
    { chance: glitched, value: GLITCHED_VALUE },
  ];
  let payout = 0;
  for (let tier = 0; tier < TIERS.length; tier++) {
    for (const variant of variants) {
      const ordinary = Math.round(TIERS[tier].value * variant.value * multiplier);
      const critical = Math.round(TIERS[tier].value * variant.value * multiplier * 10);
      payout += probabilities[tier] * variant.chance * ((1 - crit) * ordinary + crit * critical);
    }
  }
  return Number.isFinite(payout) ? payout : 0;
}

/** Everything a rebirth wipes, and everything it keeps. */
export function doRebirth(s: Save): Save {
  if (!canRebirth(s)) return s;
  const fresh = newSave();
  return {
    ...fresh,
    rebirths: s.rebirths + 1,
    totalEarned: s.totalEarned,
    found: s.found,
    best: s.best,
    sound: s.sound,
    performance: s.performance,
    totalOfflineEarned: s.totalOfflineEarned,
    offlineReward: s.offlineReward,
    lastActiveAt: Math.max(s.lastActiveAt, fresh.lastActiveAt),
    // all-time stats survive a rebirth; the rebirth itself is counted
    lifetime: { ...s.lifetime, rebirths: s.lifetime.rebirths + 1 },
  };
}

/* ---------------- rolling ---------------- */

export type RollResult = {
  id: number;
  tier: number;
  variant: Variant;
  crit: boolean;
  value: number;
  isNew: boolean;
};

export function tierProbabilities(luck: number): number[] {
  const probabilities = new Array<number>(TIERS.length).fill(0);
  let remaining = 1;
  for (let i = TIERS.length - 1; i >= 1; i--) {
    const chance = Math.min(0.4, Math.max(0, luck) / TIERS[i].chance);
    probabilities[i] = remaining * chance;
    remaining -= probabilities[i];
  }
  probabilities[0] = remaining;
  return probabilities;
}

export function drawTier(probabilities: number[]): number {
  let random = Math.random();
  for (let i = probabilities.length - 1; i >= 1; i--) {
    random -= probabilities[i];
    if (random < 0) return i;
  }
  return 0;
}

export const effectiveOdds = (tier: number, luck: number) => 1 / Math.max(1e-12, tierProbabilities(luck)[tier]);

export function rollBatch(s: Save, nextId: () => number) {
  const found = { ...s.found };
  const probabilities = tierProbabilities(getLuck(s));
  const shinyChance = getShinyChance(s);
  const crystalChance = getCrystalChance(s);
  const cursedChance = getCursedChance(s);
  const glitchedChance = getGlitchedChance(s);
  const crits = critChance(s);
  const multiplier = valueMult(s);
  const results: RollResult[] = [];
  let gained = 0;
  let best: RollResult | null = null;
  let bestTier = s.best;

  for (let i = 0; i < rollsPerClick(s); i++) {
    const tier = drawTier(probabilities);
    let variant: Variant = "normal";
    const r = Math.random();
    if (r < glitchedChance) variant = "glitched";
    else if (r < glitchedChance + cursedChance) variant = "cursed";
    else if (r < glitchedChance + cursedChance + crystalChance) variant = "crystal";
    else if (r < glitchedChance + cursedChance + crystalChance + shinyChance) variant = "shiny";
    const crit = Math.random() < crits;
    const key = foundKey(tier, variant);
    const isNew = !(found[key] > 0);
    found[key] = (found[key] ?? 0) + 1;
    bestTier = Math.max(bestTier, tier);
    const value = Math.round(TIERS[tier].value * variantValue(variant) * (crit ? 10 : 1) * multiplier);
    const result: RollResult = { id: nextId(), tier, variant, crit, value, isNew };
    gained += value;
    results.push(result);
    if (!best || rank(result) > rank(best)) best = result;
  }

  return {
    next: { ...s, clovers: s.clovers + gained, totalEarned: s.totalEarned + gained, rolls: s.rolls + results.length, found, best: bestTier },
    results,
    best: best!,
    gained,
  };
}

export const cloverRank = (tier: number, variant: Variant) => variantRank(variant) + tier * 10 + (variant === "shiny" ? 5 : 0);

/** A crystal of any tier out-ranks a plain higher tier; it's the rarer find. */
const rank = (r: RollResult) => variantRank(r.variant) + r.tier * 10 + (r.variant === "shiny" ? 5 : 0) + (r.isNew ? 1 : 0);

export const STORAGE_KEY = "clover-rng-save-v3";
const LEGACY_KEYS = ["clover-rng-save-v2", "clover-rng-save-v1"];
const nonnegative = (value: unknown, fallback = 0) => typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : fallback;

// Old saves stored the rarest tier as an array index. Inserting low-odds
// clovers changes those indices, so migrate through the original stable IDs.
export const LEGACY_TIER_IDS = ["common", "uncommon", "rare", "epic", "legendary", "mythic", "divine", "cosmic", "eclipse", "aurora", "singularity", "prismatic", "solar", "moonlit", "tidal", "inferno", "glacier", "sakura", "thunder", "verdant", "obsidian", "celestial", "chrono", "infinite"];
/** Version 5 included the first nine additions. Preserve its stored rarest-find index too. */
export const VERSION_5_TIER_IDS = ["common", "uncommon", "dewdrop", "rare", "copper", "epic", "honey", "legendary", "lotus", "mythic", "divine", "amethyst", "cosmic", "eclipse", "venom", "aurora", "singularity", "prismatic", "solar", "moonlit", "tempest", "tidal", "inferno", "glacier", "sakura", "thunder", "verdant", "obsidian", "celestial", "chrono", "bloodmoon", "infinite", "empyrean"];
/** The v6 order, before this batch of ten rarity tiers was added. */
export const VERSION_6_TIER_IDS = ["common", "starfall", "uncommon", "dewdrop", "moss", "rare", "copper", "epic", "marigold", "honey", "legendary", "coral", "lotus", "mythic", "sapphire", "divine", "amethyst", "cosmic", "eclipse", "venom", "aurora", "phantom", "singularity", "prismatic", "solar", "rift", "moonlit", "tempest", "tidal", "inferno", "glacier", "stormglass", "sakura", "thunder", "verdant", "obsidian", "crownfire", "celestial", "chrono", "bloodmoon", "eventide", "infinite", "empyrean"];

/** Local save migration drops removed features, never clovers or discoveries. */
export function sanitizeSave(raw: unknown): Save {
  const parsed = (raw && typeof raw === "object" ? raw : {}) as Partial<Save>;
  const base = newSave();
  const upgrades = { ...base.upgrades };
  for (const definition of UPGRADES) {
    upgrades[definition.id] = Math.min(definition.max, Math.floor(nonnegative(parsed.upgrades?.[definition.id])));
  }
  const found: Record<string, number> = {};
  for (let tier = 0; tier < TIERS.length; tier++) {
    for (const variant of VARIANTS) {
      const key = foundKey(tier, variant);
      const legacyKey = TIERS[tier].id === "prismatic" && (variant === "normal" || variant === "shiny") ? `secret${variant === "shiny" ? ":shiny" : ""}` : key;
      const count = Math.floor(nonnegative(parsed.found?.[key] ?? parsed.found?.[legacyKey]));
      if (count > 0) found[key] = count;
    }
  }
  const rebirths = Math.min(REBIRTH_MAX, Math.floor(nonnegative(parsed.rebirths)));
  const save: Save = {
    ...base,
    version: SAVE_VERSION,
    clovers: nonnegative(parsed.clovers),
    totalEarned: nonnegative(parsed.totalEarned),
    rolls: Math.floor(nonnegative(parsed.rolls)),
    upgrades,
    found,
    best: Math.max(0, ...TIERS.map((_, i) => VARIANTS.some((v) => found[foundKey(i, v)]) ? i : 0)),
    rebirths,
    sound: parsed.sound !== false,
    auto: parsed.auto !== false,
    performance: parsed.performance === true,
    luckScale: LUCK_SCALES.some((scale) => scale.v === parsed.luckScale) ? parsed.luckScale! : 1,
    lastActiveAt: nonnegative(parsed.lastActiveAt, base.lastActiveAt) || base.lastActiveAt,
    offlineReward: null,
    totalOfflineEarned: nonnegative(parsed.totalOfflineEarned),
    lifetime: sanitizeLifetime(parsed.lifetime, parsed.version ?? 0),
  };
  const reward = parsed.offlineReward;
  if (reward && typeof reward.id === "string" && reward.id.length <= 160 && nonnegative(reward.amount) >= 1) {
    save.offlineReward = {
      id: reward.id,
      amount: Math.min(Number.MAX_SAFE_INTEGER, Math.floor(nonnegative(reward.amount))),
      awayMs: Math.min(365 * 86400000, nonnegative(reward.awayMs)),
      creditedMs: Math.min(16 * 3600000, nonnegative(reward.creditedMs)),
      capped: reward.capped === true,
      createdAt: nonnegative(reward.createdAt, base.lastActiveAt),
    };
  }
  return save;
}

export function loadSave(): Save {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? LEGACY_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
    if (!raw) return sanitizeSave(newSave());
    return sanitizeSave(JSON.parse(raw));
  } catch {
    return sanitizeSave(newSave());
  }
}

/** Clamps stored lifetime stats so a damaged or hand-edited save can't break the UI. */
function sanitizeLifetime(raw: Partial<Lifetime> | undefined, version: number): Lifetime {
  const base = newLifetime();
  if (!raw || typeof raw !== "object") return base;
  const num = (value: unknown) => nonnegative(value);
  const rarest = raw.rarest;
  const oldIds = version >= SAVE_VERSION ? TIERS.map((tier) => tier.id) : version >= 6 ? VERSION_6_TIER_IDS : version >= 5 ? VERSION_5_TIER_IDS : LEGACY_TIER_IDS;
  const oldId = rarest && Number.isInteger(rarest.tier)
    ? oldIds[rarest.tier]
    : undefined;
  const tierId = rarest?.tierId && TIERS.some((t) => t.id === rarest.tierId) ? rarest.tierId : oldId;
  const tier = TIERS.findIndex((t) => t.id === tierId);
  const validRarest = rarest && tier >= 0 && VARIANTS.includes(rarest.variant) ? { tier, tierId, variant: rarest.variant } : null;
  return {
    rolls: num(raw.rolls),
    shinies: num(raw.shinies),
    crystals: num(raw.crystals),
    cursed: num(raw.cursed),
    glitched: num(raw.glitched),
    crits: num(raw.crits),
    discoveries: num(raw.discoveries),
    rebirths: num(raw.rebirths),
    biggest: num(raw.biggest),
    rarest: validRarest,
    playMs: num(raw.playMs),
  };
}

export function storeSave(s: Save): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return true;
  } catch {
    // The game remains playable if storage is unavailable.
    return false;
  }
}

export function clearSave() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    for (const key of LEGACY_KEYS) localStorage.removeItem(key);
  } catch {
    // Ignore restricted storage.
  }
}

/* ---------------- formatting ---------------- */

const SUFFIXES = ["", "K", "M", "B", "T", "Qa", "Qi"];

export function fmt(n: number): string {
  if (!Number.isFinite(n)) return "MAX";
  if (n < 1000) return Math.floor(n).toLocaleString("en-US");
  let i = 0;
  let v = n;
  while (v >= 1000 && i < SUFFIXES.length - 1) {
    v /= 1000;
    i++;
  }
  return `${v >= 100 ? Math.floor(v) : v.toFixed(1).replace(/\.0$/, "")}${SUFFIXES[i]}`;
}

export function fmtOdds(n: number): string {
  return n < 1e6 ? Math.max(1, Math.round(n)).toLocaleString("en-US") : fmt(n);
}
