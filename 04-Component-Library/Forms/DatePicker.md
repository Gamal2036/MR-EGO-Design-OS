# DatePicker

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md), [Motion-System](../../02-Design-Language/Motion-System.md))

---

## Purpose

Calendar-based date and time selection component. Supports single date, date range, date+time, and month-picker variants with configurable min/max constraints.

---

## Responsibilities

- Render a text input trigger displaying the selected date(s)
- Open an interactive calendar overlay on trigger click/focus
- Support single date selection by clicking a day cell
- Support range selection with start and end dates
- Display month/year navigation (arrows, dropdown)
- Support time input for date+time variant
- Enforce min/max date constraints (disable out-of-range dates)
- Display selected date range visually (start, end, in-between)
- Support keyboard navigation within the calendar grid

---

## Composition

```
DatePicker
├── DateInput (trigger)
│   ├── DateDisplay (formatted date text)
│   ├── Placeholder
│   ├── CalendarIcon
│   └── ClearButton (optional)
├── CalendarOverlay (Portal)
│   ├── MonthNavigation
│   │   ├── PrevMonthButton
│   │   ├── MonthYearDisplay
│   │   └── NextMonthButton
│   ├── CalendarGrid
│   │   ├── WeekdayHeaders (Sun-Sat)
│   │   └── DayCell (multiple)
│   │       ├── DayNumber
│   │       └── RangeIndicator (if in range)
│   ├── TimeInput (time variant only)
│   ├── TodayButton ("Today" quick-select)
│   └── ApplyButtons (range variant)
└── HelperText / ErrorMessage
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Provides label, layout |
| Child | DateInput | Trigger display |
| Child | CalendarOverlay | Calendar picker panel |
| Child | DayCell | Individual day selection |
| Child | TimeInput | Time picker (time variant) |

---

## Props Contract

```typescript
/** Date selection mode. */
export type DatePickerMode = 'single' | 'range' | 'with-time' | 'month';

/**
 * Props for the DatePicker component.
 */
export interface DatePickerProps {
  // Display
  /** Selection mode. @default "single" */
  mode?: DatePickerMode;
  /** Size variant. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the picker spans full width. @default false */
  fullWidth?: boolean;
  /** Placeholder text. @default "Select date" */
  placeholder?: string;
  /** Locale for date formatting. @default "en-US" */
  locale?: string;
  /** Date format string. @default "MMM dd, yyyy" */
  dateFormat?: string;
  /** First day of week. 0=Sunday, 1=Monday. @default 0 */
  firstDayOfWeek?: 0 | 1;
  /** Whether to show week numbers. @default false */
  showWeekNumbers?: boolean;

  // State
  /** Selected date (single mode). */
  value?: Date;
  /** Selected start date (range mode). */
  startDate?: Date;
  /** Selected end date (range mode). */
  endDate?: Date;
  /** Default selected date (uncontrolled). */
  defaultValue?: Date;
  /** Whether the picker is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the picker is loading. @default false */
  isLoading?: boolean;
  /** Whether the picker has an error. @default false */
  hasError?: boolean;
  /** Error message text. */
  errorMessage?: string;
  /** Whether the picker is required. @default false */
  isRequired?: boolean;
  /** Whether the calendar is open (controlled). */
  isOpen?: boolean;

  // Constraints
  /** Minimum selectable date. */
  minDate?: Date;
  /** Maximum selectable date. */
  maxDate?: Date;
  /** Disable specific dates. */
  disabledDates?: Date[];
  /** Disable days of week (0=Sun, 6=Sat). */
  disabledDaysOfWeek?: number[];

  // Content
  /** Label text above. */
  label?: string;
  /** Helper text below. */
  helperText?: string;
  /** Name attribute. */
  name?: string;

  // Events
  /** Called when date is selected (single mode). */
  onChange?: (date: Date | null) => void;
  /** Called when range is selected (range mode). */
  onRangeChange?: (start: Date | null, end: Date | null) => void;
  /** Called when the calendar opens. */
  onOpen?: () => void;
  /** Called when the calendar closes. */
  onClose?: () => void;

  // Accessibility
  /** ARIA label. */
  ariaLabel?: string;
  /** Custom ID. */
  id?: string;

