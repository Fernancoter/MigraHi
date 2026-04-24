# Procedure: WWP_GetStyledDVCombo

- **Module:** WWPBaseObjects
- **Description:** WWP_Get Styled DVCombo
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| html | Parameter | VARCHAR | out | html |
| Style | Parameter | VARCHAR | in | Style |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Page | Standard Variable | NUMERIC |  | Page |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |

## Business Logic

### Source (Source)

```genexus

Do Case
	Case &Style = !'Title and subtitle'
		&html = !'<div class="StyleTitleAndSubtitle"><span>%1</span><span>%2</span></div>'
	Case &Style = !'Title, subtitle and image'
		&html = !'<div class="StyleImageAndData StyleImageTitleAndSubtitle"><div><img src="%3" /></div><div><span>%1</span><span>%2</span></div></div>'
	Case &Style = !'Title and image'
		&html = !'<div class="StyleImageAndData StyleImageAndTitle"><div><img src="%2" /></div><div><span>%1</span></div></div>'
EndCase
```

### Rules (Rules)

```genexus

parm(in:&Style, out:&html);
```

