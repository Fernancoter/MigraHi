import re

reportes_codes = {
    "addressdisplay_Execute", "bobina_Delete", "bobina_Execute", "bobina_FullControl", "bobina_Insert", "bobina_Update",
    "budget_Delete", "budget_Execute", "budget_FullControl", "budget_Insert", "budget_Update",
    "carrera_Delete", "carrera_Execute", "carrera_FullControl", "carrera_Insert", "carrera_Update",
    "carrete_Delete", "carrete_Execute", "carrete_FullControl", "carrete_Insert", "carrete_Update",
    "carretedefecto_Delete", "carretedefecto_Execute", "carretedefecto_FullControl", "carretedefecto_Insert", "carretedefecto_Update",
    "causainterrupcion_Delete", "causainterrupcion_Execute", "causainterrupcion_FullControl", "causainterrupcion_Insert", "causainterrupcion_Update",
    "company_Delete", "company_Execute", "company_FullControl", "company_Insert", "company_Update",
    "configuracion_Delete", "configuracion_Execute", "configuracion_FullControl", "configuracion_Insert", "configuracion_Update",
    "consolidated_Delete", "consolidated_Execute", "consolidated_FullControl", "consolidated_Insert", "consolidated_Update",
    "customer_Delete", "customer_Execute", "customer_FullControl", "customer_Insert", "customer_Update",
    "document_Delete", "document_Execute", "document_FullControl", "document_Insert", "document_Update",
    "documento_Delete", "documento_Execute", "documento_FullControl", "documento_Insert", "documento_Update",
    "downtimecode_Delete", "downtimecode_Execute", "downtimecode_FullControl", "downtimecode_Insert", "downtimecode_Update",
    "embarque_Delete", "embarque_Execute", "embarque_FullControl", "embarque_Insert", "embarque_Update",
    "embarquedetalle_Delete", "embarquedetalle_Execute", "embarquedetalle_FullControl", "embarquedetalle_Insert", "embarquedetalle_Update",
    "embarquepallet_Delete", "embarquepallet_Execute", "embarquepallet_FullControl", "embarquepallet_Insert", "embarquepallet_Update",
    "etiquetadooperador_Delete", "etiquetadooperador_Execute", "etiquetadooperador_FullControl", "etiquetadooperador_Insert", "etiquetadooperador_Update",
    "existencia_Delete", "existencia_Execute", "existencia_FullControl", "existencia_Insert", "existencia_Update",
    "existenciaproducto_Delete", "existenciaproducto_Execute", "existenciaproducto_FullControl", "existenciaproducto_Insert", "existenciaproducto_Update",
    "existenciasilo_Delete", "existenciasilo_Execute", "existenciasilo_FullControl", "existenciasilo_Insert", "existenciasilo_Update",
    "exportoptions_Execute", "extrusion_Delete", "extrusion_Execute", "extrusion_FullControl", "extrusion_Insert", "extrusion_Update",
    "extrusioninterrupcion_Delete", "extrusioninterrupcion_Execute", "extrusioninterrupcion_FullControl", "extrusioninterrupcion_Insert", "extrusioninterrupcion_Update",
    "extrusionresultado_Delete", "extrusionresultado_Execute", "extrusionresultado_FullControl", "extrusionresultado_Insert", "extrusionresultado_Update",
    "extrusora_Delete", "extrusora_Execute", "extrusora_FullControl", "extrusora_Insert", "extrusora_Update",
    "extrusorabobina_Delete", "extrusorabobina_Execute", "extrusorabobina_FullControl", "extrusorabobina_Insert", "extrusorabobina_Update",
    "extrusoramezcladora_Delete", "extrusoramezcladora_Execute", "extrusoramezcladora_FullControl", "extrusoramezcladora_Insert", "extrusoramezcladora_Update",
    "extrusoraobservacion_Delete", "extrusoraobservacion_Execute", "extrusoraobservacion_FullControl", "extrusoraobservacion_Insert", "extrusoraobservacion_Update",
    "extrusoraobservacioncausainterrupcionprompt_Execute", "extrusoraobservacionprompt_Execute", "extrusoraobservacionview_Execute",
    "extrusoraproducto_Delete", "extrusoraproducto_Execute", "extrusoraproducto_FullControl", "extrusoraproducto_Insert", "extrusoraproducto_Update",
    "extrusoraturno_Delete", "extrusoraturno_Execute", "extrusoraturno_FullControl", "extrusoraturno_Insert", "extrusoraturno_Update",
    "ftb_Delete", "ftb_Execute", "ftb_FullControl", "ftb_Insert", "ftb_Update",
    "gamhome_Execute", "gethomemodulessample_Execute", "gethomesampledata_Execute", "gethomesampledataservice_Execute",
    "gethomesampledataservice_Services_Execute", "gethomesamplenamevaluedata_Execute", "gethomesamplenamevaluedata_Services_Execute",
    "getmainhomemodulessample_Execute", "getnotificationssamples_Execute", "getsomehomemodulessample_Execute",
    "home_Execute", "interrupcion_Delete", "interrupcion_Execute", "interrupcion_FullControl", "interrupcion_Insert", "interrupcion_Update",
    "inventario_Delete", "inventario_Execute", "inventario_FullControl", "inventario_Insert", "inventario_Update",
    "listadobobinas_Execute", "listadobobinas_Services_Execute", "listadocarretes_Execute", "listadocarretes_Services_Execute",
    "lote_Delete", "lote_Execute", "lote_FullControl", "lote_Insert", "lote_Update",
    "lotereporte_Delete", "lotereporte_Execute", "lotereporte_FullControl", "lotereporte_Insert", "lotereporte_Update",
    "managefilters_Execute", "menuoptionsdata_Execute", "operador_Delete", "operador_Execute", "operador_FullControl", "operador_Insert", "operador_Update",
    "ordenetiquetado_Delete", "ordenetiquetado_Execute", "ordenetiquetado_FullControl", "ordenetiquetado_Insert", "ordenetiquetado_Update",
    "order_Delete", "order_Execute", "order_FullControl", "order_Insert", "order_Update",
    "palet_Delete", "palet_Execute", "palet_FullControl", "palet_Insert", "palet_Update",
    "paletcarrete_Delete", "paletcarrete_Execute", "paletcarrete_FullControl", "paletcarrete_Insert", "paletcarrete_Update",
    "paletetiquetaimpresa_Delete", "paletetiquetaimpresa_Execute", "paletetiquetaimpresa_FullControl", "paletetiquetaimpresa_Insert", "paletetiquetaimpresa_Update",
    "prensa_Delete", "prensa_Execute", "prensa_FullControl", "prensa_Insert", "prensa_Update",
    "prensacarrera_Delete", "prensacarrera_Execute", "prensacarrera_FullControl", "prensacarrera_Insert", "prensacarrera_Update",
    "prensado_Delete", "prensado_Execute", "prensado_FullControl", "prensado_Insert", "prensado_Update",
    "prensadobobina_Delete", "prensadobobina_Execute", "prensadobobina_FullControl", "prensadobobina_Insert", "prensadobobina_Update",
    "prensadointerrupcion_Delete", "prensadointerrupcion_Execute", "prensadointerrupcion_FullControl", "prensadointerrupcion_Insert", "prensadointerrupcion_Update",
    "prensadoresultado_Delete", "prensatroquel_Execute", "prensatroquel_FullControl", "prensatroquel_Insert", "prensatroquel_Update",
    "prensaturno_Delete", "prensaturno_Execute", "prensaturno_FullControl", "prensaturno_Insert", "prensaturno_Update",
    "product_Delete", "product_Execute", "product_FullControl", "product_Insert", "product_Update",
    "producto_Delete", "producto_Execute", "producto_FullControl", "producto_Insert", "producto_Update",
    "productocategoria_Delete", "productocategoria_Execute", "productocategoria_FullControl", "productocategoria_Insert", "productocategoria_Update",
    "productoterminado_Delete", "productoterminado_Execute", "productoterminado_FullControl", "productoterminado_Insert", "productoterminado_Update",
    "promptgeolocation_Execute", "reclamo_Delete", "reclamo_Execute", "reclamo_FullControl", "reclamo_Insert", "reclamo_Update",
    "reclamodetalle_Delete", "reclamodetalle_Execute", "reclamodetalle_FullControl", "reclamodetalle_Insert", "reclamodetalle_Update",
    "reclamodetallecarretedefecto_Delete", "reclamodetallecarretedefecto_Execute", "reclamodetallecarretedefecto_FullControl", "reclamodetallecarretedefecto_Insert", "reclamodetallecarretedefecto_Update",
    "remission_Delete", "remission_Execute", "remission_FullControl", "remission_Insert", "remission_Update",
    "salesperson_Delete", "salesperson_Execute", "salesperson_FullControl", "salesperson_Insert", "salesperson_Update",
    "savefilteras_Execute", "secgamgetadvancedsecuritywwpfunctionalities_Execute", "sidebaritemsdp_Execute",
    "silo_Delete", "silo_Execute", "silo_FullControl", "silo_Insert", "silo_Update",
    "statementofincome_Delete", "statementofincome_Execute", "statementofincome_FullControl", "statementofincome_Insert", "statementofincome_Update",
    "troquel_Delete", "troquel_Execute", "troquel_FullControl", "troquel_Insert", "troquel_Update",
    "troquelproducto_Delete", "troquelproducto_Execute", "troquelproducto_FullControl", "troquelproducto_Insert", "troquelproducto_Update",
    "turno_Delete", "turno_Execute", "turno_FullControl", "turno_Insert", "turno_Update",
    "usercustomizations_Delete", "usercustomizations_Execute", "usercustomizations_FullControl", "usercustomizations_Insert", "usercustomizations_Update",
    "wwp_loadtreeviewsampledata_Execute", "wwp_parameter_Delete", "wwp_parameter_Execute", "wwp_parameter_FullControl", "wwp_parameter_Insert", "wwp_parameter_Update",
    "wwp_parameter_dataprovider_Execute", "wwp_parameterww_Execute", "wwp_parameterww_Services_Execute"
}

