#!/usr/bin/env node

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

const tokensPath = resolve(rootDir, "styles", "tokens.css");
const globalsPath = resolve(rootDir, "styles", "globals.css");

let exitCode = 0;
let passCount = 0;
let failCount = 0;

function check(condition, label, detail = "") {
  if (condition) {
    passCount++;
  } else {
    failCount++;
    console.error(`  FAIL: ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

function extractVars(css, prefix = "--") {
  const vars = new Set();
  const regex = new RegExp(`${prefix}[\\w-]+\\s*:`, "g");
  let match;
  while ((match = regex.exec(css)) !== null) {
    vars.add(match[0].replace(/\s*:$/, ""));
  }
  return vars;
}

console.log("\n========================================");
console.log("  MR:EGO Design OS — Token Validation");
console.log("========================================\n");

// Check files exist
check(existsSync(tokensPath), "tokens.css exists");
check(existsSync(globalsPath), "globals.css exists");

const tokens = readFileSync(tokensPath, "utf-8");
const globals = readFileSync(globalsPath, "utf-8");

// Extract all sections from tokens.css
const hasLight = tokens.includes(":root {");
const hasDark = tokens.includes(".dark {");
const hasHighContrast = tokens.includes(".high-contrast");
const hasReducedMotion = tokens.includes("reduced-motion");

check(hasLight, "Light theme (:root) section exists");
check(hasDark, "Dark theme (.dark) section exists");
check(hasHighContrast, "High contrast mode section exists");
check(hasReducedMotion || tokens.includes("prefers-reduced-motion: reduce"), "Reduced motion support exists");

// --- Color Scale Checks ---
const colorScales = ["primary", "neutral", "success", "warning", "danger", "info", "ai", "job", "cv", "analytics"];
for (const scale of colorScales) {
  for (const shade of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]) {
    check(
      tokens.includes(`--color-${scale}-${shade}`),
      `Color --color-${scale}-${shade} defined`,
    );
  }
}

// --- Surface Colors ---
for (const level of [0, 1, 2, 3]) {
  check(tokens.includes(`--color-surface-${level}`), `Surface color --color-surface-${level} defined`);
}

// --- Text Colors ---
const textColors = ["primary", "body", "secondary", "tertiary", "disabled", "inverse", "link", "link-hover", "success", "warning", "danger"];
for (const tc of textColors) {
  check(tokens.includes(`--color-text-${tc}`), `Text color --color-text-${tc} defined`);
}

// --- Border Colors ---
const borderColors = ["default", "hover", "focus", "danger", "success", "warning", "info"];
for (const bc of borderColors) {
  check(tokens.includes(`--border-${bc}`), `Border color --border-${bc} defined`);
}

// --- Typography ---
const typeLevels = ["display", "h1", "h2", "h3", "h4", "subtitle", "body-large", "body", "body-small", "caption", "label", "button", "code", "overline", "smallest"];
for (const level of typeLevels) {
  check(
    tokens.includes(`--font-size-${level}`) && tokens.includes(`--line-height-${level}`) && tokens.includes(`--font-weight-${level}`),
    `Typography ${level} tokens complete`,
  );
}

// --- Spacing ---
for (let i = 0; i <= 14; i++) {
  check(tokens.includes(`--space-${i}`), `Spacing token --space-${i} defined`);
}

// --- Border Radius ---
const radii = ["xs", "sm", "md", "lg", "xl", "2xl", "full"];
for (const r of radii) {
  check(tokens.includes(`--radius-${r}`), `Border radius --radius-${r} defined`);
}

// --- Shadows ---
for (let i = 1; i <= 5; i++) {
  check(tokens.includes(`--shadow-${i}`), `Shadow elevation --shadow-${i} defined`);
}
const semanticShadows = ["soft", "medium", "strong", "floating", "glass", "ai-card", "dialog", "dropdown", "modal", "hover", "focus"];
for (const s of semanticShadows) {
  check(tokens.includes(`--shadow-${s}`), `Semantic shadow --shadow-${s} defined`);
}

// --- Z-Index / Layers ---
const layers = ["base", "dropdown", "sticky", "banner", "overlay", "modal", "popover", "skip-link", "toast", "tooltip"];
for (const layer of layers) {
  check(
    tokens.includes(`--z-${layer}`) && tokens.includes(`--layer-${layer}`),
    `Layer token --z-${layer} / --layer-${layer} defined`,
  );
}

// --- Motion ---
const durations = ["instant", "fast", "normal", "slow", "x-slow", "xx-slow"];
for (const d of durations) {
  check(tokens.includes(`--duration-${d}`), `Duration token --duration-${d} defined`);
}
const easings = ["ease-out", "ease-in", "ease-in-out", "spring"];
for (const e of easings) {
  check(tokens.includes(`--easing-${e}`), `Easing token --easing-${e} defined`);
}
const distances = ["sm", "md", "lg", "xl"];
for (const d of distances) {
  check(tokens.includes(`--motion-distance-${d}`), `Motion distance --motion-distance-${d} defined`);
}
const delays = ["instant", "fast", "normal", "slow", "x-slow"];
for (const d of delays) {
  check(tokens.includes(`--delay-${d}`), `Delay token --delay-${d} defined`);
}

// --- Transitions ---
const transitions = ["fast", "normal", "slow"];
for (const t of transitions) {
  check(tokens.includes(`--transition-${t}`), `Transition token --transition-${t} defined`);
}

// --- Icon Sizes ---
const iconSizes = ["xs", "sm", "md", "lg", "xl"];
for (const s of iconSizes) {
  check(tokens.includes(`--icon-${s}`), `Icon size --icon-${s} defined`);
}

// --- Avatar Sizes ---
const avatarSizes = ["xs", "sm", "md", "lg", "xl", "2xl"];
for (const s of avatarSizes) {
  check(tokens.includes(`--avatar-${s}`), `Avatar size --avatar-${s} defined`);
}

// --- Button Sizes ---
const buttonSizes = ["xs", "sm", "md", "lg", "xl"];
for (const s of buttonSizes) {
  check(tokens.includes(`--button-${s}`), `Button size --button-${s} defined`);
}

// --- Input Sizes ---
const inputSizes = ["sm", "md", "lg"];
for (const s of inputSizes) {
  check(tokens.includes(`--input-${s}`), `Input size --input-${s} defined`);
}

// --- Card Sizes ---
const cardSizes = ["sm", "md", "lg"];
for (const s of cardSizes) {
  check(tokens.includes(`--card-${s}`), `Card size --card-${s} defined`);
}

// --- Border Width ---
for (const w of [0, 1, 2, 4, 8]) {
  check(tokens.includes(`--border-width-${w}`), `Border width --border-width-${w} defined`);
}

// --- Stroke ---
for (const s of ["1", "1-5", "2", "3"]) {
  check(tokens.includes(`--stroke-${s}`), `Stroke width --stroke-${s} defined`);
}

// --- Blur ---
const blurs = ["none", "sm", "md", "lg", "xl", "2xl", "3xl"];
for (const b of blurs) {
  check(tokens.includes(`--blur-${b}`), `Blur token --blur-${b} defined`);
}

// --- Opacity ---
const opacities = [0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100];
for (const o of opacities) {
  check(tokens.includes(`--opacity-${o}`), `Opacity token --opacity-${o} defined`);
}

// --- Focus Ring ---
check(tokens.includes("--ring-width"), "Focus ring --ring-width defined");
check(tokens.includes("--ring-offset"), "Focus ring --ring-offset defined");
check(tokens.includes("--ring-color-default"), "Focus ring --ring-color-default defined");

// --- Outline ---
check(tokens.includes("--outline-width"), "Outline --outline-width defined");
check(tokens.includes("--outline-offset"), "Outline --outline-offset defined");

// --- Accessibility ---
check(tokens.includes("--a11y-touch-target"), "Accessibility --a11y-touch-target defined");
check(tokens.includes("--a11y-min-contrast"), "Accessibility --a11y-min-contrast defined");
check(tokens.includes("--a11y-motion-reduce-duration"), "Accessibility --a11y-motion-reduce-duration defined");

// --- Container ---
const containers = ["sm", "md", "lg", "xl", "2xl"];
for (const c of containers) {
  check(tokens.includes(`--container-max-width-${c}`), `Container --container-max-width-${c} defined`);
}

// --- Grid ---
check(tokens.includes("--grid-columns"), "Grid --grid-columns defined");
check(tokens.includes("--grid-gap"), "Grid --grid-gap defined");

// --- Glass Variants ---
check(tokens.includes("--glass-blur-sm"), "Glass blur sm variant defined");
check(tokens.includes("--glass-blur-md"), "Glass blur md variant defined");
check(tokens.includes("--glass-blur-lg"), "Glass blur lg variant defined");

// --- Notification Colors ---
const notificationTypes = ["info", "success", "warning", "error", "neutral", "ai"];
for (const nt of notificationTypes) {
  for (const part of ["bg", "border", "text", "icon"]) {
    check(
      tokens.includes(`--notification-${nt}-${part}`),
      `Notification color --notification-${nt}-${part} defined`,
    );
  }
}

// --- Dark theme overrides ---
const darkOverrides = [
  "color-primary", "color-neutral", "color-success", "color-warning",
  "color-danger", "color-info", "color-ai", "color-job", "color-cv",
  "color-analytics", "color-surface", "color-text", "border-",
  "glass-bg", "glass-border", "shadow-1", "shadow-2", "shadow-3",
  "shadow-4", "shadow-5",
];
// Get dark section content
const darkStartIdx = tokens.indexOf(".dark {");
const darkEndIdx = tokens.indexOf(".high-contrast", darkStartIdx) !== -1
  ? tokens.indexOf(".high-contrast", darkStartIdx)
  : tokens.indexOf("@media (prefers-reduced-motion", darkStartIdx);
const darkContent = darkStartIdx !== -1
  ? tokens.slice(darkStartIdx, darkEndIdx !== -1 ? darkEndIdx : tokens.length)
  : "";

if (darkContent) {
  for (const override of darkOverrides) {
    check(
      darkContent.includes(`--${override}`),
      `Dark theme overrides --${override}*`,
    );
  }
}

// --- Globals CSS checks ---
check(globals.includes("text-display"), "Global utility .text-display defined");
check(globals.includes("elevation-0"), "Global utility .elevation-0 defined");
check(globals.includes("glass {"), "Global utility .glass defined");
check(globals.includes("focus-ring"), "Global utility .focus-ring defined");
check(globals.includes("skeleton {"), "Global utility .skeleton defined");

// --- No hardcoded values check ---
check(!tokens.includes("TODO"), "No TODO in tokens.css");
check(!tokens.includes("FIXME"), "No FIXME in tokens.css");

// Summary
console.log("\n========================================");
console.log("  Validation Results");
console.log("========================================");
console.log(`  Passed: ${passCount}`);
console.log(`  Failed: ${failCount}`);
console.log(`  Total:  ${passCount + failCount}`);
console.log("========================================\n");

exitCode = failCount > 0 ? 1 : 0;
process.exit(exitCode);
