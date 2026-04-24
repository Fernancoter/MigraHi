# `_menu.json` schema

Comprehension artifact emitted at the root of the output directory.
Captures the KB's runtime navigation tree (the DVelop_Menu structure
assembled by the `MenuByModule` dispatcher + its dispatched Menu*
DataProviders).

## Top-level

An array of **root** objects, one per navigation surface.

```json
[
  { "root": "Web", "items": [ ... ] }
]
```

| Field  | Type   | Required | Description |
|--------|--------|----------|-------------|
| root   | string | yes      | Name of the surface. Currently only `"Web"`. Future roots: `"Mobile"` (SDPanel-based, TODO). |
| items  | array  | yes      | Top-level `MenuItem`s for this surface. |

## MenuItem

Every node in the tree is a `MenuItem`. Leaves have no `children`;
headers/folders have no `target` / `targetType`.

### Fields

| Field             | Type    | Required                              | Description |
|-------------------|---------|---------------------------------------|-------------|
| label             | string  | yes                                   | Display text. From the DSL `caption` field when present. |
| label_source      | string  | only when label was derived           | `"fallback_from_dp_name"` when the caption was empty/dynamic and we stripped the `Menu` prefix from the DP name instead. Omitted when the label came directly from the DSL. |
| target            | string  | only for leaves                       | Name of the object this item opens. Matches the `name` field in `_index.json` (canonical casing, not the DSL literal). Omitted for header/folder items. |
| targetType        | string  | only for leaves                       | One of `"WebPanel"`, `"WebComponent"`, `"Procedure"`, `"SDPanel"`, `"dynamic"`, `"unresolved"`. Omitted for header/folder items — absence of this field **is** the "this is a header" signal. |
| targetModule      | string  | when target is in a named module      | Canonical module name. Root-module objects emit `"Root"` (never `"Root Module"` or empty). Omitted for header/folder items, and for leaves whose target module is unknown. |
| authKey           | string  | when DSL had `authorizationKey`       | Security key gating the item. Omitted when the DSL field is empty or a dynamic expression. |
| iconClass         | string  | when DSL had `iconClass` literal       | CSS/FontAwesome class. Omitted when absent or dynamic. |
| tooltip           | string  | when DSL had `tooltip` literal        | Hover text. Omitted when absent or dynamic. |
| isDefault         | bool    | only `true` on the default item        | `true` on the top-level item that `MenuByModule`'s `Otherwise` branch resolves to (currently `MenuProduccion`). Field is omitted on every other item. |
| unresolved_reason | string  | only when `targetType == "unresolved"` | Human-readable explanation. Examples: `"DataProvider 'X' not found in parsed output"`, `"cycle detected: A → B → A"`, `"depth cap 6 exceeded"`, `"link target 'X' not found in KB object enumeration"`. |
| children          | array   | only when the node has sub-items       | Nested `MenuItem`s. Omitted (not emitted as `[]`) on leaves. |

### targetType values

| Value         | Meaning |
|---------------|---------|
| `"WebPanel"`    | Target is a WebPanel. |
| `"WebComponent"`| Target is a WebComponent. |
| `"Procedure"`   | Target is a Procedure (rare in menus — typically used for export/print actions). |
| `"SDPanel"`     | Target is a SmartDevice panel (mobile). |
| `"dynamic"`     | The DSL `link` is an expression (variable, `iif(...)`, literal URL) that the scanner does not evaluate. `target` holds the raw expression verbatim. |
| `"unresolved"`  | The name extracted from the DSL does not match any enumerated KB object. `target` holds the bare name. `unresolved_reason` explains why. |

### Header/folder items (Option B: omitted targetType)

When a node serves as a grouping header (e.g., "Producción", "Catálogos",
"Referencias") it has no associated runtime target — users can't click it
to navigate. For these items, `target`, `targetType`, and `targetModule`
are **all omitted** from the JSON. Presence of a populated `children`
array plus absence of `targetType` is the canonical "this is a header"
signal.

Downstream consumers should treat `targetType == null || missing` as
equivalent to `kind == "folder"`.

## Stability rules

- **Preservation**: labels are emitted verbatim from the DSL, including
  Spanish diacritics. Never translated.
- **Canonical casing**: `target` and `targetModule` use the KB's
  canonical casing (the value present in `_index.json`), not whatever
  casing the DSL used in `link = foo.Link()`. The DSL relies on
  Windows' case-insensitive filesystem; downstream consumers may be
  case-sensitive, so we commit to the canonical form.
- **Canonical module names**: root-module objects always emit `"Root"`.
  The SDK's raw `"Root Module"` string and the legacy empty-string
  convention are both collapsed upstream in the parser layer.
- **Null omission**: all optional fields are omitted rather than
  emitted as `null` or empty string. Consumers can distinguish
  "absent" from "explicit empty".
