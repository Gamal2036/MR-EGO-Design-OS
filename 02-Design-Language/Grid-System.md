# Grid System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Brand-Constitution.md](../01-Constitution/Brand-Constitution.md), [Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

The grid system provides structural consistency across every screen in MR:EGO. It creates predictable layouts that users can intuitively navigate and designers can build upon without reinventing layout for every screen.

The grid is a **tool for alignment, not a constraint.** It ensures visual rhythm while remaining flexible enough to accommodate any content.

---

## Breakpoints

| Breakpoint | Min Width | Device | Layout Columns | Container Width |
|------------|-----------|--------|----------------|-----------------|
| Small (sm) | 0px | Mobile, small devices | 4 | 100% |
| Medium (md) | 768px | Tablet | 8 | 720px |
| Large (lg) | 1024px | Desktop | 12 | 960px |
| Extra Large (xl) | 1280px | Desktop wide | 12 | 1140px |
| Ultra Wide (xxl) | 1600px | Ultra-wide | 12 | 1440px |

---

## Column System

MR:EGO uses a **12-column grid** on desktop and a **4/8-column grid** on mobile/tablet.

### Column Behavior

| Property | Value |
|----------|-------|
| Column count (desktop) | 12 |
| Column count (tablet) | 8 |
| Column count (mobile) | 4 |
| Gutter (desktop) | 24px |
| Gutter (tablet) | 20px |
| Gutter (mobile) | 16px |
| Margin (desktop) | 32px |
| Margin (tablet) | 24px |
| Margin (mobile) | 16px |
| Column width | Fluid (1fr each) |

### Column Span Patterns

| Columns | Use Case |
|---------|----------|
| 12/12 | Full-width hero, page header |
| 10/12 + 2/12 | Main content + sidebar (wide layout) |
| 8/12 + 4/12 | Main content + sidebar (standard) |
| 6/12 + 6/12 | Split layout, two-panel |
| 4/12 + 4/12 + 4/12 | Three-column content |
| 3/12 + 3/12 + 3/12 + 3/12 | Four-column card grid |
| 4/12 | Sidebar width |
| 8/12 | Main content width |

---

## Dashboard Grid

Dashboards use a **subgrid** system for flexible widget placement:

| Layout | Columns | Min Widget Width | Description |
|--------|---------|-----------------|-------------|
| 1-column | 1 | 100% | Full-width widgets (mobile, narrow panels) |
| 2-column | 2 | 360px | Standard dashboard layout |
| 3-column | 3 | 280px | Dense dashboard with many widgets |
| 4-column | 4 | 220px | Ultra-wide dashboard with small widgets |

Widgets span 1, 2, or 3 columns based on their content. The grid auto-fills remaining space.

---

## Container Widths

| Context | Container | Max Width | Alignment |
|---------|-----------|-----------|-----------|
| Content (max readability) | Narrow | 720px | Centered |
| Content (standard) | Default | 1140px | Centered |
| Content (full) | Wide | 1440px | Centered |
| Content (dashboard) | Full | 100% | Flush |
| Modal/Dialog | — | 480px (sm), 640px (md), 800px (lg) | Centered |

---

## Alignment Rules

1. **All content aligns to the grid.** No floating elements outside column boundaries.
2. **Text is left-aligned** in left-to-right locales. Center alignment is reserved for hero sections and empty states only.
3. **Content containers are horizontally centered** using auto margins.
4. **Cards within grids maintain equal height** within the same row using flex/grid stretch behavior.
5. **Content never overflows** its grid container. Overflow is handled with horizontal scroll for data tables only.

---

## Grid Usage Rules

1. **Apply grids at the page/section level.** Components use grid cells; they do not create their own grids.
2. **Nesting is limited to one level.** A grid cell can contain a subgrid, but subgrids cannot contain subgrids.
3. **Grids define column structure.** Spacing within cells uses the spacing scale ([Spacing-System.md](Spacing-System.md)).
4. **Content determines span.** Widgets and sections span the minimum number of columns needed.
5. **No fixed-width columns.** All column widths are fluid based on the container.

---

## Future Dashboard Rules

As MR:EGO expands (see [Future-Expansion.md](../01-Constitution/Future-Expansion.md)), the grid system supports:

- **Custom dashboard layouts:** Users can resize and rearrange widgets within the grid. Widgets snap to column boundaries.
- **Module-specific grids:** Modules can define subgrids within their content area, inheriting the main grid's gutter and margin.
- **Variable density:** The grid accommodates comfortable, compact, and dense spacing modes defined in [Spacing-System.md](Spacing-System.md).
- **Nested navigation grids:** Sidebar, top nav, and content area each use independent grid systems that are visually coordinated.

---

*This Grid System is permanent. All layouts in DP-5 and modules in DP-6+ use this grid. Refer to [Spacing-System.md](Spacing-System.md) for gutters and margins, [Responsive-System.md](Responsive-System.md) for breakpoint behavior, and [Layout-Principles.md](Layout-Principles.md) for layout composition rules.*
