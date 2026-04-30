using HiCone.Domain.Entities.Identity;
using HiCone.Domain.Entities.Inventario;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.Tenant;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace HiCone.Persistence.Seeds;

public class ApplicationDbContextSeeder
{
    private readonly ILogger<ApplicationDbContextSeeder> _logger;
    private readonly ApplicationDbContext _context;

    public ApplicationDbContextSeeder(ILogger<ApplicationDbContextSeeder> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task SeedAsync()
    {
        try
        {
            await _context.Database.EnsureCreatedAsync();
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        // Default Tenant
        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        if (!await _context.Tenants.AnyAsync(t => t.Id == defaultTenantId))
        {
            var defaultTenant = new Tenant
            {
                Id = defaultTenantId,
                Name = "HiCone ERP Default",
                Slug = "default",
                Description = "Default corporate tenant",
                IsActive = true
            };
            _context.Tenants.Add(defaultTenant);
        }

        // Permissions
        var permissions = new List<Permission>
        {
            new() { Module = "Users", Name = "Read Users", Code = "users.read" },
            new() { Module = "Users", Name = "Create Users", Code = "users.create" },
            new() { Module = "Users", Name = "Update Users", Code = "users.update" },
            new() { Module = "Users", Name = "Delete Users", Code = "users.delete" },
            new() { Module = "Inventory", Name = "Read Inventory", Code = "inventory.read" },
            new() { Module = "Inventory", Name = "Manage Inventory", Code = "inventory.manage" },
            
            // GAM
            new() { Module = "GAM", Name = "Change current Repository", Code = "gam_changerepository_Execute" },
            new() { Module = "GAM", Name = "Dashboard", Code = "gam_dashboard_Execute" },
            new() { Module = "GAM", Name = "GAM configuration settings", Code = "gam_gamconfiguration_Execute" },
            new() { Module = "GAM", Name = "General settings", Code = "gam_gamgeneral_Execute" },
            new() { Module = "GAM", Name = "Work with Applications", Code = "gam_wwapplications_Execute" },
            new() { Module = "GAM", Name = "Work with Authentication Types", Code = "gam_wwauthtypes_Execute" },
            new() { Module = "GAM", Name = "Work with Connections", Code = "gam_wwconnections_Execute" },
            new() { Module = "GAM", Name = "Work with Event Subscriptions", Code = "gam_wweventsubscriptions_Execute" },
            new() { Module = "GAM", Name = "Work with Repositories", Code = "gam_wwrepositories_Execute" },
            new() { Module = "GAM", Name = "Work with Roles", Code = "gam_wwroles_Execute" },
            new() { Module = "GAM", Name = "Work with Security Policy", Code = "gam_wwsecuritypolicies_Execute" },
            new() { Module = "GAM", Name = "Work with Sessions", Code = "gam_wwsessions_Execute" },
            new() { Module = "GAM", Name = "Work with Users", Code = "gam_wwusers_Execute" },

            // HICONE
            new() { Module = "HICONE", Name = "Change My Password", Code = "gamchangeyourpassword_Execute" },
            new() { Module = "HICONE", Name = "Home", Code = "gamhome_Execute" },
            new() { Module = "HICONE", Name = "Role Entry", Code = "gamroleentry_Execute" },
            new() { Module = "HICONE", Name = "Select Permissions Role", Code = "gamrolepermissionselect_Execute" },
            new() { Module = "HICONE", Name = "Select Roles Role", Code = "gamroleselect_Execute" },
            new() { Module = "HICONE", Name = "Set New Password", Code = "gamsetpassword_Execute" },
            new() { Module = "HICONE", Name = "User Entry", Code = "gamuserentry_Execute" },
            new() { Module = "HICONE", Name = "Select Permissions User", Code = "gamuserpermissionselect_Execute" },
            new() { Module = "HICONE", Name = "Select Roles User", Code = "gamuserroleselect_Execute" },
            new() { Module = "HICONE", Name = "Role Permissions", Code = "gamwwrolepermissions_Execute" },
            new() { Module = "HICONE", Name = "Roles Role", Code = "gamwwroleroles_Execute" },
            new() { Module = "HICONE", Name = "Roles", Code = "gamwwroles_Execute" },
            new() { Module = "HICONE", Name = "User Permissions", Code = "gamwwuserpermissions_Execute" },
            new() { Module = "HICONE", Name = "User Roles", Code = "gamwwuserroles_Execute" },
            new() { Module = "HICONE", Name = "Users", Code = "gamwwusers_Execute" },
            new() { Module = "HICONE", Name = "Audit WWGet Filter Data Services", Code = "auditww_Services_Execute" },
            new() { Module = "HICONE", Name = "Bar Code Delete", Code = "barcode_Delete" },
            new() { Module = "HICONE", Name = "Bar Code", Code = "barcode_Execute" },
            new() { Module = "HICONE", Name = "Bar Code FullControl", Code = "barcode_FullControl" },
            new() { Module = "HICONE", Name = "Bar Code Insert", Code = "barcode_Insert" },
            new() { Module = "HICONE", Name = "Bar Code Update", Code = "barcode_Update" },
            new() { Module = "HICONE", Name = "Bobina Delete", Code = "bobina_Delete" },
            new() { Module = "HICONE", Name = "Bobina", Code = "bobina_Execute" },
            new() { Module = "HICONE", Name = "Bobina FullControl", Code = "bobina_FullControl" },
            new() { Module = "HICONE", Name = "Bobina Insert", Code = "bobina_Insert" },
            new() { Module = "HICONE", Name = "Bobina Update", Code = "bobina_Update" },
            new() { Module = "HICONE", Name = "Address Display Map", Code = "addressdisplay_Execute" },
            new() { Module = "HICONE", Name = "Agregar Bobinas", Code = "agregarbobinas_Execute" },
            new() { Module = "HICONE", Name = "Audit Delete", Code = "audit_Delete" },
            new() { Module = "HICONE", Name = "Audit", Code = "audit_Execute" },
            new() { Module = "HICONE", Name = "Audit FullControl", Code = "audit_FullControl" },
            new() { Module = "HICONE", Name = "Audit Insert", Code = "audit_Insert" },
            new() { Module = "HICONE", Name = "Audit Update", Code = "audit_Update" },
            new() { Module = "HICONE", Name = "Audit Deleted", Code = "auditdeleted_Execute" },
            new() { Module = "HICONE", Name = "Audit View", Code = "auditview_Execute" },
            new() { Module = "HICONE", Name = "Audit WW", Code = "auditww_Execute" },
            new() { Module = "HICONE", Name = "Bobina Disponible DP", Code = "bobinadisponibledp_Execute" },
            new() { Module = "HICONE", Name = "Bobina Disponible DP Services", Code = "bobinadisponibledp_Services_Execute" },
            new() { Module = "HICONE", Name = "Bobina DP", Code = "bobinadp_Execute" },
            new() { Module = "HICONE", Name = "Bobina DP Services", Code = "bobinadp_Services_Execute" },
            new() { Module = "HICONE", Name = "Bobina Medicion DP", Code = "bobinamediciondp_Execute" },
            new() { Module = "HICONE", Name = "Bobina Medicion DP Services", Code = "bobinamediciondp_Services_Execute" },
            new() { Module = "HICONE", Name = "Select Bobina", Code = "bobinaprompt_Execute" },
            new() { Module = "HICONE", Name = "Palet Report Main", Code = "bobinareportmain_Execute" },
            new() { Module = "HICONE", Name = "Bobina Report Main Multi Services", Code = "bobinareportmain_Services_Execute" },
            new() { Module = "HICONE", Name = "Bobinas En Medicion Services", Code = "bobinasenmedicion_Services_Execute" },
            new() { Module = "HICONE", Name = "Bobina Validada DP", Code = "bobinavalidadadp_Execute" },
            new() { Module = "HICONE", Name = "Bobina Validada DP Services", Code = "bobinavalidadadp_Services_Execute" },
            new() { Module = "HICONE", Name = "Bobina View", Code = "bobinaview_Execute" },
            new() { Module = "HICONE", Name = "Bobina Prensado WCGet Filter Services", Code = "bobinaview_Services_Execute" },
            new() { Module = "HICONE", Name = "Bobina WW", Code = "bobinaww_Execute" },
            new() { Module = "HICONE", Name = "Bobina WWGet Filter Services", Code = "bobinaww_Services_Execute" },
            new() { Module = "HICONE", Name = "Browser URL", Code = "browserurl_Execute" },
            new() { Module = "HICONE", Name = "Budget Delete", Code = "budget_Delete" },
            new() { Module = "HICONE", Name = "Budget", Code = "budget_Execute" },
            new() { Module = "HICONE", Name = "Budget FullControl", Code = "budget_FullControl" },
            new() { Module = "HICONE", Name = "Budget Insert", Code = "budget_Insert" },
            new() { Module = "HICONE", Name = "Budget Update", Code = "budget_Update" },
            new() { Module = "HICONE", Name = "Select Budget", Code = "budgetprompt_Execute" },
            new() { Module = "HICONE", Name = "Budget View", Code = "budgetview_Execute" },
            new() { Module = "HICONE", Name = "Budget WW", Code = "budgetww_Execute" },
            new() { Module = "HICONE", Name = "Budget WWGet Filter Services", Code = "budgetww_Services_Execute" },
            new() { Module = "HICONE", Name = "Cargar Embarque", Code = "cargarembarque_Execute" },
            new() { Module = "HICONE", Name = "Carrera Delete", Code = "carrera_Delete" },
            new() { Module = "HICONE", Name = "Carrera", Code = "carrera_Execute" },
            new() { Module = "HICONE", Name = "Carrera FullControl", Code = "carrera_FullControl" },
            new() { Module = "HICONE", Name = "Carrera Insert", Code = "carrera_Insert" },
            new() { Module = "HICONE", Name = "Carrera Update", Code = "carrera_Update" },
            new() { Module = "HICONE", Name = "Carrera DP", Code = "carreradp_Execute" },
            new() { Module = "HICONE", Name = "Carrera DP Services", Code = "carreradp_Services_Execute" },
            new() { Module = "HICONE", Name = "Select Carrera", Code = "carreraprompt_Execute" },
            new() { Module = "HICONE", Name = "Carreras Terminadas Services", Code = "carrerasterminadas_Services_Execute" },
            new() { Module = "HICONE", Name = "Carrera View", Code = "carreraview_Execute" },
            new() { Module = "HICONE", Name = "Carrera WW", Code = "carreraww_Execute" },
            new() { Module = "HICONE", Name = "Carrera WWGet Filter Services", Code = "carreraww_Services_Execute" },
            new() { Module = "HICONE", Name = "Carrete Delete", Code = "carrete_Delete" },
            new() { Module = "HICONE", Name = "Carrete", Code = "carrete_Execute" },
            new() { Module = "HICONE", Name = "Carrete FullControl", Code = "carrete_FullControl" },
            new() { Module = "HICONE", Name = "Carrete Insert", Code = "carrete_Insert" },
            new() { Module = "HICONE", Name = "Carrete Update", Code = "carrete_Update" },
            new() { Module = "HICONE", Name = "Carrete Defecto Delete", Code = "carretedefecto_Delete" },
            new() { Module = "HICONE", Name = "Carrete Defecto", Code = "carretedefecto_Execute" },
            new() { Module = "HICONE", Name = "Carrete Defecto FullControl", Code = "carretedefecto_FullControl" },
            new() { Module = "HICONE", Name = "Carrete Defecto Insert", Code = "carretedefecto_Insert" },
            new() { Module = "HICONE", Name = "Carrete Defecto Update", Code = "carretedefecto_Update" },
            new() { Module = "HICONE", Name = "Select Carrete Defecto", Code = "carretedefectoprompt_Execute" },
            new() { Module = "HICONE", Name = "Carrete Defecto View", Code = "carretedefectoview_Execute" },
            new() { Module = "HICONE", Name = "Carrete Defecto WW", Code = "carretedefectoww_Execute" },
            new() { Module = "HICONE", Name = "Carrete Defecto WWGet Filter Services", Code = "carretedefectoww_Services_Execute" },
            new() { Module = "HICONE", Name = "Carrete DP", Code = "carretedp_Execute" },
            new() { Module = "HICONE", Name = "Palet Carrete", Code = "carreteenpallet_Execute" },
            new() { Module = "HICONE", Name = "Carrete En Pallet Filter Services", Code = "carreteenpallet_Services_Execute" },
            new() { Module = "HICONE", Name = "Carrete Externo DP", Code = "carreteexternodp_Execute" },
            new() { Module = "HICONE", Name = "Carrete Externo DP Services", Code = "carreteexternodp_Services_Execute" },
            new() { Module = "HICONE", Name = "Carrete Molino", Code = "carretemolino_Execute" },
            new() { Module = "HICONE", Name = "Select Carrete", Code = "carreteprompt_Execute" },
            new() { Module = "HICONE", Name = "Carrete Report Main Services", Code = "carretereportmain_Services_Execute" },
            new() { Module = "HICONE", Name = "Carrete Report Main PCR Services", Code = "carretereportmainpcr_Services_Execute" },
            new() { Module = "HICONE", Name = "Carrete Revision DP", Code = "carreterevisiondp_Execute" },
            new() { Module = "HICONE", Name = "Carrete Revision DP Services", Code = "carreterevisiondp_Services_Execute" },
            new() { Module = "HICONE", Name = "Carrete View", Code = "carreteview_Execute" },
            new() { Module = "HICONE", Name = "Carrete WW", Code = "carreteww_Execute" },
            new() { Module = "HICONE", Name = "Carrete WWGet Filter Services", Code = "carreteww_Services_Execute" },
            new() { Module = "HICONE", Name = "Causa Extrusora DP", Code = "causaextrusoradp_Execute" },
            new() { Module = "HICONE", Name = "Causa Interrupcion Delete", Code = "causainterrupcion_Delete" },
            new() { Module = "HICONE", Name = "Causa Interrupcion", Code = "causainterrupcion_Execute" },
            new() { Module = "HICONE", Name = "Causa Interrupcion FullControl", Code = "causainterrupcion_FullControl" },
            new() { Module = "HICONE", Name = "Causa Interrupcion Insert", Code = "causainterrupcion_Insert" },
            new() { Module = "HICONE", Name = "Causa Interrupcion Update", Code = "causainterrupcion_Update" },
            new() { Module = "HICONE", Name = "Select Causa Interrupcion", Code = "causainterrupcionprompt_Execute" },
            new() { Module = "HICONE", Name = "Causa Interrupcion View", Code = "causainterrupcionview_Execute" },
            new() { Module = "HICONE", Name = "Causa Interrupcion WW", Code = "causainterrupcionww_Execute" },
            new() { Module = "HICONE", Name = "Causa Interrupcion WWGet Filter Services", Code = "causainterrupcionww_Services_Execute" },
            new() { Module = "HICONE", Name = "Causa Prensa DP", Code = "causaprensadp_Execute" },
            new() { Module = "HICONE", Name = "Company Delete", Code = "company_Delete" },
            new() { Module = "HICONE", Name = "Company", Code = "company_Execute" },
            new() { Module = "HICONE", Name = "Company FullControl", Code = "company_FullControl" },
            new() { Module = "HICONE", Name = "Company Insert", Code = "company_Insert" },
            new() { Module = "HICONE", Name = "Company Update", Code = "company_Update" },
            new() { Module = "HICONE", Name = "Select Company", Code = "companyprompt_Execute" },
            new() { Module = "HICONE", Name = "Company View", Code = "companyview_Execute" },
            new() { Module = "HICONE", Name = "Company WW", Code = "companyww_Execute" },
            new() { Module = "HICONE", Name = "Company WWGet Filter Services", Code = "companyww_Services_Execute" },
            new() { Module = "HICONE", Name = "Configuracion Delete", Code = "configuracion_Delete" },
            new() { Module = "HICONE", Name = "Configuracion", Code = "configuracion_Execute" },
            new() { Module = "HICONE", Name = "Configuracion FullControl", Code = "configuracion_FullControl" },
            new() { Module = "HICONE", Name = "Configuracion Insert", Code = "configuracion_Insert" },
            new() { Module = "HICONE", Name = "Configuracion Update", Code = "configuracion_Update" },
            new() { Module = "HICONE", Name = "Consolidated Delete", Code = "consolidated_Delete" },
            new() { Module = "HICONE", Name = "Consolidated", Code = "consolidated_Execute" },
            new() { Module = "HICONE", Name = "Consolidated FullControl", Code = "consolidated_FullControl" },
            new() { Module = "HICONE", Name = "Consolidated Insert", Code = "consolidated_Insert" },
            new() { Module = "HICONE", Name = "Consolidated Update", Code = "consolidated_Update" },
            new() { Module = "HICONE", Name = "Select Consolidated", Code = "consolidatedprompt_Execute" },
            new() { Module = "HICONE", Name = "Consolidated View", Code = "consolidatedview_Execute" },
            new() { Module = "HICONE", Name = "Consolidated WW", Code = "consolidatedww_Execute" },
            new() { Module = "HICONE", Name = "Consolidated WWGet Filter Services", Code = "consolidatedww_Services_Execute" },
            new() { Module = "HICONE", Name = "Consultar Carrete", Code = "consultarcarrete_Execute" },
            new() { Module = "HICONE", Name = "Consultar Extrusiones Query", Code = "consultarextrusionesquery_Execute" },
            new() { Module = "HICONE", Name = "Count Carretes Services", Code = "countcarretes_Services_Execute" },
            new() { Module = "HICONE", Name = "Crear Extrusion Services", Code = "crearextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "Crear Interrupcion Services", Code = "crearinterrupcion_Services_Execute" },
            new() { Module = "HICONE", Name = "Crear Orden Etiquetado Services", Code = "crearordenetiquetado_Services_Execute" },
            new() { Module = "HICONE", Name = "Crear Prensado Services", Code = "crearprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "Crear Prensado Bobina Services", Code = "crearprensadobobina_Services_Execute" },
            new() { Module = "HICONE", Name = "Clientes Delete", Code = "customer_Delete" },
            new() { Module = "HICONE", Name = "Clientes", Code = "customer_Execute" },
            new() { Module = "HICONE", Name = "Clientes FullControl", Code = "customer_FullControl" },
            new() { Module = "HICONE", Name = "Clientes Insert", Code = "customer_Insert" },
            new() { Module = "HICONE", Name = "Clientes Update", Code = "customer_Update" },
            new() { Module = "HICONE", Name = "Select Customer", Code = "customerprompt_Execute" },
            new() { Module = "HICONE", Name = "Customer View", Code = "customerview_Execute" },
            new() { Module = "HICONE", Name = "Clientes WW", Code = "customerww_Execute" },
            new() { Module = "HICONE", Name = "Customer WWGet Filter Services", Code = "customerww_Services_Execute" },
            new() { Module = "HICONE", Name = "Directions Service Request Services", Code = "directionsservicerequest_Services_Execute" },
            new() { Module = "HICONE", Name = "Document Delete", Code = "document_Delete" },
            new() { Module = "HICONE", Name = "Document", Code = "document_Execute" },
            new() { Module = "HICONE", Name = "Document FullControl", Code = "document_FullControl" },
            new() { Module = "HICONE", Name = "Document Insert", Code = "document_Insert" },
            new() { Module = "HICONE", Name = "Document Update", Code = "document_Update" },
            new() { Module = "HICONE", Name = "Documento Delete", Code = "documento_Delete" },
            new() { Module = "HICONE", Name = "Documento", Code = "documento_Execute" },
            new() { Module = "HICONE", Name = "Documento FullControl", Code = "documento_FullControl" },
            new() { Module = "HICONE", Name = "Documento Insert", Code = "documento_Insert" },
            new() { Module = "HICONE", Name = "Documento Update", Code = "documento_Update" },
            new() { Module = "HICONE", Name = "Down Time Code Delete", Code = "downtimecode_Delete" },
            new() { Module = "HICONE", Name = "Down Time Code", Code = "downtimecode_Execute" },
            new() { Module = "HICONE", Name = "Down Time Code FullControl", Code = "downtimecode_FullControl" },
            new() { Module = "HICONE", Name = "Down Time Code Insert", Code = "downtimecode_Insert" },
            new() { Module = "HICONE", Name = "Down Time Code Update", Code = "downtimecode_Update" },
            new() { Module = "HICONE", Name = "Select Down Time Code", Code = "downtimecodeprompt_Execute" },
            new() { Module = "HICONE", Name = "Down Time Code View", Code = "downtimecodeview_Execute" },
            new() { Module = "HICONE", Name = "Down Time Code WW", Code = "downtimecodeww_Execute" },
            new() { Module = "HICONE", Name = "Down Time Code WWGet Filter Services", Code = "downtimecodeww_Services_Execute" },
            new() { Module = "HICONE", Name = "DPBobina Por Extrusion", Code = "dpbobinaporextrusion_Execute" },
            new() { Module = "HICONE", Name = "DPCarrete Carrera", Code = "dpcarretecarrera_Execute" },
            new() { Module = "HICONE", Name = "DPCarrete Info", Code = "dpcarreteinfo_Execute" },
            new() { Module = "HICONE", Name = "DP Dynamic Combo Box Opeardor", Code = "dpcbopeardor_Execute" },
            new() { Module = "HICONE", Name = "DP Dynamic Combo Box Producto", Code = "dpcproducto_Execute" },
            new() { Module = "HICONE", Name = "DP Dynamic Combo Box Producto Base", Code = "dpcproductobase_Execute" },
            new() { Module = "HICONE", Name = "DPDown Time Code", Code = "dpdowntimecode_Execute" },
            new() { Module = "HICONE", Name = "DPExtrusion Resultado", Code = "dpextrusionresultado_Execute" },
            new() { Module = "HICONE", Name = "DPExtrusora Turno", Code = "dpextrusoraturno_Execute" },
            new() { Module = "HICONE", Name = "DPInterrupciones Por Extrusion", Code = "dpinterrupcionesporextrusion_Execute" },
            new() { Module = "HICONE", Name = "DPPrensado Bobina SDT", Code = "dpprensadobobinasdt_Execute" },
            new() { Module = "HICONE", Name = "DPPrensado Resultado", Code = "dpprensadoresultado_Execute" },
            new() { Module = "HICONE", Name = "DPProducto Terminado", Code = "dpproductoterminado_Execute" },
            new() { Module = "HICONE", Name = "DPSDTPrensado Bobina", Code = "dpsdtprensadobobina_Execute" },
            new() { Module = "HICONE", Name = "DPSDTProducto Por Troquel", Code = "dpsdtproductoportroquel_Execute" },
            new() { Module = "HICONE", Name = "DPSDTRpt Extrusion", Code = "dpsdtrptextrusion_Execute" },
            new() { Module = "HICONE", Name = "DPSDTRpt Prensado", Code = "dpsdtrptprensado_Execute" },
            new() { Module = "HICONE", Name = "DPSDTTrazabilidad", Code = "dpsdttrazabilidad_Execute" },
            new() { Module = "HICONE", Name = "Dynamic Form Sample", Code = "dynamicformsample_Execute" },
            new() { Module = "HICONE", Name = "Editar Reclamo Detalle", Code = "editarreclamodetalle_Execute" },
            new() { Module = "HICONE", Name = "Edit Budget", Code = "editbudget_Execute" },
            new() { Module = "HICONE", Name = "Embarque Delete", Code = "embarque_Delete" },
            new() { Module = "HICONE", Name = "Embarque", Code = "embarque_Execute" },
            new() { Module = "HICONE", Name = "Embarque FullControl", Code = "embarque_FullControl" },
            new() { Module = "HICONE", Name = "Embarque Insert", Code = "embarque_Insert" },
            new() { Module = "HICONE", Name = "Embarque Update", Code = "embarque_Update" },
            new() { Module = "HICONE", Name = "Embarque Detalle Delete", Code = "embarquedetalle_Delete" },
            new() { Module = "HICONE", Name = "Embarque Detalle", Code = "embarquedetalle_Execute" },
            new() { Module = "HICONE", Name = "Embarque Detalle FullControl", Code = "embarquedetalle_FullControl" },
            new() { Module = "HICONE", Name = "Embarque Detalle Insert", Code = "embarquedetalle_Insert" },
            new() { Module = "HICONE", Name = "Embarque Detalle Update", Code = "embarquedetalle_Update" },
            new() { Module = "HICONE", Name = "Embarque Detalle DP", Code = "embarquedetalledp_Execute" },
            new() { Module = "HICONE", Name = "Select Detalle", Code = "embarquedetalleprompt_Execute" },
            new() { Module = "HICONE", Name = "Embarque Detalle View", Code = "embarquedetalleview_Execute" },
            new() { Module = "HICONE", Name = "Formatos de Embarques", Code = "embarqueformato_Execute" },
            new() { Module = "HICONE", Name = "Embarque Pallet Delete", Code = "embarquepallet_Delete" },
            new() { Module = "HICONE", Name = "Embarque Pallet", Code = "embarquepallet_Execute" },
            new() { Module = "HICONE", Name = "Embarque Pallet FullControl", Code = "embarquepallet_FullControl" },
            new() { Module = "HICONE", Name = "Embarque Pallet Insert", Code = "embarquepallet_Insert" },
            new() { Module = "HICONE", Name = "Embarque Pallet Update", Code = "embarquepallet_Update" },
            new() { Module = "HICONE", Name = "Select Embarque Pallet", Code = "embarquepalletprompt_Execute" },
            new() { Module = "HICONE", Name = "Embarque Pallet View", Code = "embarquepalletview_Execute" },
            new() { Module = "HICONE", Name = "Embarque Pallet WW", Code = "embarquepalletww_Execute" },
            new() { Module = "HICONE", Name = "Embarque Pallet WWGet Filter Services", Code = "embarquepalletww_Services_Execute" },
            new() { Module = "HICONE", Name = "Select Embarque", Code = "embarqueprompt_Execute" },
            new() { Module = "HICONE", Name = "Embarque Reporte", Code = "embarquereporte_Execute" },
            new() { Module = "HICONE", Name = "Embarque View", Code = "embarqueview_Execute" },
            new() { Module = "HICONE", Name = "Embarque WP", Code = "embarquewp_Execute" },
            new() { Module = "HICONE", Name = "Embarque WW", Code = "embarqueww_Execute" },
            new() { Module = "HICONE", Name = "Embarque WWGet Filter Services", Code = "embarqueww_Services_Execute" },
            new() { Module = "HICONE", Name = "Escaneo Palet Externo Services", Code = "escaneopaletexterno_Services_Execute" },
            new() { Module = "HICONE", Name = "Es Carrete En Pallet Services", Code = "escarreteenpallet_Services_Execute" },
            new() { Module = "HICONE", Name = "Etiquetado Formato", Code = "etiquetadoformato_Execute" },
            new() { Module = "HICONE", Name = "Etiquetado Operador Delete", Code = "etiquetadooperador_Delete" },
            new() { Module = "HICONE", Name = "Etiquetado Operador", Code = "etiquetadooperador_Execute" },
            new() { Module = "HICONE", Name = "Etiquetado Operador FullControl", Code = "etiquetadooperador_FullControl" },
            new() { Module = "HICONE", Name = "Etiquetado Operador Insert", Code = "etiquetadooperador_Insert" },
            new() { Module = "HICONE", Name = "Etiquetado Operador Update", Code = "etiquetadooperador_Update" },
            new() { Module = "HICONE", Name = "Select Etiquetado Operador", Code = "etiquetadooperadorprompt_Execute" },
            new() { Module = "HICONE", Name = "Etiquetado Operador View", Code = "etiquetadooperadorview_Execute" },
            new() { Module = "HICONE", Name = "Etiquetado Operador WW", Code = "etiquetadooperadorww_Execute" },
            new() { Module = "HICONE", Name = "Etiquetado Operador WWGet Filter Services", Code = "etiquetadooperadorww_Services_Execute" },
            new() { Module = "HICONE", Name = "Exclusion Del Dia", Code = "exclusiondeldia_Execute" },
            new() { Module = "HICONE", Name = "Existencia Delete", Code = "existencia_Delete" },
            new() { Module = "HICONE", Name = "Existencia", Code = "existencia_Execute" },
            new() { Module = "HICONE", Name = "Existencia FullControl", Code = "existencia_FullControl" },
            new() { Module = "HICONE", Name = "Existencia Insert", Code = "existencia_Insert" },
            new() { Module = "HICONE", Name = "Existencia Update", Code = "existencia_Update" },
            new() { Module = "HICONE", Name = "Existencia Producto Delete", Code = "existenciaproducto_Delete" },
            new() { Module = "HICONE", Name = "Existencia Producto", Code = "existenciaproducto_Execute" },
            new() { Module = "HICONE", Name = "Existencia Producto FullControl", Code = "existenciaproducto_FullControl" },
            new() { Module = "HICONE", Name = "Existencia Producto Insert", Code = "existenciaproducto_Insert" },
            new() { Module = "HICONE", Name = "Existencia Producto Update", Code = "existenciaproducto_Update" },
            new() { Module = "HICONE", Name = "Select Existencia", Code = "existenciaprompt_Execute" },
            new() { Module = "HICONE", Name = "Existencia Silo Delete", Code = "existenciasilo_Delete" },
            new() { Module = "HICONE", Name = "Existencia Silo", Code = "existenciasilo_Execute" },
            new() { Module = "HICONE", Name = "Existencia Silo FullControl", Code = "existenciasilo_FullControl" },
            new() { Module = "HICONE", Name = "Existencia Silo Insert", Code = "existenciasilo_Insert" },
            new() { Module = "HICONE", Name = "Existencia Silo Update", Code = "existenciasilo_Update" },
            new() { Module = "HICONE", Name = "Existencia View", Code = "existenciaview_Execute" },
            new() { Module = "HICONE", Name = "Existencia WW", Code = "existenciaww_Execute" },
            new() { Module = "HICONE", Name = "Existencia WWGet Filter Services", Code = "existenciaww_Services_Execute" },
            new() { Module = "HICONE", Name = "Exportar Permisos Por Rol", Code = "exportarpermisosporrol_Execute" },
            new() { Module = "HICONE", Name = "WWP Export Options Description", Code = "exportoptions_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Delete", Code = "extrusion_Delete" },
            new() { Module = "HICONE", Name = "Extrusion", Code = "extrusion_Execute" },
            new() { Module = "HICONE", Name = "Extrusion FullControl", Code = "extrusion_FullControl" },
            new() { Module = "HICONE", Name = "Extrusion Insert", Code = "extrusion_Insert" },
            new() { Module = "HICONE", Name = "Extrusion Update", Code = "extrusion_Update" },
            new() { Module = "HICONE", Name = "Produccion de Bobinas", Code = "extrusiondeldiabobinas_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Del Dia DP", Code = "extrusiondeldiadp_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Del Dia DP Services", Code = "extrusiondeldiadp_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusion DP", Code = "extrusiondp_Execute" },
            new() { Module = "HICONE", Name = "Extrusion DP Services", Code = "extrusiondp_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusiones En Operacion", Code = "extrusionesenoperacion_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Interrupcion Delete", Code = "extrusioninterrupcion_Delete" },
            new() { Module = "HICONE", Name = "Extrusion Interrupcion", Code = "extrusioninterrupcion_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Interrupcion FullControl", Code = "extrusioninterrupcion_FullControl" },
            new() { Module = "HICONE", Name = "Extrusion Interrupcion Insert", Code = "extrusioninterrupcion_Insert" },
            new() { Module = "HICONE", Name = "Extrusion Interrupcion Update", Code = "extrusioninterrupcion_Update" },
            new() { Module = "HICONE", Name = "Select Extrusion Interrupcion", Code = "extrusioninterrupcionprompt_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Interrupcion View", Code = "extrusioninterrupcionview_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Interrupcion WW", Code = "extrusioninterrupcionww_Execute" },
            new() { Module = "HICONE", Name = "Select Extrusion", Code = "extrusionprompt_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Resultado Delete", Code = "extrusionresultado_Delete" },
            new() { Module = "HICONE", Name = "Extrusion Resultado", Code = "extrusionresultado_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Resultado FullControl", Code = "extrusionresultado_FullControl" },
            new() { Module = "HICONE", Name = "Extrusion Resultado Insert", Code = "extrusionresultado_Insert" },
            new() { Module = "HICONE", Name = "Extrusion Resultado Update", Code = "extrusionresultado_Update" },
            new() { Module = "HICONE", Name = "Extrusion Terminada DP", Code = "extrusionterminadadp_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Terminada DP Services", Code = "extrusionterminadadp_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusion View", Code = "extrusionview_Execute" },
            new() { Module = "HICONE", Name = "Extrusion WW", Code = "extrusionww_Execute" },
            new() { Module = "HICONE", Name = "Extrusion WWGet Filter Services", Code = "extrusionww_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Delete", Code = "extrusora_Delete" },
            new() { Module = "HICONE", Name = "Extrusora", Code = "extrusora_Execute" },
            new() { Module = "HICONE", Name = "Extrusora FullControl", Code = "extrusora_FullControl" },
            new() { Module = "HICONE", Name = "Extrusora Insert", Code = "extrusora_Insert" },
            new() { Module = "HICONE", Name = "Extrusora Update", Code = "extrusora_Update" },
            new() { Module = "HICONE", Name = "Extrusora Bobina Delete", Code = "extrusorabobina_Delete" },
            new() { Module = "HICONE", Name = "Extrusora Bobina", Code = "extrusorabobina_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Bobina FullControl", Code = "extrusorabobina_FullControl" },
            new() { Module = "HICONE", Name = "Extrusora Bobina Insert", Code = "extrusorabobina_Insert" },
            new() { Module = "HICONE", Name = "Extrusora Bobina Update", Code = "extrusorabobina_Update" },
            new() { Module = "HICONE", Name = "Extrusora Detenida", Code = "extrusoradetenida_Execute" },
            new() { Module = "HICONE", Name = "Extrusora DP", Code = "extrusoradp_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora Delete", Code = "extrusoramezcladora_Delete" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora", Code = "extrusoramezcladora_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora FullControl", Code = "extrusoramezcladora_FullControl" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora Insert", Code = "extrusoramezcladora_Insert" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora Update", Code = "extrusoramezcladora_Update" },
            new() { Module = "HICONE", Name = "Select Extrusora Mezcladora", Code = "extrusoramezcladoraprompt_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora View", Code = "extrusoramezcladoraview_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora WW", Code = "extrusoramezcladoraww_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora WWGet Filter Services", Code = "extrusoramezcladoraww_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Observacion Delete", Code = "extrusoraobservacion_Delete" },
            new() { Module = "HICONE", Name = "Extrusora Observacion", Code = "extrusoraobservacion_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Observacion FullControl", Code = "extrusoraobservacion_FullControl" },
            new() { Module = "HICONE", Name = "Extrusora Observacion Insert", Code = "extrusoraobservacion_Insert" },
            new() { Module = "HICONE", Name = "Extrusora Observacion Update", Code = "extrusoraobservacion_Update" },
            new() { Module = "HICONE", Name = "Select Causa Interrupcion", Code = "extrusoraobservacioncausainterrupcionprompt_Execute" },
            new() { Module = "HICONE", Name = "Select Extrusora Observacion", Code = "extrusoraobservacionprompt_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Observacion View", Code = "extrusoraobservacionview_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Observacion WW", Code = "extrusoraobservacionww_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Observacion WWGet Filter Services", Code = "extrusoraobservacionww_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Producto Delete", Code = "extrusoraproducto_Delete" },
            new() { Module = "HICONE", Name = "Extrusora Producto", Code = "extrusoraproducto_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Producto FullControl", Code = "extrusoraproducto_FullControl" },
            new() { Module = "HICONE", Name = "Extrusora Producto Insert", Code = "extrusoraproducto_Insert" },
            new() { Module = "HICONE", Name = "Extrusora Producto Update", Code = "extrusoraproducto_Update" },
            new() { Module = "HICONE", Name = "Extrusoras", Code = "extrusoras_Execute" },
            new() { Module = "HICONE", Name = "Extrusoras En Operacion", Code = "extrusorasenoperacion_Execute" },
            new() { Module = "HICONE", Name = "Extrusoras En Operacion Services", Code = "extrusorasenoperacion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDFinalizar Extrusion Services", Code = "finalizarextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDFinalizar Prensado Services", Code = "finalizarprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "FTB Delete", Code = "ftb_Delete" },
            new() { Module = "HICONE", Name = "FTB", Code = "ftb_Execute" },
            new() { Module = "HICONE", Name = "FTB FullControl", Code = "ftb_FullControl" },
            new() { Module = "HICONE", Name = "FTB Insert", Code = "ftb_Insert" },
            new() { Module = "HICONE", Name = "FTB Update", Code = "ftb_Update" },
            new() { Module = "HICONE", Name = "Select FTB", Code = "ftbprompt_Execute" },
            new() { Module = "HICONE", Name = "FTBView", Code = "ftbview_Execute" },
            new() { Module = "HICONE", Name = "FTB WW", Code = "ftbww_Execute" },
            new() { Module = "HICONE", Name = "FTBWGet Filter Services", Code = "ftbww_Services_Execute" },
            new() { Module = "HICONE", Name = "FTBYTD", Code = "ftbytd_Execute" },
            new() { Module = "HICONE", Name = "Generar Bobina No Services", Code = "generarbobinano_Services_Execute" },
            new() { Module = "HICONE", Name = "Gestionar Extrusora", Code = "gestionarextrusora_Execute" },
            new() { Module = "HICONE", Name = "gestionar Extrusora Mezcladora", Code = "gestionarextrusoramezcladora_Execute" },
            new() { Module = "HICONE", Name = "Gestionar Extrusora Producto", Code = "gestionarextrusoraproducto_Execute" },
            new() { Module = "HICONE", Name = "Gestionar Inventario", Code = "gestionarinventario_Execute" },
            new() { Module = "HICONE", Name = "Gestionar Lote", Code = "gestionarlote_Execute" },
            new() { Module = "HICONE", Name = "gestionar Operador", Code = "gestionaroperador_Execute" },
            new() { Module = "HICONE", Name = "Gestionar Prensa", Code = "gestionarprensa_Execute" },
            new() { Module = "HICONE", Name = "Gestionar Prensa Producto", Code = "gestionarprensaproducto_Execute" },
            new() { Module = "HICONE", Name = "gestionar Producto", Code = "gestionarproducto_Execute" },
            new() { Module = "HICONE", Name = "gestionar Producto Categoria", Code = "gestionarproductocategoria_Execute" },
            new() { Module = "HICONE", Name = "gestionar Producto Terminado", Code = "gestionarproductoterminado_Execute" },
            new() { Module = "HICONE", Name = "Gestionar Silo", Code = "gestionarsilo_Execute" },
            new() { Module = "HICONE", Name = "gestionar Troquel", Code = "gestionartroquel_Execute" },
            new() { Module = "HICONE", Name = "Gestionar Turno", Code = "gestionarturno_Execute" },
            new() { Module = "HICONE", Name = "Get Home Modules Sample", Code = "gethomemodulessample_Execute" },
            new() { Module = "HICONE", Name = "Get Home Sample Data", Code = "gethomesampledata_Execute" },
            new() { Module = "HICONE", Name = "Get Home Sample Data Service", Code = "gethomesampledataservice_Execute" },
            new() { Module = "HICONE", Name = "Get Home Sample Data Service Services", Code = "gethomesampledataservice_Services_Execute" },
            new() { Module = "HICONE", Name = "Get Home Sample Name Value Data", Code = "gethomesamplenamevaluedata_Execute" },
            new() { Module = "HICONE", Name = "Get Home Sample Name Value Data Services", Code = "gethomesamplenamevaluedata_Services_Execute" },
            new() { Module = "HICONE", Name = "Get Main Home Modules Sample", Code = "getmainhomemodulessample_Execute" },
            new() { Module = "HICONE", Name = "Get Some Home Modules Sample", Code = "getsomehomemodulessample_Execute" },
            new() { Module = "HICONE", Name = "Guardar Extrusion Services", Code = "guardarextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "Guardar Extrusion Resultado Services", Code = "guardarextrusionresultado_Services_Execute" },
            new() { Module = "HICONE", Name = "Guardar Orden Etiquetado Services", Code = "guardarordenetiquetado_Services_Execute" },
            new() { Module = "HICONE", Name = "Guardar Prensado Services", Code = "guardarprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "Guardar Prensado Resultado Services", Code = "guardarprensadoresultado_Services_Execute" },
            new() { Module = "HICONE", Name = "Gx After Event Replicator Services", Code = "gxaftereventreplicator_Services_Execute" },
            new() { Module = "HICONE", Name = "Gx Before Event Replicator Services", Code = "gxbeforeeventreplicator_Services_Execute" },
            new() { Module = "HICONE", Name = "Gx On Pending Event Failed Services", Code = "gxonpendingeventfailed_Services_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDCambio Troquel", Code = "hicone_sdcambiotroquel_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDCarrete Molino", Code = "hicone_sdcarretemolino_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDCierre Orden Etiquetado", Code = "hicone_sdcierreordenetiquetado_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDCorregir Pallet", Code = "hicone_sdcorregirpallet_Execute" },
            new() { Module = "HICONE", Name = "Etiquetado Pallet", Code = "hicone_sdetiquetadopallet_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDEtiquetar Carrete", Code = "hicone_sdetiquetarcarrete_Execute" },
            new() { Module = "HICONE", Name = "Cierre Productivo", Code = "hicone_sdextrusioncierreproductivo_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDExtrusion Intermedia", Code = "hicone_sdextrusionintermedia_Execute" },
            new() { Module = "HICONE", Name = "Reporte de Extrusion", Code = "hicone_sdextrusionreporte_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDFinalizar Bobina", Code = "hicone_sdfinalizarbobina_Execute" }

        };

        foreach (var p in permissions)
        {
            if (!await _context.Permissions.AnyAsync(existing => existing.Code == p.Code))
            {
                _context.Permissions.Add(p);
            }
        }

        await _context.SaveChangesAsync(default);

        // Roles
        if (!await _context.Roles.AnyAsync(r => r.Name == "SuperAdmin"))
        {
            var superAdminRole = new Role
            {
                Name = "SuperAdmin",
                Description = "Full system access",
                IsSystem = true
            };
            
            _context.Roles.Add(superAdminRole);
            await _context.SaveChangesAsync(default);

            var allPermissions = await _context.Permissions.ToListAsync();
            foreach (var p in allPermissions)
            {
                _context.RolePermissions.Add(new RolePermission { RoleId = superAdminRole.Id, PermissionId = p.Id });
            }
        }

        // Default Legacy Roles
        var defaultRoles = new[] { "Unknown", "Administrator", "Operador", "Supervisor", "Mantenimiento" };
        foreach (var roleName in defaultRoles)
        {
            if (!await _context.Roles.AnyAsync(r => r.Name == roleName))
            {
                _context.Roles.Add(new Role
                {
                    Name = roleName,
                    Description = $"Legacy System Role: {roleName}",
                    IsSystem = true
                });
            }
        }

        await _context.SaveChangesAsync(default);

        // Admin User
        var adminEmail = "admin@hicone.com";
        if (!await _context.Users.AnyAsync(u => u.Email == adminEmail))
        {
            var superAdminRole = await _context.Roles.FirstAsync(r => r.Name == "SuperAdmin");
            
            var adminUser = new User
            {
                Username = "admin",
                Email = adminEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("hicone123"), 
                FirstName = "Admin",
                LastName = "HiCone",
                TenantId = defaultTenantId,
                OperadorId = 1,
                MustChangePassword = false,
                EmailConfirmed = true
            };

            _context.Users.Add(adminUser);
            await _context.SaveChangesAsync(default);

            _context.UserRoles.Add(new UserRole { UserId = adminUser.Id, RoleId = superAdminRole.Id });
            _context.UserTenants.Add(new UserTenant { UserId = adminUser.Id, TenantId = defaultTenantId, IsDefault = true });
        }

        await _context.SaveChangesAsync(default);

        // Articulos
        if (!await _context.Articulos.AnyAsync())
        {
            var categoria = new Categoria { Nombre = "Electrónica", TenantId = defaultTenantId };
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync(default);

            _context.Articulos.AddRange(
                new Articulo { Codigo = "ART-001", Nombre = "Laptop Gaming X", Precio = 25000, Existencia = 15, CategoriaId = categoria.Id, TenantId = defaultTenantId },
                new Articulo { Codigo = "ART-002", Nombre = "Monitor 4K 27\"", Precio = 8500, Existencia = 8, CategoriaId = categoria.Id, TenantId = defaultTenantId },
                new Articulo { Codigo = "ART-003", Nombre = "Teclado Mecánico RGB", Precio = 1200, Existencia = 25, CategoriaId = categoria.Id, TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        // Produccion
        if (!await _context.Palets.AnyAsync())
        {
            var palet = new Palet 
            { 
                Codigo = "PAL-2024-001", 
                Tipo = "Estándar 1.2m", 
                HoraInicioEnsamble = DateTime.UtcNow.AddHours(-2),
                Estado = "En Proceso",
                TenantId = defaultTenantId 
            };
            _context.Palets.Add(palet);
            await _context.SaveChangesAsync(default);

            _context.Bobinas.AddRange(
                new Bobina { Codigo = "BOB-A101", PesoNeto = 45.5m, Metros = 1200, FechaProduccion = DateTime.UtcNow.AddMinutes(-45), Turno = "Matutino", PaletId = palet.Id, TenantId = defaultTenantId },
                new Bobina { Codigo = "BOB-A102", PesoNeto = 46.2m, Metros = 1210, FechaProduccion = DateTime.UtcNow.AddMinutes(-10), Turno = "Matutino", PaletId = palet.Id, TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }
    }
}
