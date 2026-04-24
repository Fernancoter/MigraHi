# Procedure: ExportarPermisosPorRol

- **Module:** Root
- **Description:** Exportar Permisos Por Rol
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| FileName | Variable | VARCHAR |  | File Name |
| GAMErrors | Variable | GX_EXTERNAL_OBJECT |  | GAMErrors |
| GAMRole | Variable | GX_EXTERNAL_OBJECT |  | GAMRole |
| HttpResponse | Variable | GX_USRDEFTYP |  | Http Response |
| ok | Variable | NUMERIC |  | ok |
| Permission | Variable | GX_EXTERNAL_OBJECT |  | Permission |
| Permissions | Variable | GX_EXTERNAL_OBJECT |  | Permissions |
| RoleId | Parameter | NUMERIC | in | Role Id |
| RolePermissionFilter | Variable | GX_EXTERNAL_OBJECT |  | Role Permission Filter |
| varchar | Variable | VARCHAR |  | varchar |
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
&FileName = !'Permisos' + &GAMRole.Name.Trim() + !'.csv'
&ok= DFWOpen(&FileName, !',' , !'', 0, 'utf_8')
if(&ok = 0)	
	&GAMRole.Load(&RoleId)
	&Permissions = &GAMRole.GetPermissions(&RolePermissionFilter, &GAMErrors)

	If &Permissions.Count = 0
		&varchar = 'Sin Permisos'
		&ok = DFWPTXT(&varchar, &varchar.Length())
		&ok = DFWNext()
	Else
		
			For &Permission in &Permissions
				
				&varchar = &Permission.GUID.Trim() + '|' + &Permission.Name.Trim() + '|'+ &Permission.Description.ToString().Trim()+ '|' + &Permission.Type + '|' + &Permission.Inherited.ToString().Trim()  +'|' +&Permission.ApplicationId.ToString().Trim()
				
				&ok = DFWPTXT(&varchar, &varchar.Length())
				&ok = DFWNext()
			EndFor		
	EndIf
else
	msg('Error al generar el archivo')
endif	

&ok = DFWClose()

&HttpResponse.AddHeader(!'Content-Type',!'text/csv')
&HttpResponse.AddHeader(!'Content-Disposition',!'attachment;filename=' + !'archivo.csv')
&HttpResponse.AddFile(&FileName)
```

### Rules (Rules)

```genexus
parm(in:&RoleId);
```

