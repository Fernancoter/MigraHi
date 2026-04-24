# Procedure: SDPGetRadialGauge

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPGet Radial Gauge
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| HTML | Parameter | LONGVARCHAR | out | HTML |
| AllowAnimation | Parameter | Boolean | in | Allow Animation |
| InnerText | Parameter | VARCHAR | in | Inner Text |
| ProgressColor | Parameter | CHARACTER | in | Progress Color |
| propertyName | Variable | VARCHAR |  | property Name |
| propertyValue | Variable | VARCHAR |  | property Value |
| ShadowColor | Parameter | VARCHAR | in | Shadow Color |
| TextColor | Parameter | VARCHAR | in | Text Color |
| Value | Parameter | NUMERIC | in | Value |
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
&HTML = !'<meta name="viewport" content= "width=device-width, user-scalable=no"><style>body{background-color: #00000000;}.flex-wrapper{display: flex; flex-flow: row nowrap;}.single-chart{width: 100%; justify-content: space-around ;}.circular-chart{display: block; margin: 10px auto; max-width: 80%; max-height: 250px;}.circle-bg{fill: none; stroke: %shadowcolor%; stroke-width: 3.8;}.circle{fill: none; stroke-width: 2.8; stroke-linecap: round; %animation%}@keyframes progress{0%, 40% { opacity: 0;} 40% { stroke-dasharray: 0 100;}} .percentage{fill: %textcolor%; font-family: sans-serif; font-size: 0.5em; text-anchor: middle;}</style>' 
//0%{opacity: 0;}10%{stroke-dasharray: 0 100;}
&HTML += !'<div class="flex-wrapper"> <div class="single-chart"><svg viewBox="0 0 36 36" class="circular-chart"><path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"  />'
&HTML += !'<path class="circle" stroke="%color%" stroke-dasharray="%value%, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><text x="18" y="20.35" class="percentage">%text%</text></svg></div></div>'

&propertyName = !"color"
&propertyValue = &ProgressColor
If &ProgressColor.IsEmpty()
	&propertyValue = !"#4CC790"
EndIf
do 'ReplaceTemplate'

&propertyName = !"value"
&propertyValue = &Value.ToString()
If &Value > 100
	&propertyValue = !"100"
EndIf
do 'ReplaceTemplate'

&propertyName = !"text"
&propertyValue = &InnerText
If &InnerText.Length() = 0
	&propertyValue = &Value.ToString() + !"%"
EndIf
do 'ReplaceTemplate'

&propertyName = !"animation"
&propertyValue = !""
If &AllowAnimation
	&propertyValue = !"animation: progress 2s ease-out forwards;"
EndIF
do 'ReplaceTemplate'

&propertyName = !"textcolor"
&propertyValue = &TextColor
If &ProgressColor.IsEmpty()
	&propertyValue = !"#666"
EndIf
do 'ReplaceTemplate'

&propertyName = !"shadowcolor"
&propertyValue = &ShadowColor
If &ProgressColor.IsEmpty()
	&propertyValue = !"#eee"
EndIf
do 'ReplaceTemplate'

Sub 'ReplaceTemplate'
	&HTML = &HTML.Replace(!"%" + &propertyName.Trim() + !"%", &propertyValue.Trim())
endSub
```

### Rules (Rules)

```genexus
Parm(in:&Value, in:&InnerText, in:&ProgressColor, in:&TextColor, in:&ShadowColor, in:&AllowAnimation, out:&HTML);
```

