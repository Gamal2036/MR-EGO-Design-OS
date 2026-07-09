# Secondary Emotion

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md))

---

## Definition

Secondary Emotion defines the emotional response to MR:EGO's semantic colors — green (success), amber (warning), and red (danger). These colors carry the most emotional weight per pixel and must be used with precision.

---

## Success — Green Emotion

### Emotional Profile

| Emotion | Trigger | Visual Cue |
|---------|---------|------------|
| Achievement | Task completed, goal reached | Green checkmark, green badge |
| Relief | Error resolved, data saved | Green confirmation toast |
| Progress | Milestone reached, streak continued | Green progress indicator |
| Safety | Action confirmed, data intact | Green status indicator |

### Green Usage Emotional Rules

1. **Green always signals completion or confirmation.** It never signals "ready to start" or "available."
2. **Green triggers a sense of accomplishment** — even a small green checkmark produces a micro-dose of satisfaction.
3. **Green should appear after the user's effort, not before.** Pre-completion green creates false confidence.
4. **Green combined with a checkmark icon** creates the strongest emotional signal.

---

## Warning — Amber Emotion

### Emotional Profile

| Emotion | Trigger | Visual Cue |
|---------|---------|------------|
| Caution | Potential issue ahead | Amber triangle, amber badge |
| Attention | Something needs review | Amber underline, amber background |
| Opportunity | Issue can be prevented | Amber suggestion, amber tip |

### Amber Usage Emotional Rules

1. **Amber signals "pay attention" not "panic."** It is warm, not alarming.
2. **Amber should include a clear path forward.** Warning without resolution creates anxiety.
3. **Amber backgrounds are subtle** — tinted, not saturated.
4. **Amber never appears for completed or successful states.** It is exclusively for pre-resolution states.

---

## Danger — Red Emotion

### Emotional Profile

| Emotion | Trigger | Visual Cue |
|---------|---------|------------|
| Urgency | Destructive action pending | Red button, red badge |
| Error | Something went wrong | Red alert, red border |
| Stop | Cannot proceed | Red blocker, red indication |
| Finality | Irreversible action | Red confirmation, red text |

### Red Usage Emotional Rules

1. **Red is the strongest emotional color in the palette.** It should appear on ≤1% of any screen.
2. **Red always signals "stop and review."** It never signals "proceed" or "continue."
3. **Red for destructive actions demands explicit confirmation.** Never execute on a single red click.
4. **Red backgrounds are the most saturated semantic background** — they need to communicate urgency effectively.
5. **Red text is always paired with an icon** — never rely on color alone.

---

## Emotional Intensity Comparison

```
Emotional Intensity Scale:

Green (Success)      ●━━━━━━━━━━━━━━━○──────────────    Low-Medium
                     Achievement, relief, completion

Amber (Warning)      ●━━━━━━━━━━━━━━━━━━━━○────────    Medium
                     Caution, attention, review

Red (Danger)         ●━━━━━━━━━━━━━━━━━━━━━━━━━━●    High
                     Urgency, stop, finality
```

---

## Semantic Color Emotional Rules

1. **Semantic colors never appear without supporting indicators** (icon + label).
2. **Emotional intensity matches color saturation** — more saturated = more urgent.
3. **Success and warning can coexist** (partial success with warnings).
4. **Red and green never appear together** on the same element (colorblind consideration).
5. **Semantic colors are dimmed in dark mode** to reduce visual shock.
6. **Semantic backgrounds are tinted versions of the color** — never full saturation.

---

*This Secondary Emotion specification is permanent. Semantic colors carry the highest emotional weight per pixel and must be used with precision. Refer to [Color-Emotion.md](Color-Emotion.md) for the complete system, [Color-System.md](../../02-Design-Language/Color-System.md) for color values, and [Trust-Colors.md](Trust-Colors.md) for trust color usage.*
