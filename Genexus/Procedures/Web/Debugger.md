# Procedure: Debugger

- **Module:** Web
- **Description:** Debugger
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| FechaArchivo | Variable | DATETIME |  | Fecha Archivo |
| HTTP_HOST | Variable | VARCHAR |  | HTTP_HOST |
| Log | Parameter | LONGVARCHAR | inout | Log |
| MensajeDebug | Variable | LONGVARCHAR |  | Mensaje Debug |
| NivelDebug | Parameter | NUMERIC | in | Nivel Debug |
| NivelDebugConfigurado | Variable | NUMERIC |  | Nivel Debug Configurado |
| NivelDebugDescripcion | Variable | VARCHAR |  | Nivel Debug Descripcion |
| NombreArchivo | Variable | CHARACTER |  | Nombre Archivo |
| Programa | Parameter | VARCHAR | inout | Programa |
| ResultFile | Variable | NUMERIC |  | Result File |
| TipoDebug | Variable | NUMERIC |  | Tipo Debug |
| Usuario | Variable | VARCHAR |  | Usuario |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| HttpRequest | Variable | GX_USRDEFTYP |  | Http Request |
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
/*
 Niveles de debug:
0 - Apagado
1 - Informativo
2 - Advertencia
3 - Debug
4 - Error
5 - Critico
El Nivel de debug detallará a partir de que nivel se desea informar:
	Si por ejemplo el parámetro indica 0(Apagado) -> no se generan logs
	Si por ejemplo el parámetro indica 1(Critico) -> se muestran solo los críticos
	Si por ejemplo el parámetro indica 2(Error) -> se muestran los de tipo error y críticos
	Si por ejemplo el parámetro indica 3(Degub) -> se muestran los de tipo error, degub y críticos
	Si por ejemplo el parámetro indica 3(Advertencia) -> se muestran los de tipo error, degub, advertencia y críticos
	Si por ejemplo el parámetro indica 5(Informativo) -> se muestran los de tipo error, degub, advertencia, informativos y críticos
	
*/

//call("CargarContexto", &Contexto)
&Usuario = &WebSession.Get('UserName').ToString()


&HTTP_HOST= &HttpRequest.BaseUrl.Replace('/','')
&HTTP_HOST= &HTTP_HOST.Replace(':','')
&FechaArchivo = Now()
//Se carga el nivel del debug configurado en base de datos
&NivelDebugConfigurado = NivelDebug.Informativo
//Se carga el tipo de debugg base de datos o archivo
&TipoDebug = TipoDebug.Archivo
&NivelDebugDescripcion = &NivelDebug.EnumerationDescription()

//valida si el debug esta prendido o esta dentro del rango
if &NivelDebugConfigurado  >= &NivelDebug
	do case
		case &TipoDebug = TipoDebug.BaseDatos
			//guardar en base de datos
		case &TipoDebug = TipoDebug.Archivo
			//guardad en archivo
			Do 'GuardarArchivo'
	endcase
else
	return
endif


sub 'GuardarArchivo'
	&NombreArchivo =  &HTTP_HOST.Trim() + "_" + &FechaArchivo.Year().ToString().Trim()+&FechaArchivo.Month().ToString().Trim()+&FechaArchivo.Day().ToString().Trim() + ".log"
	
	&MensajeDebug =  "-> Usuario: "+ &Usuario.ToString() +" | "+&Time.ToString().Trim()+" ("+&NivelDebugDescripcion.Trim()+") "+"["+&Programa.ToString().Trim()+"] -> "
	&MensajeDebug = &MensajeDebug + &Log
	&ResultFile = DFWOpen(&NombreArchivo,"","",1)
	&ResultFile = DFWPTxt(&MensajeDebug)
	&ResultFile = DFWNext()
	&ResultFile = DFWClose()
endsub
```

### Rules (Rules)

```genexus
parm(in:&NivelDebug,&Programa,&Log);
```

