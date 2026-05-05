
pdf_codes = [
    "hicone_sdiniciarextrusion_Execute", "hicone_sdiniciarprensado_Execute", "hicone_sdinicio_Execute",
    "hicone_sdinitwizard_Execute", "hicone_sdintermedia_Execute", "hicone_sdlistaextrusiones_Execute",
    "hicone_sdlistaprensados_Execute", "hicone_sdprensadointermedio_Execute", "hicone_sdprensadoreporte_Execute",
    "hicone_sdprensados_Execute", "hicone_sdprensatroquel_Execute", "hicone_sdreportes_Execute",
    "hicone_sdretiquetarcarretes_Execute", "hicone_sdretiquetarpallet_Execute", "hicone_sdsustituirbobina_Execute",
    "hiconehomesd_Execute", "hiconeinfodp_Execute", "hiconeob_Execute", "hiconesdhomebannerdp1_Execute",
    "hiconesdhomebannerdp_Execute", "hiconesoptionsdp_Execute", "home_Execute", "imprimirbobinas_Execute",
    "imprimirbobinas_Services_Execute", "iniciarbobinas_Services_Execute", "iniciarcarrera_Services_Execute",
    "iniciocalidad_Execute", "iniciocatalogossae_Execute", "inicioembarques_Execute", "inicioextrusion_Execute",
    "inicioinventario_Execute", "inicioprensado_Execute", "inicioproduccion_Execute", "inicioreportes_Execute",
    "inicioreporteshc_Execute", "inicioseguridad_Execute", "insumoproducto_Services_Execute", "interrupcion_Delete",
    "interrupcion_Execute", "interrupcion_FullControl", "interrupcion_Insert", "interrupcion_Update",
    "interrupcionprompt_Execute", "interrupcionprompt_Services_Execute", "interrupcionview_Execute",
    "interrupcionww_Execute", "interrupcionww_Services_Execute", "inventario_Delete", "inventario_Execute",
    "inventario_FullControl", "inventario_Insert", "inventario_Update", "inventariodp_Execute",
    "itemnotification_Execute", "itwoutlook_Execute", "jornadalaboral_Services_Execute", "kbs2022sd_Execute",
    "kbs2022sdextrusionmain_Execute", "kbs2022sdhome_Execute", "kbs2022sdhometab3_Execute", "kbs2022sdob_Execute",
    "kbs2022sdprensadomain_Execute", "listadoembarques_Execute", "listadoembarques_Services_Execute",
    "listadoordenes_Execute", "listadoordenes_Services_Execute", "listadoremisiones_Execute",
    "listadoremisiones_Services_Execute", "listarembarques_Execute", "listarembarques_Services_Execute",
    "listarextrusion_Execute", "listarextrusion_Services_Execute", "listarextrusora_Execute",
    "listarextrusora_Services_Execute", "listarextrusoramezcladora_Execute", "listarextrusoramezcladora_Services_Execute",
    "listarextrusoraproducto_Execute", "listarextrusoraproducto_Services_Execute", "listarinventario_Execute",
    "listarinventario_Services_Execute", "listarlotes_Execute", "listarlotes_Services_Execute",
    "listaroperador_Execute", "listaroperador_Services_Execute", "listarprensaproducto_Execute",
    "listarprensaproducto_Services_Execute", "listarprensas_Execute", "listarprensas_Services_Execute",
    "listarproductocategoria_Execute", "listarproductocategoria_Services_Execute", "listarproductos_Execute",
    "listarproductos_Services_Execute", "listarproductoterminado_Execute", "listarproductoterminado_Services_Execute",
    "listarsilos_Execute", "listarsilos_Services_Execute", "listartroquel_Execute", "listartroquel_Services_Execute",
    "listarturnos_Execute", "listarturnos_Services_Execute", "lote_Delete", "lote_Execute", "lote_FullControl",
    "lote_Insert", "lote_Update", "lotedp_Execute", "loteprompt_Execute", "lotereporte_Delete", "lotereporte_Execute",
    "lotereporte_FullControl", "lotereporte_Insert", "lotereporte_Update", "lotesdisponiblesdp_Execute",
    "loteview_Execute", "loteww_Execute", "loteww_Services_Execute", "managefilters_Execute",
    "medirbobinas_Services_Execute", "medirbobinasenproceso_Services_Execute", "menucalidad_Execute"
]

import re

with open(r'c:\Users\Ronny\Desktop\HICONE\migrahi\HiCone6\HiCone_ERP\src\Infrastructure\HiCone.Persistence\Seeds\ApplicationDbContextSeeder.cs', 'r', encoding='utf-8') as f:
    content = f.read()

missing = []
for code in pdf_codes:
    if f'Code = "{code}"' not in content:
        missing.append(code)

print("MISSING CODES:")
for m in missing:
    print(m)
