# WebPanel: PrensaDetenida

- **Module:** Produccion
- **Description:** Prensa Detenida
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Detenido | Variable | Boolean |  | Detenido |
| Id | Variable | NUMERIC |  | Id |
| Interrupcion | Variable | GX_BUSCOMP |  | Interrupcion |
| InterrupcionId | Variable | NUMERIC |  | Interrupcion Id |
| Motivo | Variable | VARCHAR |  | Motivo |
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| PrensadoInterrupcion | Variable | GX_BUSCOMP |  | Prensado Interrupcion |
| Temporizador | Variable | NUMERIC |  | Temporizador |
| Tiempo | Variable | DATETIME |  | Tiempo |
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### &Detenido.ControlValueChanged (Event)

```genexus
if(Not &Detenido)
		tb1.Visible = true
	else
		tb1.Visible = false
	endif
```

### Start (Event)

```genexus
&Detenido = true
	tb1.Visible = false
	tb2.Visible = false
	Retomar.Enabled = false
```

### 'Aceptar' (Event)

```genexus
if(Not &Detenido) //Interrupcion
		if(Not &Motivo.IsEmpty())
	              Aceptar.Enabled = false
		      Retomar.Enabled = true
		      &Motivo.Enabled = false
		      &Detenido.Enabled = false
		      tb2.Visible = true
		      
		      &Id = CrearInterrupcion.Udp(&Motivo)
		      do 'PrensadoInterrupcion' 
	       else
		       msg('Debe redactar el motivo de la interrupción')
	       endif
		     
	else
	      GlobalEvents.DetenerPrensa(&Detenido)
	      return
	endif
```

### 'Retomar' (Event)

```genexus
&Temporizador.Stop()
	
	//Actualizar hora
	&Interrupcion.Load(&Id)
	&Interrupcion.InterrupcionHoraFin = Now()
	&Interrupcion.InterrupcionTiempo = &Temporizador
	&Interrupcion.InterrupcionConcluida = true
	&Interrupcion.Save()
	
	if(&Interrupcion.Success())
		commit
		return
	endif
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId);
```

