# Procedure: SDPGetRangedRadialGaugeFromConfig

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPGet Ranged Radial Gauge From Config
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| HTML | Parameter | LONGVARCHAR | out | HTML |
| GaugeConfig | Parameter | GX_SDT | in | Gauge Config |
| propertyName | Variable | VARCHAR |  | property Name |
| propertyValue | Variable | VARCHAR |  | property Value |
| ValueNumeric | Variable | NUMERIC |  | Value Numeric |
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
&HTML = !'<meta name="viewport" content= "width=device-width, user-scalable=no"><style>text{font-size:40px;font-family:Arial,Helvetica,sans-serif;fill:black}div{text-align:center}#valuePoint{stroke:white;fill:%valuecolor%;stroke-width:10px}g{stroke-width:15}</style>'
&HTML += !'<div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-20 -20 240 240"> <defs> <linearGradient id="firstSection" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1"> <stop offset="0%" stop-color="%firstColorStart%"/> <stop offset="100%" stop-color="%firstColorEnd%"/> </linearGradient> <linearGradient id="secondSection" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1"> <stop offset="0%" stop-color="%secondColorStart%"/> <stop offset="100%" stop-color="%secondColorEnd%"/> </linearGradient> <linearGradient id="thirdSection" gradientUnits="objectBoundingBox" x1="1" y1="0" x2="0" y2="1"> <stop offset="0%" stop-color="%thirdColorStart%"/> <stop offset="100%" stop-color="%thirdColorEnd%"/> </linearGradient> <linearGradient id="fourthSection" gradientUnits="objectBoundingBox" x1="1" y1="1" x2="0" y2="0"> <stop offset="0%" stop-color="%fourthColorStart%"/> <stop offset="100%" stop-color="%fourthColorEnd%"/> </linearGradient> <linearGradient id="fiveSection" gradientUnits="objectBoundingBox" x1="0" y1="1" x2="0" y2="0"> <stop offset="0%" stop-color="%fiveColorStart%"/> <stop offset="100%" stop-color="%fiveColorEnd%"/> </linearGradient> </defs><g fill="none" transform="translate(100,100), rotate(210)"> <path d="M 0,-100 A 100,100 0 0,1 86.6,-50" stroke="url(#firstSection)" style="stroke-linecap: round;"/> <path d="M 86.6,-50 A 100,100 0 0,1 86.6,50" stroke="url(#secondSection)"/> <path d="M 86.6,50 A 100,100 0 0,1 0,100" stroke="url(#thirdSection)"/> <path d="M 0,100 A 100,100 0 0,1 -86.6,50" stroke="url(#fourthSection)"/> <path d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" stroke="url(#fiveSection)" style="stroke-linecap: round;"/> </g> <circle id="valuePoint" cx="170" cy="170" r="20" /> <text x="100" y="100" dominant-baseline="middle" text-anchor="middle">%text%</text> </svg></div>'
&HTML += !'<script>var degrees=%degrees%+90;var radians=degrees_to_radians(degrees);var radius=100;var x=Math.cos(radians)*radius+100;var y=Math.sin(radians)*radius+100;setPosition("valuePoint",x,y);function setPosition(id,x,y){var ctrl=document.getElementById(id);ctrl.setAttribute("cx",x);ctrl.setAttribute("cy",y);} function degrees_to_radians(degrees) {var pi=Math.PI;return degrees*(pi/180);}</script>'

&propertyName = !"height"
&propertyValue = &GaugeConfig.Height.ToString()
do 'ReplaceTemplate'

&propertyName = !"width"
&propertyValue = &GaugeConfig.Width.ToString()
do 'ReplaceTemplate'

&propertyName = !"degrees"
&ValueNumeric = &GaugeConfig.Value * 3 + 30
&propertyValue = &ValueNumeric.ToString()
do 'ReplaceTemplate'

&propertyName = !"valuecolor"
&propertyValue = !"blue"
If Not &GaugeConfig.ValueMarkerColor.Trim().IsEmpty()
	&propertyValue = &GaugeConfig.ValueMarkerColor
EndIf
do 'ReplaceTemplate'

&propertyName = !"text"
&propertyValue = &GaugeConfig.Text
do 'ReplaceTemplate'

&propertyName = !"firstColorStart"
&propertyValue = &GaugeConfig.Range1ColorStart
do 'ReplaceTemplate'

&propertyName = !"firstColorEnd"
&propertyValue = &GaugeConfig.Range1ColorEnd
do 'ReplaceTemplate'

&propertyName = !"secondColorStart"
&propertyValue = &GaugeConfig.Range2ColorStart
do 'ReplaceTemplate'

&propertyName = !"secondColorEnd"
&propertyValue = &GaugeConfig.Range2ColorEnd
do 'ReplaceTemplate'

&propertyName = !"thirdColorStart"
&propertyValue = &GaugeConfig.Range3ColorStart
do 'ReplaceTemplate'

&propertyName = !"thirdColorEnd"
&propertyValue = &GaugeConfig.Range3ColorEnd
do 'ReplaceTemplate'

&propertyName = !"fourthColorStart"
&propertyValue = &GaugeConfig.Range4ColorStart
do 'ReplaceTemplate'

&propertyName = !"fourthColorEnd"
&propertyValue = &GaugeConfig.Range4ColorEnd
do 'ReplaceTemplate'


&propertyName = !"fiveColorStart"
&propertyValue = &GaugeConfig.Range5ColorStart
do 'ReplaceTemplate'

&propertyName = "fiveColorEnd"
&propertyValue = &GaugeConfig.Range5ColorEnd
do 'ReplaceTemplate'


Sub 'ReplaceTemplate'
	&HTML = &HTML.Replace(!"%" + &propertyName.Trim() + !"%", &propertyValue.Trim())
endSub
```

### Rules (Rules)

```genexus
Parm(in:&GaugeConfig, out:&HTML);
```