  // Styling
  /** Additional CSS class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;

  // Testing
  /** Test identifier. */
  dataTestId?: string;
}
```

---

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `single` | Click a single day to select | Birthdate, appointment |
| `range` | Click start and end dates | Date ranges, bookings |
| `with-time` | Single date with hour/minute selector | Event start, deadlines |
| `month` | Month+Year picker without days | Billing cycles, reports |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | Date input with placeholder | Ready for interaction |
| **Filled** | Formatted date displayed | Date selected |
| **Focused** | Focus ring on input | Keyboard ready |
| **Calendar open** | Overlay visible, current month shown | Navigation enabled |
| **Disabled** | 40% opacity | Cannot interact |
| **Error** | Error border + message | Validation failure |
| **Day default** | Day number, neutral | Selectable date |
| **Day hover** | Light brand background | Interactive preview |
| **Day selected** | Brand fill, white text | Chosen date |
| **Day disabled** | 30% opacity, strikethrough | Out of range / blocked |
| **Day today** | Brand text, subtle ring | Current date indicator |
| **Range start** | Brand fill, rounded left | Range beginning |
| **Range end** | Brand fill, rounded right | Range end |
| **Range between** | Light brand fill | Dates in range |
| **Month active** | Brand fill | Current month in view |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Role** | `role="dialog"` on calendar overlay, `grid` on calendar, `gridcell` on days. |
| **Label** | `aria-label` on picker, `aria-label="Next month"` on nav buttons. |
| **Selected state** | `aria-selected="true"` on selected day cells. |
| **Disabled days** | `aria-disabled="true"` on disabled cells. |
| **Current date** | `aria-current="date"` on today's cell. |
| **Live region** | `aria-live="polite"` for month/year changes. |
| **Error** | `aria-invalid`, `aria-describedby`. |
| **Focus** | Focus enters the grid on the selected date or today. Arrow keys navigate cells. |
| **Keyboard** | Arrow keys move between days. Enter/Space to select. Escape to close. Page Up/Down for month. Home/End for first/last day of month. |
| **Screen reader** | Announce selected date, navigation instructions, disabled dates reason. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Full width. Calendar renders as bottom sheet or full-screen. Touch targets 44x44px. |
| Tablet (768-1023px) | Full width or fixed. Calendar as overlay. |
| Desktop (1024-1279px) | Fixed width up to 320px. Calendar positioned below. |
| Wide (1280-1599px) | Fixed width. Calendar positioned intelligently. |
| Ultra-wide (1600px+) | Standard behavior. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Calendar appear | Open | 200ms | Ease-Out |
| Calendar disappear | Close | 150ms | Ease-In |
| Month slide | Navigation | 200ms | Ease-Out |
| Day fill | Selected | 100ms | Ease-Out |
| Range highlight | Selection | 150ms | Ease-Out |
| Focus ring | Focus | 150ms | Ease-Out |

Month slides use directional animation (left for next, right for prev).

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `mode="week"` | Week picker for weekly views |
| `mode="quarter"` | Quarter picker for financial periods |
| `mode="year"` | Year picker |
| `presets` prop | Preset date ranges (Last 7 days, This month, etc.) |
| `multi` prop | Select multiple non-consecutive dates |
| `timeFormat` prop | 12h/24h time format |
| `timeStep` prop | Minute increment step (5, 15, 30) |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Portal | Internal | Calendar overlay rendering |
| ClickOutside | Internal | Close on outside click |
| Icon (Calendar, Chevron, Clock) | Internal | UI icons |
| Button | Internal | Navigation buttons |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Input.md | Base pattern for date input trigger |
| FormGroup.md | Parent wrapper |

---

## Anti-patterns

1. **Manual date typing without parsing** — Always parse and validate typed dates.
2. **Ignoring timezone** — Use UTC or explicitly pass timezone prop.
3. **Too many disabled dates** — Communicate constraints clearly; don't surprise users.
4. **No month/year quick-nav** — Always provide dropdown for year and month selection.
5. **Range without visual feedback** — Show start, end, and in-between states clearly.
6. **Using native date picker** — Use this component for consistent cross-browser experience.

---

## Performance Notes

- Calendar grid calculates 42 days (6 weeks) per month — pre-compute for performance.
- Month navigation does not re-render the entire calendar — only grid content changes.
- Use `date-fns` or `dayjs` for date manipulation (lighter than moment.js).
- Avoid re-creating date objects on every render — memoize formatted dates.
- Range selection highlights are CSS-only for performance (no JS paint).