seeder_path = r'c:\Users\Ronny\Desktop\HICONE\MigraHi\HiCone6\HiCone_ERP\src\Infrastructure\HiCone.Persistence\Seeds\ApplicationDbContextSeeder.cs'

with open(seeder_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Normalize existing content (clean up previous attempts)
content = content.replace('Application app', 'SecurityApplication app')
content = content.replace('var applications = new List<Application>', 'var applications = new List<SecurityApplication>')
content = content.replace('new Application {', 'new SecurityApplication {')
content = content.replace('await _context.Applications', 'await _context.SecurityApplications')
content = content.replace('new ApplicationPermission', 'new SecurityApplicationPermission')
content = content.replace('ApplicationId =', 'SecurityApplicationId =')
content = content.replace('await _context.ApplicationPermissions', 'await _context.SecurityApplicationPermissions')
content = content.replace('ap.ApplicationId', 'ap.SecurityApplicationId')

# Re-apply replacements for HICONE -> ReportesHICONE if missed
for code in reportes_codes:
    pattern = r'Module = "HICONE", (Name = ".*?", )Code = "' + re.escape(code) + '"'
    replacement = r'Module = "ReportesHICONE", \1Code = "' + code + '"'
    content = re.sub(pattern, replacement, content)

# Ensure GAM Backoffice naming
content = content.replace('Module = "GAM"', 'Module = "GAM Backoffice"')

with open(seeder_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Seeder fixed and updated.")
