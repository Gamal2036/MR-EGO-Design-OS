# Future Depth Expansion

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Future-Expansion.md](../../01-Constitution/Future-Expansion.md))

---

## Definition

Future Depth Expansion defines how the depth system can grow without redesign. The layer architecture is designed for 10 levels (0–9) with 6 levels actively used and 4 reserved.

---

## Reserved Levels

| Level | Name | Reserved For | Status |
|-------|------|-------------|--------|
| 6 | System | System-level alerts, OS integration | Reserved |
| 7 | Emergency | Security overlays, critical warnings | Reserved |
| 8 | Platform | Platform-level chrome, multi-window | Reserved |
| 9 | Maximum | Unanticipated future needs | Reserved |

---

## Expansion Scenarios

### Scenario 1: System-Level Notifications

If MR:EGO evolves to support OS-level integration, Level 6 would host:
- System notification center overlay
- System preference quick-access
- Cross-app data transfer indicators

### Scenario 2: Security Overlays

If MR:EGO adds enterprise security features, Level 7 would host:
- Session timeout warning overlay
- Security verification dialog
- Compliance data access notification

### Scenario 3: Multi-Window Mode

If MR:EGO adds multi-window floating workspace, Level 8 would host:
- Window chrome and controls
- Window management overlay
- Cross-window drag indicators

### Scenario 4: Platform Integration

If MR:EGO runs as a standalone desktop application, Level 8+ would host:
- Native title bar elements
- System tray integration
- Global shortcut overlays
- Update notification overlays

---

## Expansion Constraints

1. **No expansion may reduce the existing 3-layer maximum visibility rule.**
2. **Reserved levels maintain the same depth physics** (shadow, glass, elevation behavior).
3. **New levels must be added from the top down** (Level 6 before Level 7).
4. **Each new level must be documented** with full specifications before implementation.
5. **Performance budget applies to all levels** — depth effects must not degrade 60fps.
6. **Backward compatibility is mandatory** — existing themes support new levels by default.
7. **User preference controls** whether new depth features are enabled.

---

## Depth Scalability

The depth system supports unlimited scalability because:

1. **Layers are additive, not transformative** — new layers follow the same rules as existing ones.
2. **Shadow values scale logarithmically** — each new layer extends the shadow formula, not invents new values.
3. **Z-index ranges are reserved in blocks** — each level occupies a 100-point range (0–99, 100–199, etc.).
4. **Element-to-layer mapping is documented** — new elements map to existing or new layers using the same reference system.

---

*These Future Depth Expansion guidelines are permanent. The depth system grows through reserved levels without redesigning the existing hierarchy. Refer to [Depth-System.md](Depth-System.md) for the depth system foundation, [Future-Expansion.md](../../01-Constitution/Future-Expansion.md) for expansion governance, and [Layer-Hierarchy.md](Layer-Hierarchy.md) for current layer assignments.*
