# Composition Rules

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md))

---

## Purpose

Defines the rules for composing components together to build interfaces. Every page and feature in MR:EGO must follow these composition rules.

---

## Composition Model

Components compose through a parent-child hierarchy:

```
ParentComponent
├── ChildComponent
│   └── GrandchildComponent
├── SiblingComponent
└── AnotherChild
```

---

## Composition Rules

### Rule 1: Single Responsibility

Every component has exactly one responsibility. Composed components solve complex problems by combining single-responsibility components.

**Correct:**
```
SearchPage
├── SearchInput (search entry)
├── Filters (filter criteria)
├── Results List (search results)
└── Pagination (page navigation)
```

**Incorrect:**
```
SearchPage (does everything — search, filter, display, paginate)
```

### Rule 2: Container/Presenter Pattern

Components are categorized as containers (managing state/layout) or presenters (rendering UI).

| Type | Purpose | Example |
|------|---------|---------|
| Container | State management, data fetching, layout logic | Workspace, Dashboard, Page |
| Presenter | Pure rendering, no data logic | Button, Card, Input, Badge |

### Rule 3: Limited Composition Depth

Maximum recommended composition depth: 5 levels.

```
Page (Level 0)
  └── Workspace (Level 1)
       └── ContentArea (Level 2)
            └── Card (Level 3)
                 └── Badge (Level 4)
```

Beyond 5 levels, consider extracting intermediate components.

### Rule 4: Slot-Based Composition

Components expose named slots for content injection rather than accepting configuration objects.

**Correct:**
```typescript
<Card>
  <Card.Header>
    <Card.Title>Profile</Card.Title>
  </Card.Header>
  <Card.Body>
    <UserProfileContent />
  </Card.Body>
  <Card.Footer>
    <Button>Save</Button>
  </Card.Footer>
</Card>
```

**Incorrect:**
```typescript
<Card
  headerTitle="Profile"
  headerIcon={userIcon}
  bodyContent={<UserProfileContent />}
  footerAction={<Button>Save</Button>}
/>
```

### Rule 5: Prop Drilling Avoidance

Components must not pass props more than 2 levels deep. Use context or composition instead.

**Correct:**
```typescript
<ThemeProvider>
  <Button> {/* Button accesses theme via context */}
```

**Incorrect:**
```typescript
<Workspace theme="dark">
  <Sidebar theme="dark">
    <SidebarItem theme="dark"> {/* prop drilling */}
```

### Rule 6: Children Prop

Use React `children` prop for flexible content insertion:

| Pattern | Usage |
|---------|-------|
| `{children}` | Default content slot |
| Named children | Explicit slot names (Header, Body, Footer) |
| Render props | Dynamic rendering with component context |

### Rule 7: Conditional Composition

Conditional content is handled by the parent container, not by child components.

**Correct:**
```typescript
<Card>
  {showHeader && <Card.Header>...</Card.Header>}
  <Card.Body>...</Card.Body>
</Card>
```

**Incorrect:**
```typescript
<Card showHeader={showHeader}>
  {/* Card internally conditionally renders header */}
</Card>
```

### Rule 8: Stable Composition

Composed component structures must not change between renders. Use key props to maintain stable references.

---

## Allowed Children

Each component document specifies its allowed children in the Composition section. General rules:

| Parent | Allowed Children |
|--------|-----------------|
| Card | Card.Header, Card.Body, Card.Footer |
| Panel | Panel.Header, Panel.Body, Panel.Footer |
| Sidebar | SidebarGroup, SidebarItem, Divider |
| FormGroup | Form controls, Validation |
| Tabs | TabPanel |
| Accordion | AccordionItem |
| Table | Table.Header, Table.Body, Table.Footer, Table.Row |
| List | List.Item |
| Breadcrumb | Breadcrumb.Item |
| Stack | Any inline-level components |
| Grid | Grid.Column, Grid.Cell |

---

## Forbidden Composition Patterns

1. **No nested scrollable containers** — Only one scrollable container per viewport axis.
2. **No button-inside-button** — Interactive elements must not be nested.
3. **No modal-inside-modal** — Only one modal at a time.
4. **No form-inside-toast** — Forms must not appear inside transient notifications.
5. **No portal-inside-portal** — Portals must not be nested.
6. **No context-menu-inside-context-menu** — Context menus must not be nested.
7. **No circular composition** — A component must not render itself (directly or indirectly).
8. **No deeply nested providers** — Maximum 3 context provider nesting levels.
