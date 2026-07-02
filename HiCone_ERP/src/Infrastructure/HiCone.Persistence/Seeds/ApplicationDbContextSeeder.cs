using HiCone.Domain.Entities.Identity;
using HiCone.Domain.Entities.Inventario;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.Tenant;
using HiCone.Domain.Enums;
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
            // await _context.Database.EnsureDeletedAsync();
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

        
        // Applications
        var appGam = new SecurityApplication { Name = "GAM Backoffice", Description = "Administración de Seguridad" };
        var appHicone = new SecurityApplication { Name = "HICONE", Description = "Módulo Operativo HiCone" };
        var appReportes = new SecurityApplication { Name = "ReportesHICONE", Description = "Módulo de Reportes" };
        var appKbs = new SecurityApplication { Name = "KBS2022_HiCone2022", Description = "Módulo HiCone 2022" };

        var applications = new List<SecurityApplication> { appGam, appHicone, appReportes, appKbs };

        foreach (var app in applications)
        {
            if (!await _context.SecurityApplications.AnyAsync(a => a.Name == app.Name))
            {
                _context.SecurityApplications.Add(app);
            }
            else
            {
                var existingApp = await _context.SecurityApplications.FirstAsync(a => a.Name == app.Name);
                if (app.Name == "GAM Backoffice") appGam = existingApp;
                if (app.Name == "HICONE") appHicone = existingApp;
                if (app.Name == "ReportesHICONE") appReportes = existingApp;
                if (app.Name == "KBS2022_HiCone2022") appKbs = existingApp;
            }
        }
        await _context.SaveChangesAsync();

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
            new() { Module = "GAM Backoffice", Name = "Change current Repository", Code = "gam_changerepository_Execute" },
            new() { Module = "GAM Backoffice", Name = "Dashboard", Code = "gam_dashboard_Execute" },
            new() { Module = "GAM Backoffice", Name = "GAM configuration settings", Code = "gam_gamconfiguration_Execute" },
            new() { Module = "GAM Backoffice", Name = "General settings", Code = "gam_gamgeneral_Execute" },
            new() { Module = "GAM Backoffice", Name = "Work with Applications", Code = "gam_wwapplications_Execute" },
            new() { Module = "GAM Backoffice", Name = "Work with Authentication Types", Code = "gam_wwauthtypes_Execute" },
            new() { Module = "GAM Backoffice", Name = "Work with Connections", Code = "gam_wwconnections_Execute" },
            new() { Module = "GAM Backoffice", Name = "Work with Event Subscriptions", Code = "gam_wweventsubscriptions_Execute" },
            new() { Module = "GAM Backoffice", Name = "Work with Repositories", Code = "gam_wwrepositories_Execute" },
            new() { Module = "GAM Backoffice", Name = "Work with Roles", Code = "gam_wwroles_Execute" },
            new() { Module = "GAM Backoffice", Name = "Work with Security Policy", Code = "gam_wwsecuritypolicies_Execute" },
            new() { Module = "GAM Backoffice", Name = "Work with Sessions", Code = "gam_wwsessions_Execute" },
            new() { Module = "GAM Backoffice", Name = "Work with Users", Code = "gam_wwusers_Execute" },

            // HICONE
            new() { Module = "HICONE", Name = "Change My Password", Code = "gamchangeyourpassword_Execute" },
            new() { Module = "ReportesHICONE", Name = "Home", Code = "gamhome_Execute" },
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
            new() { Module = "ReportesHICONE", Name = "Bobina Delete", Code = "bobina_Delete" },
            new() { Module = "ReportesHICONE", Name = "Bobina", Code = "bobina_Execute" },
            new() { Module = "ReportesHICONE", Name = "Bobina FullControl", Code = "bobina_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Bobina Insert", Code = "bobina_Insert" },
            new() { Module = "ReportesHICONE", Name = "Bobina Update", Code = "bobina_Update" },
            new() { Module = "ReportesHICONE", Name = "Address Display Map", Code = "addressdisplay_Execute" },
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
            new() { Module = "ReportesHICONE", Name = "Budget Delete", Code = "budget_Delete" },
            new() { Module = "ReportesHICONE", Name = "Budget", Code = "budget_Execute" },
            new() { Module = "ReportesHICONE", Name = "Budget FullControl", Code = "budget_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Budget Insert", Code = "budget_Insert" },
            new() { Module = "ReportesHICONE", Name = "Budget Update", Code = "budget_Update" },
            new() { Module = "HICONE", Name = "Select Budget", Code = "budgetprompt_Execute" },
            new() { Module = "HICONE", Name = "Budget View", Code = "budgetview_Execute" },
            new() { Module = "HICONE", Name = "Budget WW", Code = "budgetww_Execute" },
            new() { Module = "HICONE", Name = "Budget WWGet Filter Services", Code = "budgetww_Services_Execute" },
            new() { Module = "HICONE", Name = "Cargar Embarque", Code = "cargarembarque_Execute" },
            new() { Module = "ReportesHICONE", Name = "Carrera Delete", Code = "carrera_Delete" },
            new() { Module = "ReportesHICONE", Name = "Carrera", Code = "carrera_Execute" },
            new() { Module = "ReportesHICONE", Name = "Carrera FullControl", Code = "carrera_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Carrera Insert", Code = "carrera_Insert" },
            new() { Module = "ReportesHICONE", Name = "Carrera Update", Code = "carrera_Update" },
            new() { Module = "HICONE", Name = "Carrera DP", Code = "carreradp_Execute" },
            new() { Module = "HICONE", Name = "Carrera DP Services", Code = "carreradp_Services_Execute" },
            new() { Module = "HICONE", Name = "Select Carrera", Code = "carreraprompt_Execute" },
            new() { Module = "HICONE", Name = "Carreras Terminadas Services", Code = "carrerasterminadas_Services_Execute" },
            new() { Module = "HICONE", Name = "Carrera View", Code = "carreraview_Execute" },
            new() { Module = "HICONE", Name = "Carrera WW", Code = "carreraww_Execute" },
            new() { Module = "HICONE", Name = "Carrera WWGet Filter Services", Code = "carreraww_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Carrete Delete", Code = "carrete_Delete" },
            new() { Module = "ReportesHICONE", Name = "Carrete", Code = "carrete_Execute" },
            new() { Module = "ReportesHICONE", Name = "Carrete FullControl", Code = "carrete_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Carrete Insert", Code = "carrete_Insert" },
            new() { Module = "ReportesHICONE", Name = "Carrete Update", Code = "carrete_Update" },
            new() { Module = "ReportesHICONE", Name = "Carrete Defecto Delete", Code = "carretedefecto_Delete" },
            new() { Module = "ReportesHICONE", Name = "Carrete Defecto", Code = "carretedefecto_Execute" },
            new() { Module = "ReportesHICONE", Name = "Carrete Defecto FullControl", Code = "carretedefecto_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Carrete Defecto Insert", Code = "carretedefecto_Insert" },
            new() { Module = "ReportesHICONE", Name = "Carrete Defecto Update", Code = "carretedefecto_Update" },
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
            new() { Module = "ReportesHICONE", Name = "Causa Interrupcion Delete", Code = "causainterrupcion_Delete" },
            new() { Module = "ReportesHICONE", Name = "Causa Interrupcion", Code = "causainterrupcion_Execute" },
            new() { Module = "ReportesHICONE", Name = "Causa Interrupcion FullControl", Code = "causainterrupcion_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Causa Interrupcion Insert", Code = "causainterrupcion_Insert" },
            new() { Module = "ReportesHICONE", Name = "Causa Interrupcion Update", Code = "causainterrupcion_Update" },
            new() { Module = "HICONE", Name = "Select Causa Interrupcion", Code = "causainterrupcionprompt_Execute" },
            new() { Module = "HICONE", Name = "Causa Interrupcion View", Code = "causainterrupcionview_Execute" },
            new() { Module = "HICONE", Name = "Causa Interrupcion WW", Code = "causainterrupcionww_Execute" },
            new() { Module = "HICONE", Name = "Causa Interrupcion WWGet Filter Services", Code = "causainterrupcionww_Services_Execute" },
            new() { Module = "HICONE", Name = "Causa Prensa DP", Code = "causaprensadp_Execute" },
            new() { Module = "ReportesHICONE", Name = "Company Delete", Code = "company_Delete" },
            new() { Module = "ReportesHICONE", Name = "Company", Code = "company_Execute" },
            new() { Module = "ReportesHICONE", Name = "Company FullControl", Code = "company_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Company Insert", Code = "company_Insert" },
            new() { Module = "ReportesHICONE", Name = "Company Update", Code = "company_Update" },
            new() { Module = "HICONE", Name = "Select Company", Code = "companyprompt_Execute" },
            new() { Module = "HICONE", Name = "Company View", Code = "companyview_Execute" },
            new() { Module = "HICONE", Name = "Company WW", Code = "companyww_Execute" },
            new() { Module = "HICONE", Name = "Company WWGet Filter Services", Code = "companyww_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Configuracion Delete", Code = "configuracion_Delete" },
            new() { Module = "ReportesHICONE", Name = "Configuracion", Code = "configuracion_Execute" },
            new() { Module = "ReportesHICONE", Name = "Configuracion FullControl", Code = "configuracion_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Configuracion Insert", Code = "configuracion_Insert" },
            new() { Module = "ReportesHICONE", Name = "Configuracion Update", Code = "configuracion_Update" },
            new() { Module = "ReportesHICONE", Name = "Consolidated Delete", Code = "consolidated_Delete" },
            new() { Module = "ReportesHICONE", Name = "Consolidated", Code = "consolidated_Execute" },
            new() { Module = "ReportesHICONE", Name = "Consolidated FullControl", Code = "consolidated_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Consolidated Insert", Code = "consolidated_Insert" },
            new() { Module = "ReportesHICONE", Name = "Consolidated Update", Code = "consolidated_Update" },
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
            new() { Module = "ReportesHICONE", Name = "Clientes Delete", Code = "customer_Delete" },
            new() { Module = "ReportesHICONE", Name = "Clientes", Code = "customer_Execute" },
            new() { Module = "ReportesHICONE", Name = "Clientes FullControl", Code = "customer_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Clientes Insert", Code = "customer_Insert" },
            new() { Module = "ReportesHICONE", Name = "Clientes Update", Code = "customer_Update" },
            new() { Module = "HICONE", Name = "Select Customer", Code = "customerprompt_Execute" },
            new() { Module = "HICONE", Name = "Customer View", Code = "customerview_Execute" },
            new() { Module = "HICONE", Name = "Clientes WW", Code = "customerww_Execute" },
            new() { Module = "HICONE", Name = "Customer WWGet Filter Services", Code = "customerww_Services_Execute" },
            new() { Module = "HICONE", Name = "Directions Service Request Services", Code = "directionsservicerequest_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Document Delete", Code = "document_Delete" },
            new() { Module = "ReportesHICONE", Name = "Document", Code = "document_Execute" },
            new() { Module = "ReportesHICONE", Name = "Document FullControl", Code = "document_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Document Insert", Code = "document_Insert" },
            new() { Module = "ReportesHICONE", Name = "Document Update", Code = "document_Update" },
            new() { Module = "ReportesHICONE", Name = "Documento Delete", Code = "documento_Delete" },
            new() { Module = "ReportesHICONE", Name = "Documento", Code = "documento_Execute" },
            new() { Module = "ReportesHICONE", Name = "Documento FullControl", Code = "documento_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Documento Insert", Code = "documento_Insert" },
            new() { Module = "ReportesHICONE", Name = "Documento Update", Code = "documento_Update" },
            new() { Module = "ReportesHICONE", Name = "Down Time Code Delete", Code = "downtimecode_Delete" },
            new() { Module = "ReportesHICONE", Name = "Down Time Code", Code = "downtimecode_Execute" },
            new() { Module = "ReportesHICONE", Name = "Down Time Code FullControl", Code = "downtimecode_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Down Time Code Insert", Code = "downtimecode_Insert" },
            new() { Module = "ReportesHICONE", Name = "Down Time Code Update", Code = "downtimecode_Update" },
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
            new() { Module = "ReportesHICONE", Name = "Embarque Delete", Code = "embarque_Delete" },
            new() { Module = "ReportesHICONE", Name = "Embarque", Code = "embarque_Execute" },
            new() { Module = "ReportesHICONE", Name = "Embarque FullControl", Code = "embarque_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Embarque Insert", Code = "embarque_Insert" },
            new() { Module = "ReportesHICONE", Name = "Embarque Update", Code = "embarque_Update" },
            new() { Module = "ReportesHICONE", Name = "Embarque Detalle Delete", Code = "embarquedetalle_Delete" },
            new() { Module = "ReportesHICONE", Name = "Embarque Detalle", Code = "embarquedetalle_Execute" },
            new() { Module = "ReportesHICONE", Name = "Embarque Detalle FullControl", Code = "embarquedetalle_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Embarque Detalle Insert", Code = "embarquedetalle_Insert" },
            new() { Module = "ReportesHICONE", Name = "Embarque Detalle Update", Code = "embarquedetalle_Update" },
            new() { Module = "HICONE", Name = "Embarque Detalle DP", Code = "embarquedetalledp_Execute" },
            new() { Module = "HICONE", Name = "Select Detalle", Code = "embarquedetalleprompt_Execute" },
            new() { Module = "HICONE", Name = "Embarque Detalle View", Code = "embarquedetalleview_Execute" },
            new() { Module = "HICONE", Name = "Formatos de Embarques", Code = "embarqueformato_Execute" },
            new() { Module = "ReportesHICONE", Name = "Embarque Pallet Delete", Code = "embarquepallet_Delete" },
            new() { Module = "ReportesHICONE", Name = "Embarque Pallet", Code = "embarquepallet_Execute" },
            new() { Module = "ReportesHICONE", Name = "Embarque Pallet FullControl", Code = "embarquepallet_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Embarque Pallet Insert", Code = "embarquepallet_Insert" },
            new() { Module = "ReportesHICONE", Name = "Embarque Pallet Update", Code = "embarquepallet_Update" },
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
            new() { Module = "ReportesHICONE", Name = "Etiquetado Operador Delete", Code = "etiquetadooperador_Delete" },
            new() { Module = "ReportesHICONE", Name = "Etiquetado Operador", Code = "etiquetadooperador_Execute" },
            new() { Module = "ReportesHICONE", Name = "Etiquetado Operador FullControl", Code = "etiquetadooperador_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Etiquetado Operador Insert", Code = "etiquetadooperador_Insert" },
            new() { Module = "ReportesHICONE", Name = "Etiquetado Operador Update", Code = "etiquetadooperador_Update" },
            new() { Module = "HICONE", Name = "Select Etiquetado Operador", Code = "etiquetadooperadorprompt_Execute" },
            new() { Module = "HICONE", Name = "Etiquetado Operador View", Code = "etiquetadooperadorview_Execute" },
            new() { Module = "HICONE", Name = "Etiquetado Operador WW", Code = "etiquetadooperadorww_Execute" },
            new() { Module = "HICONE", Name = "Etiquetado Operador WWGet Filter Services", Code = "etiquetadooperadorww_Services_Execute" },
            new() { Module = "HICONE", Name = "Exclusion Del Dia", Code = "exclusiondeldia_Execute" },
            new() { Module = "ReportesHICONE", Name = "Existencia Delete", Code = "existencia_Delete" },
            new() { Module = "ReportesHICONE", Name = "Existencia", Code = "existencia_Execute" },
            new() { Module = "ReportesHICONE", Name = "Existencia FullControl", Code = "existencia_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Existencia Insert", Code = "existencia_Insert" },
            new() { Module = "ReportesHICONE", Name = "Existencia Update", Code = "existencia_Update" },
            new() { Module = "ReportesHICONE", Name = "Existencia Producto Delete", Code = "existenciaproducto_Delete" },
            new() { Module = "ReportesHICONE", Name = "Existencia Producto", Code = "existenciaproducto_Execute" },
            new() { Module = "ReportesHICONE", Name = "Existencia Producto FullControl", Code = "existenciaproducto_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Existencia Producto Insert", Code = "existenciaproducto_Insert" },
            new() { Module = "ReportesHICONE", Name = "Existencia Producto Update", Code = "existenciaproducto_Update" },
            new() { Module = "HICONE", Name = "Select Existencia", Code = "existenciaprompt_Execute" },
            new() { Module = "ReportesHICONE", Name = "Existencia Silo Delete", Code = "existenciasilo_Delete" },
            new() { Module = "ReportesHICONE", Name = "Existencia Silo", Code = "existenciasilo_Execute" },
            new() { Module = "ReportesHICONE", Name = "Existencia Silo FullControl", Code = "existenciasilo_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Existencia Silo Insert", Code = "existenciasilo_Insert" },
            new() { Module = "ReportesHICONE", Name = "Existencia Silo Update", Code = "existenciasilo_Update" },
            new() { Module = "HICONE", Name = "Existencia View", Code = "existenciaview_Execute" },
            new() { Module = "HICONE", Name = "Existencia WW", Code = "existenciaww_Execute" },
            new() { Module = "HICONE", Name = "Existencia WWGet Filter Services", Code = "existenciaww_Services_Execute" },
            new() { Module = "HICONE", Name = "Exportar Permisos Por Rol", Code = "exportarpermisosporrol_Execute" },
            new() { Module = "ReportesHICONE", Name = "WWP Export Options Description", Code = "exportoptions_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Delete", Code = "extrusion_Delete" },
            new() { Module = "ReportesHICONE", Name = "Extrusion", Code = "extrusion_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusion FullControl", Code = "extrusion_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Insert", Code = "extrusion_Insert" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Update", Code = "extrusion_Update" },
            new() { Module = "HICONE", Name = "Produccion de Bobinas", Code = "extrusiondeldiabobinas_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Del Dia DP", Code = "extrusiondeldiadp_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Del Dia DP Services", Code = "extrusiondeldiadp_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusion DP", Code = "extrusiondp_Execute" },
            new() { Module = "HICONE", Name = "Extrusion DP Services", Code = "extrusiondp_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusiones En Operacion", Code = "extrusionesenoperacion_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Interrupcion Delete", Code = "extrusioninterrupcion_Delete" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Interrupcion", Code = "extrusioninterrupcion_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Interrupcion FullControl", Code = "extrusioninterrupcion_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Interrupcion Insert", Code = "extrusioninterrupcion_Insert" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Interrupcion Update", Code = "extrusioninterrupcion_Update" },
            new() { Module = "HICONE", Name = "Select Extrusion Interrupcion", Code = "extrusioninterrupcionprompt_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Interrupcion View", Code = "extrusioninterrupcionview_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Interrupcion WW", Code = "extrusioninterrupcionww_Execute" },
            new() { Module = "HICONE", Name = "Select Extrusion", Code = "extrusionprompt_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Resultado Delete", Code = "extrusionresultado_Delete" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Resultado", Code = "extrusionresultado_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Resultado FullControl", Code = "extrusionresultado_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Resultado Insert", Code = "extrusionresultado_Insert" },
            new() { Module = "ReportesHICONE", Name = "Extrusion Resultado Update", Code = "extrusionresultado_Update" },
            new() { Module = "HICONE", Name = "Extrusion Terminada DP", Code = "extrusionterminadadp_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Terminada DP Services", Code = "extrusionterminadadp_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusion View", Code = "extrusionview_Execute" },
            new() { Module = "HICONE", Name = "Extrusion WW", Code = "extrusionww_Execute" },
            new() { Module = "HICONE", Name = "Extrusion WWGet Filter Services", Code = "extrusionww_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Delete", Code = "extrusora_Delete" },
            new() { Module = "ReportesHICONE", Name = "Extrusora", Code = "extrusora_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusora FullControl", Code = "extrusora_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Insert", Code = "extrusora_Insert" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Update", Code = "extrusora_Update" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Bobina Delete", Code = "extrusorabobina_Delete" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Bobina", Code = "extrusorabobina_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Bobina FullControl", Code = "extrusorabobina_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Bobina Insert", Code = "extrusorabobina_Insert" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Bobina Update", Code = "extrusorabobina_Update" },
            new() { Module = "HICONE", Name = "Extrusora Detenida", Code = "extrusoradetenida_Execute" },
            new() { Module = "HICONE", Name = "Extrusora DP", Code = "extrusoradp_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Mezcladora Delete", Code = "extrusoramezcladora_Delete" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Mezcladora", Code = "extrusoramezcladora_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Mezcladora FullControl", Code = "extrusoramezcladora_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Mezcladora Insert", Code = "extrusoramezcladora_Insert" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Mezcladora Update", Code = "extrusoramezcladora_Update" },
            new() { Module = "HICONE", Name = "Select Extrusora Mezcladora", Code = "extrusoramezcladoraprompt_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora View", Code = "extrusoramezcladoraview_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora WW", Code = "extrusoramezcladoraww_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora WWGet Filter Services", Code = "extrusoramezcladoraww_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Observacion Delete", Code = "extrusoraobservacion_Delete" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Observacion", Code = "extrusoraobservacion_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Observacion FullControl", Code = "extrusoraobservacion_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Observacion Insert", Code = "extrusoraobservacion_Insert" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Observacion Update", Code = "extrusoraobservacion_Update" },
            new() { Module = "ReportesHICONE", Name = "Select Causa Interrupcion", Code = "extrusoraobservacioncausainterrupcionprompt_Execute" },
            new() { Module = "ReportesHICONE", Name = "Select Extrusora Observacion", Code = "extrusoraobservacionprompt_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Observacion View", Code = "extrusoraobservacionview_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Observacion WW", Code = "extrusoraobservacionww_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Observacion WWGet Filter Services", Code = "extrusoraobservacionww_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Producto Delete", Code = "extrusoraproducto_Delete" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Producto", Code = "extrusoraproducto_Execute" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Producto FullControl", Code = "extrusoraproducto_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Producto Insert", Code = "extrusoraproducto_Insert" },
            new() { Module = "ReportesHICONE", Name = "Extrusora Producto Update", Code = "extrusoraproducto_Update" },
            new() { Module = "HICONE", Name = "Extrusoras", Code = "extrusoras_Execute" },
            new() { Module = "HICONE", Name = "Extrusoras En Operacion", Code = "extrusorasenoperacion_Execute" },
            new() { Module = "HICONE", Name = "Extrusoras En Operacion Services", Code = "extrusorasenoperacion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDFinalizar Extrusion Services", Code = "finalizarextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDFinalizar Prensado Services", Code = "finalizarprensado_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "FTB Delete", Code = "ftb_Delete" },
            new() { Module = "ReportesHICONE", Name = "FTB", Code = "ftb_Execute" },
            new() { Module = "ReportesHICONE", Name = "FTB FullControl", Code = "ftb_FullControl" },
            new() { Module = "ReportesHICONE", Name = "FTB Insert", Code = "ftb_Insert" },
            new() { Module = "ReportesHICONE", Name = "FTB Update", Code = "ftb_Update" },
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
            new() { Module = "ReportesHICONE", Name = "Get Home Modules Sample", Code = "gethomemodulessample_Execute" },
            new() { Module = "ReportesHICONE", Name = "Get Home Sample Data", Code = "gethomesampledata_Execute" },
            new() { Module = "ReportesHICONE", Name = "Get Home Sample Data Service", Code = "gethomesampledataservice_Execute" },
            new() { Module = "ReportesHICONE", Name = "Get Home Sample Data Service Services", Code = "gethomesampledataservice_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Get Home Sample Name Value Data", Code = "gethomesamplenamevaluedata_Execute" },
            new() { Module = "ReportesHICONE", Name = "Get Home Sample Name Value Data Services", Code = "gethomesamplenamevaluedata_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Get Main Home Modules Sample", Code = "getmainhomemodulessample_Execute" },
            new() { Module = "ReportesHICONE", Name = "Get Some Home Modules Sample", Code = "getsomehomemodulessample_Execute" },
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
            new() { Module = "HICONE", Name = "HICONE_SDFinalizar Bobina", Code = "hicone_sdfinalizarbobina_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDIniciar Extrusion", Code = "hicone_sdiniciarextrusion_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDIniciar Prensado", Code = "hicone_sdiniciarprensado_Execute" },
            new() { Module = "HICONE", Name = "Inicio", Code = "hicone_sdinicio_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDInit Wizard", Code = "hicone_sdinitwizard_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDIntermedia", Code = "hicone_sdintermedia_Execute" },
            new() { Module = "HICONE", Name = "Extrusiones", Code = "hicone_sdlistaextrusiones_Execute" },
            new() { Module = "HICONE", Name = "Prensados", Code = "hicone_sdlistaprensados_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDPrensado Intermedio", Code = "hicone_sdprensadointermedio_Execute" },
            new() { Module = "HICONE", Name = "Reporte Prensado", Code = "hicone_sdprensadoreporte_Execute" },
            new() { Module = "HICONE", Name = "Prensados", Code = "hicone_sdprensados_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDPrensa Troquel", Code = "hicone_sdprensatroquel_Execute" },
            new() { Module = "HICONE", Name = "Reportes", Code = "hicone_sdreportes_Execute" },
            new() { Module = "HICONE", Name = "Retiquetar Carretes", Code = "hicone_sdretiquetarcarretes_Execute" },
            new() { Module = "HICONE", Name = "Retiquetar Pallet", Code = "hicone_sdretiquetarpallet_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDSustituir Bobina", Code = "hicone_sdsustituirbobina_Execute" },
            new() { Module = "HICONE", Name = "Módulo de Producción HI-CONE", Code = "hiconehomesd_Execute" },
            new() { Module = "HICONE", Name = "SDPMenu Info DP", Code = "hiconeinfodp_Execute" },
            new() { Module = "HICONE", Name = "HICONEOB", Code = "hiconeob_Execute" },
            new() { Module = "HICONE", Name = "SDPHome Banner DP", Code = "hiconesdhomebannerdp1_Execute" },
            new() { Module = "HICONE", Name = "SDPHome Banner DP", Code = "hiconesdhomebannerdp_Execute" },
            new() { Module = "HICONE", Name = "Menu Data Provider", Code = "hiconesoptionsdp_Execute" },
            new() { Module = "ReportesHICONE", Name = "WWP_HomeTitle", Code = "home_Execute" },
            new() { Module = "HICONE", Name = "Select Bobina", Code = "imprimirbobinas_Execute" },
            new() { Module = "HICONE", Name = "Imprimir Bobinas Get Filter Data Services", Code = "imprimirbobinas_Services_Execute" },
            new() { Module = "HICONE", Name = "Insertar Manualente Bobinas Services", Code = "iniciarbobinas_Services_Execute" },
            new() { Module = "HICONE", Name = "Iniciar Carrera Services", Code = "iniciarcarrera_Services_Execute" },
            new() { Module = "HICONE", Name = "Inicio Calidad", Code = "iniciocalidad_Execute" },
            new() { Module = "HICONE", Name = "Inicio Catalogos SAE", Code = "iniciocatalogossae_Execute" },
            new() { Module = "HICONE", Name = "Inicio Embarques", Code = "inicioembarques_Execute" },
            new() { Module = "HICONE", Name = "Inicio Extrusion", Code = "inicioextrusion_Execute" },
            new() { Module = "HICONE", Name = "Inicio Inventario", Code = "inicioinventario_Execute" },
            new() { Module = "HICONE", Name = "Inicio Prensado", Code = "inicioprensado_Execute" },
            new() { Module = "HICONE", Name = "Tablero Producción", Code = "inicioproduccion_Execute" },
            new() { Module = "HICONE", Name = "Inicio Reportes", Code = "inicioreportes_Execute" },
            new() { Module = "HICONE", Name = "Inicio Reportes HC", Code = "inicioreporteshc_Execute" },
            new() { Module = "HICONE", Name = "inicio Seguridad", Code = "inicioseguridad_Execute" },
            new() { Module = "HICONE", Name = "Insumo Producto Services", Code = "insumoproducto_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Interrupcion Delete", Code = "interrupcion_Delete" },
            new() { Module = "ReportesHICONE", Name = "Interrupcion", Code = "interrupcion_Execute" },
            new() { Module = "ReportesHICONE", Name = "Interrupcion FullControl", Code = "interrupcion_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Interrupcion Insert", Code = "interrupcion_Insert" },
            new() { Module = "ReportesHICONE", Name = "Interrupcion Update", Code = "interrupcion_Update" },
            new() { Module = "HICONE", Name = "Select Interrupcion", Code = "interrupcionprompt_Execute" },
            new() { Module = "HICONE", Name = "Interrupcion Prompt Get Filter Data Services", Code = "interrupcionprompt_Services_Execute" },
            new() { Module = "HICONE", Name = "Interrupcion View", Code = "interrupcionview_Execute" },
            new() { Module = "HICONE", Name = "Interrupcion", Code = "interrupcionww_Execute" },
            new() { Module = "HICONE", Name = "Interrupcion WWGet Filter Data Services", Code = "interrupcionww_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Inventario Delete", Code = "inventario_Delete" },
            new() { Module = "ReportesHICONE", Name = "Inventario", Code = "inventario_Execute" },
            new() { Module = "ReportesHICONE", Name = "Inventario FullControl", Code = "inventario_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Inventario Insert", Code = "inventario_Insert" },
            new() { Module = "ReportesHICONE", Name = "Inventario Update", Code = "inventario_Update" },
            new() { Module = "HICONE", Name = "Inventario DP", Code = "inventariodp_Execute" },
            new() { Module = "HICONE", Name = "Item Notification", Code = "itemnotification_Execute" },
            new() { Module = "HICONE", Name = "ITWOutlook", Code = "itwoutlook_Execute" },
            new() { Module = "HICONE", Name = "Jornada Laboral Services", Code = "jornadalaboral_Services_Execute" },
            new() { Module = "HICONE", Name = "HICONE", Code = "kbs2022sd_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDExtrusionMain", Code = "kbs2022sdextrusionmain_Execute" },
            new() { Module = "HICONE", Name = "HICONESDHome", Code = "kbs2022sdhome_Execute" },
            new() { Module = "HICONE", Name = "HICONESDHome Tab3", Code = "kbs2022sdhometab3_Execute" },
            new() { Module = "HICONE", Name = "HICONESDOB", Code = "kbs2022sdob_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDPrensado Main", Code = "kbs2022sdprensadomain_Execute" },
            new() { Module = "HICONE", Name = "Embarques", Code = "listadoembarques_Execute" },
            new() { Module = "HICONE", Name = "Listado Embarques Get Filter Data Services", Code = "listadoembarques_Services_Execute" },
            new() { Module = "HICONE", Name = "Pedidos", Code = "listadoordenes_Execute" },
            new() { Module = "HICONE", Name = "Listado Ordenes Get Filter Data Services", Code = "listadoordenes_Services_Execute" },
            new() { Module = "HICONE", Name = "Remisiones", Code = "listadoremisiones_Execute" },
            new() { Module = "HICONE", Name = "Listado Remisiones Get Filter Data Services", Code = "listadoremisiones_Services_Execute" },
            new() { Module = "HICONE", Name = "Embarque", Code = "listarembarques_Execute" },
            new() { Module = "HICONE", Name = "Listar Embarques Get Filter Data Services", Code = "listarembarques_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusion", Code = "listarextrusion_Execute" },
            new() { Module = "HICONE", Name = "listar Extrusion Get Filter Data Services", Code = "listarextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusora", Code = "listarextrusora_Execute" },
            new() { Module = "HICONE", Name = "listar Extrusora Get Filter Data Services", Code = "listarextrusora_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Mezcladora", Code = "listarextrusoramezcladora_Execute" },
            new() { Module = "HICONE", Name = "Listar Extrusora Mezcladora Get Filter Data Services", Code = "listarextrusoramezcladora_Services_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Producto", Code = "listarextrusoraproducto_Execute" },
            new() { Module = "HICONE", Name = "listar Extrusora Producto Get Filter Data Services", Code = "listarextrusoraproducto_Services_Execute" },
            new() { Module = "HICONE", Name = "Inventario", Code = "listarinventario_Execute" },
            new() { Module = "HICONE", Name = "listar Inventario Get Filter Data Services", Code = "listarinventario_Services_Execute" },
            new() { Module = "HICONE", Name = "Lote", Code = "listarlotes_Execute" },
            new() { Module = "HICONE", Name = "listar Lotes Get Filter Data Services", Code = "listarlotes_Services_Execute" },
            new() { Module = "HICONE", Name = "Operador", Code = "listaroperador_Execute" },
            new() { Module = "HICONE", Name = "listar Operador Get Filter Data Services", Code = "listaroperador_Services_Execute" },
            new() { Module = "HICONE", Name = "Prensa Producto", Code = "listarprensaproducto_Execute" },
            new() { Module = "HICONE", Name = "listar Prensa Producto Get Filter Data Services", Code = "listarprensaproducto_Services_Execute" },
            new() { Module = "HICONE", Name = "Prensa", Code = "listarprensas_Execute" },
            new() { Module = "HICONE", Name = "listar Prensas Get Filter Data Services", Code = "listarprensas_Services_Execute" },
            new() { Module = "HICONE", Name = "Producto Categoria", Code = "listarproductocategoria_Execute" },
            new() { Module = "HICONE", Name = "listar Producto Categoria Get Filter Data Services", Code = "listarproductocategoria_Services_Execute" },
            new() { Module = "HICONE", Name = "Producto", Code = "listarproductos_Execute" },
            new() { Module = "HICONE", Name = "listar Productos Get Filter Data Services", Code = "listarproductos_Services_Execute" },
            new() { Module = "HICONE", Name = "Producto Terminado", Code = "listarproductoterminado_Execute" },
            new() { Module = "HICONE", Name = "listar Producto Terminado Get Filter Data Services", Code = "listarproductoterminado_Services_Execute" },
            new() { Module = "HICONE", Name = "Silo", Code = "listarsilos_Execute" },
            new() { Module = "HICONE", Name = "listar Silos Get Filter Data Services", Code = "listarsilos_Services_Execute" },
            new() { Module = "HICONE", Name = "Troquel", Code = "listartroquel_Execute" },
            new() { Module = "HICONE", Name = "listar Troquel Get Filter Data Services", Code = "listartroquel_Services_Execute" },
            new() { Module = "HICONE", Name = "Turno", Code = "listarturnos_Execute" },
            new() { Module = "HICONE", Name = "listar Turnos Get Filter Data Services", Code = "listarturnos_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Lote Delete", Code = "lote_Delete" },
            new() { Module = "ReportesHICONE", Name = "Lote", Code = "lote_Execute" },
            new() { Module = "ReportesHICONE", Name = "Lote FullControl", Code = "lote_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Lote Insert", Code = "lote_Insert" },
            new() { Module = "ReportesHICONE", Name = "Lote Update", Code = "lote_Update" },
            new() { Module = "HICONE", Name = "Lote DP", Code = "lotedp_Execute" },
            new() { Module = "HICONE", Name = "Select Lote", Code = "loteprompt_Execute" },
            new() { Module = "ReportesHICONE", Name = "Lote Reporte Delete", Code = "lotereporte_Delete" },
            new() { Module = "ReportesHICONE", Name = "Lote Reporte", Code = "lotereporte_Execute" },
            new() { Module = "ReportesHICONE", Name = "Lote Reporte FullControl", Code = "lotereporte_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Lote Reporte Insert", Code = "lotereporte_Insert" },
            new() { Module = "ReportesHICONE", Name = "Lote Reporte Update", Code = "lotereporte_Update" },
            new() { Module = "HICONE", Name = "Lotes Disponibles DP", Code = "lotesdisponiblesdp_Execute" },
            new() { Module = "HICONE", Name = "Lote View", Code = "loteview_Execute" },
            new() { Module = "HICONE", Name = "Lote", Code = "loteww_Execute" },
            new() { Module = "HICONE", Name = "Lote WWGet Filter Data Services", Code = "loteww_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "WWP_ManageFiltersDescription", Code = "managefilters_Execute" },
            new() { Module = "HICONE", Name = "Medir Bobinas Services", Code = "medirbobinas_Services_Execute" },
            new() { Module = "HICONE", Name = "Medir Bobinas En Proceso Services", Code = "medirbobinasenproceso_Services_Execute" },
            new() { Module = "HICONE", Name = "Menu Embarques", Code = "menucalidad_Execute" },
            new() { Module = "HICONE", Name = "Menu Configuracion", Code = "menuconfiguracion_Execute" },
            new() { Module = "HICONE", Name = "Menu DP", Code = "menudp_Execute" },
            new() { Module = "HICONE", Name = "Menu Embarques", Code = "menuembarques_Execute" },
            new() { Module = "HICONE", Name = "Menu Extrusion", Code = "menuextrusion_Execute" },
            new() { Module = "HICONE", Name = "Menu Inventario", Code = "menuinventario_Execute" },
            new() { Module = "HICONE", Name = "Menu Materia Prima", Code = "menumateriaprima_Execute" },
            new() { Module = "HICONE", Name = "Menu Module Catalogos SAE", Code = "menumodulecatalogossae_Execute" },
            new() { Module = "HICONE", Name = "Menu Module Informes SAE", Code = "menumoduleinformessae_Execute" },
            new() { Module = "ReportesHICONE", Name = "Menu Options Data", Code = "menuoptionsdata_Execute" },
            new() { Module = "HICONE", Name = "Menu Prensado", Code = "menuprensado_Execute" },
            new() { Module = "HICONE", Name = "Menu Produccion", Code = "menuproduccion_Execute" },
            new() { Module = "HICONE", Name = "Menu Reportes HC", Code = "menureporteshc_Execute" },
            new() { Module = "HICONE", Name = "Menu Seguridad", Code = "menuseguridad_Execute" },
            new() { Module = "HICONE", Name = "Module A", Code = "modulea_Execute" },
            new() { Module = "HICONE", Name = "Module B", Code = "moduleb_Execute" },
            new() { Module = "HICONE", Name = "Get Home Modules Sample Copy1", Code = "modules_Execute" },
            new() { Module = "HICONE", Name = "New payment method", Code = "myproductsaddnewpaymentmethod_Execute" },
            new() { Module = "HICONE", Name = "Delivery address", Code = "myproductscartaddress_Execute" },
            new() { Module = "HICONE", Name = "My Products Cart Checkout", Code = "myproductscartcheckout_Execute" },
            new() { Module = "HICONE", Name = "Review your order", Code = "myproductscartconfirm_Execute" },
            new() { Module = "HICONE", Name = "My Products Cart Payments", Code = "myproductscartpayments_Execute" },
            new() { Module = "HICONE", Name = "My Products Cart Success", Code = "myproductscartsuccess_Execute" },
            new() { Module = "HICONE", Name = "Product Details", Code = "myproductsproductdetail_Execute" },
            new() { Module = "HICONE", Name = "Not Authorized", Code = "notauthorized_Execute" },
            new() { Module = "HICONE", Name = "Notifications Registration Handler Services", Code = "notificationsregistrationhandler_Services_Execute" },
            new() { Module = "HICONE", Name = "Obtener Aditivos Services", Code = "obteneraditivos_Services_Execute" },
            new() { Module = "HICONE", Name = "Obtener Configuracion Services", Code = "obtenerconfiguracion_Services_Execute" },
            new() { Module = "HICONE", Name = "Obtener Operador Id Services", Code = "obteneroperadorid_Services_Execute" },
            new() { Module = "HICONE", Name = "Obtener Palet Services", Code = "obtenerpalet_Services_Execute" },
            new() { Module = "HICONE", Name = "Obtener Prensa Producto Prensado Services", Code = "obtenerprensaproductoprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "Obtener Producto Etiquetable Services", Code = "obtenerproductoetiquetable_Services_Execute" },
            new() { Module = "HICONE", Name = "Obtener SDTEtiqueta Bobina Services", Code = "obtenersdtetiquetabobina_Services_Execute" },
            new() { Module = "HICONE", Name = "Obtener SDTEtiqueta Carrete Services", Code = "obtenersdtetiquetacarrete_Services_Execute" },
            new() { Module = "HICONE", Name = "Obtener SDTEtiqueta Palet Services", Code = "obtenersdtetiquetapalet_Services_Execute" },
            new() { Module = "HICONE", Name = "Obtener Tipo Material Por Carrete Services", Code = "obtenertipomaterialporcarrete_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Operador Delete", Code = "operador_Delete" },
            new() { Module = "ReportesHICONE", Name = "Operador", Code = "operador_Execute" },
            new() { Module = "ReportesHICONE", Name = "Operador FullControl", Code = "operador_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Operador Insert", Code = "operador_Insert" },
            new() { Module = "ReportesHICONE", Name = "Operador Update", Code = "operador_Update" },
            new() { Module = "HICONE", Name = "Operador DP", Code = "operadordp_Execute" },
            new() { Module = "HICONE", Name = "Operador Orden Etiquetado DP", Code = "operadorordenetiquetadodp_Execute" },
            new() { Module = "HICONE", Name = "Order", Code = "ordenesww_Execute" },
            new() { Module = "HICONE", Name = "Ordenes WWGet Filter Data Services", Code = "ordenesww_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Orden Etiquetado Delete", Code = "ordenetiquetado_Delete" },
            new() { Module = "ReportesHICONE", Name = "Orden Etiquetado", Code = "ordenetiquetado_Execute" },
            new() { Module = "ReportesHICONE", Name = "Orden Etiquetado FullControl", Code = "ordenetiquetado_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Orden Etiquetado Insert", Code = "ordenetiquetado_Insert" },
            new() { Module = "ReportesHICONE", Name = "Orden Etiquetado Update", Code = "ordenetiquetado_Update" },
            new() { Module = "HICONE", Name = "Orden Etiquetado Abierta Services", Code = "ordenetiquetadoabierta_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Order Delete", Code = "order_Delete" },
            new() { Module = "ReportesHICONE", Name = "Order", Code = "order_Execute" },
            new() { Module = "ReportesHICONE", Name = "Order FullControl", Code = "order_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Order Insert", Code = "order_Insert" },
            new() { Module = "ReportesHICONE", Name = "Order Update", Code = "order_Update" },
            new() { Module = "HICONE", Name = "Select Order", Code = "orderprompt_Execute" },
            new() { Module = "HICONE", Name = "Orders", Code = "orders_Execute" },
            new() { Module = "HICONE", Name = "Orders Money", Code = "ordersmoney_Execute" },
            new() { Module = "HICONE", Name = "Order View", Code = "orderview_Execute" },
            new() { Module = "HICONE", Name = "Order", Code = "orderww_Execute" },
            new() { Module = "HICONE", Name = "outlookww", Code = "outlookww_Execute" },
            new() { Module = "ReportesHICONE", Name = "Palet Delete", Code = "palet_Delete" },
            new() { Module = "ReportesHICONE", Name = "Palet", Code = "palet_Execute" },
            new() { Module = "ReportesHICONE", Name = "Palet FullControl", Code = "palet_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Palet Insert", Code = "palet_Insert" },
            new() { Module = "ReportesHICONE", Name = "Palet Update", Code = "palet_Update" },
            new() { Module = "ReportesHICONE", Name = "Palet Carrete Delete", Code = "paletcarrete_Delete" },
            new() { Module = "ReportesHICONE", Name = "Palet Carrete", Code = "paletcarrete_Execute" },
            new() { Module = "ReportesHICONE", Name = "Palet Carrete FullControl", Code = "paletcarrete_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Palet Carrete Insert", Code = "paletcarrete_Insert" },
            new() { Module = "ReportesHICONE", Name = "Palet Carrete Update", Code = "paletcarrete_Update" },
            new() { Module = "HICONE", Name = "Palet En Ensamble DP", Code = "paletdp_Execute" },
            new() { Module = "HICONE", Name = "Palet En Ensamble DP Services", Code = "paletdp_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Palet Etiqueta Impresa Delete", Code = "paletetiquetaimpresa_Delete" },
            new() { Module = "ReportesHICONE", Name = "Palet Etiqueta Impresa", Code = "paletetiquetaimpresa_Execute" },
            new() { Module = "ReportesHICONE", Name = "Palet Etiqueta Impresa FullControl", Code = "paletetiquetaimpresa_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Palet Etiqueta Impresa Insert", Code = "paletetiquetaimpresa_Insert" },
            new() { Module = "ReportesHICONE", Name = "Palet Etiqueta Impresa Update", Code = "paletetiquetaimpresa_Update" },
            new() { Module = "HICONE", Name = "Palet Etiquetando DP", Code = "paletetiquetandodp_Execute" },
            new() { Module = "HICONE", Name = "Palet Etiquetando DP Services", Code = "paletetiquetandodp_Services_Execute" },
            new() { Module = "HICONE", Name = "Palet Id Etiquetando DP", Code = "paletidetiquetandodp_Execute" },
            new() { Module = "HICONE", Name = "Palet Id Etiquetando DP Services", Code = "paletidetiquetandodp_Services_Execute" },
            new() { Module = "HICONE", Name = "Select Palet", Code = "paletprompt_Execute" },
            new() { Module = "HICONE", Name = "Palet Report Services", Code = "paletreport_Services_Execute" },
            new() { Module = "HICONE", Name = "Palet Report Main Services", Code = "paletreportmain_Services_Execute" },
            new() { Module = "HICONE", Name = "Palet Report SAP Services", Code = "paletreportsap_Services_Execute" },
            new() { Module = "HICONE", Name = "Palet Terminado DP", Code = "paletterminadodp_Execute" },
            new() { Module = "HICONE", Name = "Palet Terminado DP Services", Code = "paletterminadodp_Services_Execute" },
            new() { Module = "HICONE", Name = "Palet View", Code = "paletview_Execute" },
            new() { Module = "HICONE", Name = "Palet Palet Carrete WCGet Filter Data Services", Code = "paletview_Services_Execute" },
            new() { Module = "HICONE", Name = "Palet", Code = "paletww_Execute" },
            new() { Module = "HICONE", Name = "Palet WWGet Filter Data Services", Code = "paletww_Services_Execute" },
            new() { Module = "HICONE", Name = "Pallet Carrete Report Main Services", Code = "palletcarretereportmain_Services_Execute" },
            new() { Module = "HICONE", Name = "Pallet Carrete Report Main PCR Services", Code = "palletcarretereportmainpcr_Services_Execute" },
            new() { Module = "HICONE", Name = "Embarque Pallet", Code = "palletenembarque_Execute" },
            new() { Module = "HICONE", Name = "Pallet En Embarque Get Filter Data Services", Code = "palletenembarque_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Prensa Delete", Code = "prensa_Delete" },
            new() { Module = "ReportesHICONE", Name = "Prensa", Code = "prensa_Execute" },
            new() { Module = "ReportesHICONE", Name = "Prensa FullControl", Code = "prensa_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Prensa Insert", Code = "prensa_Insert" },
            new() { Module = "ReportesHICONE", Name = "Prensa Update", Code = "prensa_Update" },
            new() { Module = "ReportesHICONE", Name = "Prensa Carrera Delete", Code = "prensacarrera_Delete" },
            new() { Module = "ReportesHICONE", Name = "Prensa Carrera", Code = "prensacarrera_Execute" },
            new() { Module = "ReportesHICONE", Name = "Prensa Carrera FullControl", Code = "prensacarrera_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Prensa Carrera Insert", Code = "prensacarrera_Insert" },
            new() { Module = "ReportesHICONE", Name = "Prensa Carrera Update", Code = "prensacarrera_Update" },
            new() { Module = "HICONE", Name = "Prensa Detenida", Code = "prensadetenida_Execute" },
            new() { Module = "ReportesHICONE", Name = "Prensado Delete", Code = "prensado_Delete" },
            new() { Module = "ReportesHICONE", Name = "Prensado", Code = "prensado_Execute" },
            new() { Module = "ReportesHICONE", Name = "Prensado FullControl", Code = "prensado_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Prensado Insert", Code = "prensado_Insert" },
            new() { Module = "ReportesHICONE", Name = "Prensado Update", Code = "prensado_Update" },
            new() { Module = "ReportesHICONE", Name = "Prensado Bobina Delete", Code = "prensadobobina_Delete" },
            new() { Module = "ReportesHICONE", Name = "Prensado Bobina", Code = "prensadobobina_Execute" },
            new() { Module = "ReportesHICONE", Name = "Prensado Bobina FullControl", Code = "prensadobobina_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Prensado Bobina Insert", Code = "prensadobobina_Insert" },
            new() { Module = "ReportesHICONE", Name = "Prensado Bobina Update", Code = "prensadobobina_Update" },
            new() { Module = "HICONE", Name = "Prensado Bobina DP", Code = "prensadobobinadp_Execute" },
            new() { Module = "HICONE", Name = "Prensado Bobina DP Services", Code = "prensadobobinadp_Services_Execute" },
            new() { Module = "HICONE", Name = "Select Prensado Bobina", Code = "prensadobobinaprompt_Execute" },
            new() { Module = "HICONE", Name = "Prensado Bobina View", Code = "prensadobobinaview_Execute" },
            new() { Module = "HICONE", Name = "Prensado Bobina", Code = "prensadobobinaww_Execute" },
            new() { Module = "HICONE", Name = "Prensado Bobina WWGet Filter Data Services", Code = "prensadobobinaww_Services_Execute" },
            new() { Module = "HICONE", Name = "Prensado Del Dia", Code = "prensadodeldia_Execute" },
            new() { Module = "HICONE", Name = "Producción de Prensado", Code = "prensadoldiacarrera_Execute" },
            new() { Module = "HICONE", Name = "Prensado Del Dia DP", Code = "prensadoldiadp_Execute" },
            new() { Module = "HICONE", Name = "Prensado Del Dia DP Services", Code = "prensadoldiadp_Services_Execute" },
            new() { Module = "HICONE", Name = "Prensado Terminado DP", Code = "prensadodp_Execute" },
            new() { Module = "HICONE", Name = "Prensado Terminado DP Services", Code = "prensadodp_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Prensado Interrupcion Delete", Code = "prensadointerrupcion_Delete" },
            new() { Module = "ReportesHICONE", Name = "Prensado Interrupcion", Code = "prensadointerrupcion_Execute" },
            new() { Module = "ReportesHICONE", Name = "Prensado Interrupcion FullControl", Code = "prensadointerrupcion_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Prensado Interrupcion Insert", Code = "prensadointerrupcion_Insert" },
            new() { Module = "ReportesHICONE", Name = "Prensado Interrupcion Update", Code = "prensadointerrupcion_Update" },
            new() { Module = "HICONE", Name = "Select Prensado Interrupcion", Code = "prensadointerrupcionprompt_Execute" },
            new() { Module = "HICONE", Name = "Prensado Interrupcion View", Code = "prensadointerrupcionview_Execute" },
            new() { Module = "HICONE", Name = "Prensado Interrupcion", Code = "prensadointerrupcionww_Execute" },
            new() { Module = "HICONE", Name = "Select Prensado", Code = "prensadoprompt_Execute" },
            new() { Module = "ReportesHICONE", Name = "Prensado Resultado Delete", Code = "prensadoresultado_Delete" },
            new() { Module = "HICONE", Name = "Prensado Resultado", Code = "prensadoresultado_Execute" },
            new() { Module = "HICONE", Name = "Prensado Resultado FullControl", Code = "prensadoresultado_FullControl" },
            new() { Module = "HICONE", Name = "Prensado Resultado Insert", Code = "prensadoresultado_Insert" },
            new() { Module = "HICONE", Name = "Prensado Resultado Update", Code = "prensadoresultado_Update" },
            new() { Module = "HICONE", Name = "Prensado View", Code = "prensadoview_Execute" },
            new() { Module = "HICONE", Name = "Prensado", Code = "prensadoww_Execute" },
            new() { Module = "HICONE", Name = "Prensado WWGet Filter Data Services", Code = "prensadoww_Services_Execute" },
            new() { Module = "HICONE", Name = "Prensa DP", Code = "prensapdp_Execute" },
            new() { Module = "HICONE", Name = "Prensa Observation Delete", Code = "prensaobservacion_Delete" },
            new() { Module = "HICONE", Name = "Prensa Observacion", Code = "prensaobservacion_Execute" },
            new() { Module = "HICONE", Name = "Prensa Observacion FullControl", Code = "prensaobservacion_FullControl" },
            new() { Module = "HICONE", Name = "Prensa Observacion Insert", Code = "prensaobservacion_Insert" },
            new() { Module = "HICONE", Name = "Prensa Observacion Update", Code = "prensaobservacion_Update" },
            new() { Module = "HICONE", Name = "Select Causa Interrupcion", Code = "prensaobservacioncausainterrupcionprompt_Execute" },
            new() { Module = "HICONE", Name = "Select Prensa Observacion", Code = "prensaobservacionprompt_Execute" },
            new() { Module = "HICONE", Name = "Prensa Observacion View", Code = "prensaobservacionview_Execute" },
            new() { Module = "HICONE", Name = "Prensa Observacion", Code = "prensaobservacionww_Execute" },
            new() { Module = "HICONE", Name = "Prensa Observacion WWGet Filter Data Services", Code = "prensaobservacionww_Services_Execute" },
            new() { Module = "HICONE", Name = "Prensa Producto Delete", Code = "prensaproducto_Delete" },
            new() { Module = "HICONE", Name = "Prensa Producto", Code = "prensaproducto_Execute" },
            new() { Module = "HICONE", Name = "Prensa Producto FullControl", Code = "prensaproducto_FullControl" },
            new() { Module = "HICONE", Name = "Prensa Producto Insert", Code = "prensaproducto_Insert" },
            new() { Module = "HICONE", Name = "Prensa Producto Update", Code = "prensaproducto_Update" },
            new() { Module = "HICONE", Name = "Select Prensa", Code = "prensaprompt_Execute" },
            new() { Module = "HICONE", Name = "Prensa Troquel Delete", Code = "prensatroquel_Delete" },
            new() { Module = "ReportesHICONE", Name = "Prensa Troquel", Code = "prensatroquel_Execute" },
            new() { Module = "ReportesHICONE", Name = "Prensa Troquel FullControl", Code = "prensatroquel_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Prensa Troquel Insert", Code = "prensatroquel_Insert" },
            new() { Module = "ReportesHICONE", Name = "Prensa Troquel Update", Code = "prensatroquel_Update" },
            new() { Module = "HICONE", Name = "Select Turno", Code = "prensaturnoprompt_Execute" },
            new() { Module = "HICONE", Name = "Prensa View", Code = "prensaview_Execute" },
            new() { Module = "HICONE", Name = "Prensa", Code = "prensaww_Execute" },
            new() { Module = "HICONE", Name = "Prensa WWGet Filter Data Services", Code = "prensaww_Services_Execute" },
            new() { Module = "HICONE", Name = "priceww", Code = "priceww_Execute" },
            new() { Module = "ReportesHICONE", Name = "Product Delete", Code = "product_Delete" },
            new() { Module = "ReportesHICONE", Name = "Product", Code = "product_Execute" },
            new() { Module = "ReportesHICONE", Name = "Product FullControl", Code = "product_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Product Insert", Code = "product_Insert" },
            new() { Module = "ReportesHICONE", Name = "Product Update", Code = "product_Update" },
            new() { Module = "HICONE", Name = "Product DP", Code = "productdp_Execute" },
            new() { Module = "ReportesHICONE", Name = "Producto Delete", Code = "producto_Delete" },
            new() { Module = "ReportesHICONE", Name = "Producto", Code = "producto_Execute" },
            new() { Module = "ReportesHICONE", Name = "Producto FullControl", Code = "producto_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Producto Insert", Code = "producto_Insert" },
            new() { Module = "ReportesHICONE", Name = "Producto Update", Code = "producto_Update" },
            new() { Module = "ReportesHICONE", Name = "Producto Categoria Delete", Code = "productocategoria_Delete" },
            new() { Module = "ReportesHICONE", Name = "Producto Categoria", Code = "productocategoria_Execute" },
            new() { Module = "ReportesHICONE", Name = "Producto Categoria FullControl", Code = "productocategoria_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Producto Categoria Insert", Code = "productocategoria_Insert" },
            new() { Module = "ReportesHICONE", Name = "Producto Categoria Update", Code = "productocategoria_Update" },
            new() { Module = "HICONE", Name = "Producto Categoria DP", Code = "productocategoriadp_Execute" },
            new() { Module = "HICONE", Name = "Producto DP", Code = "productodp_Execute" },
            new() { Module = "ReportesHICONE", Name = "Producto Terminado Delete", Code = "productoterminado_Delete" },
            new() { Module = "ReportesHICONE", Name = "Producto Terminado", Code = "productoterminado_Execute" },
            new() { Module = "ReportesHICONE", Name = "Producto Terminado FullControl", Code = "productoterminado_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Producto Terminado Insert", Code = "productoterminado_Insert" },
            new() { Module = "ReportesHICONE", Name = "Producto Terminado Update", Code = "productoterminado_Update" },
            new() { Module = "HICONE", Name = "Producto Terminado DP", Code = "productoterminadodp_Execute" },
            new() { Module = "HICONE", Name = "Select Producto Terminado", Code = "productoterminadoprompt_Execute" },
            new() { Module = "HICONE", Name = "Producto Terminado View", Code = "productoterminadoview_Execute" },
            new() { Module = "HICONE", Name = "Producto Terminado", Code = "productoterminadoww_Execute" },
            new() { Module = "HICONE", Name = "Producto Terminado WWGet Filter Data Services", Code = "productoterminadoww_Services_Execute" },
            new() { Module = "HICONE", Name = "Select Product", Code = "productprompt_Execute" },
            new() { Module = "HICONE", Name = "Product", Code = "productsww_Execute" },
            new() { Module = "HICONE", Name = "Products WWGet Filter Data Services", Code = "productsww_Services_Execute" },
            new() { Module = "HICONE", Name = "Product View", Code = "productview_Execute" },
            new() { Module = "HICONE", Name = "Product", Code = "productww_Execute" },
            new() { Module = "HICONE", Name = "Product WWGet Filter Data Services", Code = "productww_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "WWP_PromptGeolocationSelect", Code = "promptgeolocation_Execute" },
            new() { Module = "HICONE", Name = "Query Produccion", Code = "queryproduccion_Execute" },
            new() { Module = "HICONE", Name = "Query Turno Semanal Extrusion", Code = "queryturnosemanalextrusion_Execute" },
            new() { Module = "HICONE", Name = "Query Turno Semanal Prensado", Code = "queryturnosemanalprensado_Execute" },
            new() { Module = "HICONE", Name = "Realtime Inventory", Code = "realtimeinventory_Execute" },
            new() { Module = "ReportesHICONE", Name = "Reclamo Delete", Code = "reclamo_Delete" },
            new() { Module = "ReportesHICONE", Name = "Reclamo", Code = "reclamo_Execute" },
            new() { Module = "ReportesHICONE", Name = "Reclamo FullControl", Code = "reclamo_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Reclamo Insert", Code = "reclamo_Insert" },
            new() { Module = "ReportesHICONE", Name = "Reclamo Update", Code = "reclamo_Update" },
            new() { Module = "ReportesHICONE", Name = "Reclamo Detalle Delete", Code = "reclamodetalle_Delete" },
            new() { Module = "ReportesHICONE", Name = "Reclamo Detalle", Code = "reclamodetalle_Execute" },
            new() { Module = "ReportesHICONE", Name = "Reclamo Detalle FullControl", Code = "reclamodetalle_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Reclamo Detalle Insert", Code = "reclamodetalle_Insert" },
            new() { Module = "ReportesHICONE", Name = "Reclamo Detalle Update", Code = "reclamodetalle_Update" },
            new() { Module = "HICONE", Name = "Sumario", Code = "reclamodetallesumario_Execute" },
            new() { Module = "HICONE", Name = "Reclamo Formato", Code = "reclamoformato_Execute" },
            new() { Module = "HICONE", Name = "Reclamo Producto DP", Code = "reclamoproductodp_Execute" },
            new() { Module = "HICONE", Name = "Reclamo", Code = "reclamosww_Execute" },
            new() { Module = "HICONE", Name = "reclamosww Get Filter Data Services", Code = "reclamosww_Services_Execute" },
            new() { Module = "HICONE", Name = "reclamoview", Code = "reclamoview_Execute" },
            new() { Module = "ReportesHICONE", Name = "Remission Delete", Code = "remission_Delete" },
            new() { Module = "ReportesHICONE", Name = "Remission", Code = "remission_Execute" },
            new() { Module = "ReportesHICONE", Name = "Remission FullControl", Code = "remission_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Remission Insert", Code = "remission_Insert" },
            new() { Module = "ReportesHICONE", Name = "Remission Update", Code = "remission_Update" },
            new() { Module = "HICONE", Name = "Select Remission", Code = "remissionprompt_Execute" },
            new() { Module = "HICONE", Name = "Remission", Code = "remissionsww_Execute" },
            new() { Module = "HICONE", Name = "Remissions WWGet Filter Data Services", Code = "remissionsww_Services_Execute" },
            new() { Module = "HICONE", Name = "Remission View", Code = "remissionview_Execute" },
            new() { Module = "HICONE", Name = "Remission", Code = "remissionww_Execute" },
            new() { Module = "HICONE", Name = "Remission WWGet Filter Data Services", Code = "remissionww_Services_Execute" },
            new() { Module = "HICONE", Name = "Reporte DRR", Code = "reportedrr_Execute" },
            new() { Module = "HICONE", Name = "Reporte Existencia", Code = "reporteexistencia_Execute" },
            new() { Module = "HICONE", Name = "Reporte Extrusion", Code = "reporteextrusion_Execute" },
            new() { Module = "HICONE", Name = "Reporte Prensado", Code = "reporteprensado_Execute" },
            new() { Module = "HICONE", Name = "Report ITW", Code = "reportitw_Execute" },
            new() { Module = "HICONE", Name = "Report View", Code = "reportview_Execute" },
            new() { Module = "HICONE", Name = "Reposo Transcurrido Services", Code = "reposotranscurrido_Services_Execute" },
            new() { Module = "HICONE", Name = "Reposo Transcurrido Bobina Services", Code = "reposotranscurridobobina_Services_Execute" },
            new() { Module = "HICONE", Name = "Rpt Extrusion Services", Code = "rptextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "Rpt Prensado Services", Code = "rptprensado_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Sales Person Delete", Code = "salesperson_Delete" },
            new() { Module = "ReportesHICONE", Name = "Sales Person", Code = "salesperson_Execute" },
            new() { Module = "ReportesHICONE", Name = "Sales Person FullControl", Code = "salesperson_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Sales Person Insert", Code = "salesperson_Insert" },
            new() { Module = "ReportesHICONE", Name = "Sales Person Update", Code = "salesperson_Update" },
            new() { Module = "HICONE", Name = "Select Sales Person", Code = "salespersonprompt_Execute" },
            new() { Module = "HICONE", Name = "Sales Person View", Code = "salespersonview_Execute" },
            new() { Module = "HICONE", Name = "Sales Person", Code = "salespersonww_Execute" },
            new() { Module = "HICONE", Name = "Sales Person WWGet Filter Data Services", Code = "salespersonww_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "WWP_SaveFilterAsDescription", Code = "savefilteras_Execute" },
            new() { Module = "HICONE", Name = "SDAgregar Carrera Services", Code = "sdagregarcarrera_Services_Execute" },
            new() { Module = "HICONE", Name = "SDAgregar Carrete Services", Code = "sdagregarcarrete_Services_Execute" },
            new() { Module = "HICONE", Name = "SDAsignar Troquel Services", Code = "sdasignartroquel_Services_Execute" },
            new() { Module = "HICONE", Name = "SDBobina En Prensado Services", Code = "sdbobinaenprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "SDBobina Item Services", Code = "sdbobinaitem_Services_Execute" },
            new() { Module = "HICONE", Name = "SDBobina Proceso", Code = "sdbobinaproceso_Execute" },
            new() { Module = "HICONE", Name = "SDBobinas En Medicion Services", Code = "sdbobinasenmedicion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDCambio Troquel Services", Code = "sdcambiotroquel_Services_Execute" },
            new() { Module = "HICONE", Name = "SDCarrera DP Services", Code = "sdcarreradp_Services_Execute" },
            new() { Module = "HICONE", Name = "SDCarreras Prensado", Code = "sdcarrerasprensado_Execute" },
            new() { Module = "HICONE", Name = "SDCarreras Proceso Services", Code = "sdcarrerasproceso_Services_Execute" },
            new() { Module = "HICONE", Name = "SDCarreras Terminadas Services", Code = "sdcarrerasterminadas_Services_Execute" },
            new() { Module = "HICONE", Name = "SDCarrete Item Services", Code = "sdcarreteitem_Services_Execute" },
            new() { Module = "HICONE", Name = "SDCarrete Molino Services", Code = "sdcarretemolino_Services_Execute" },
            new() { Module = "HICONE", Name = "SDCarretes Carrera", Code = "sdcarretescarrera_Execute" },
            new() { Module = "HICONE", Name = "SDCerrar Extrusion Services", Code = "sdcerrarextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDCerrar Prensado Services", Code = "sdcerrarprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "SDCarreras Proceso BD Services", Code = "sdcheckeocarreras_Services_Execute" },
            new() { Module = "HICONE", Name = "SDConcluir Etiquetado Services", Code = "sdconcluiretiquetado_Services_Execute" },
            new() { Module = "HICONE", Name = "SDInterrupcion En Curso Services", Code = "sdconcluirinterrupcion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDContinuar Proceso Services", Code = "sdcontinuarproceso_Services_Execute" },
            new() { Module = "HICONE", Name = "SDCorregir Pallet Services", Code = "sdcorregirpallet_Services_Execute" },
            new() { Module = "HICONE", Name = "SDCrear Prensa Troquel Services", Code = "sdcrearprensatroquel_Services_Execute" },
            new() { Module = "HICONE", Name = "SDEliminar Notificacion Services", Code = "sdeliminarnotificacion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDEliminar Ref Pallet Services", Code = "sdeliminarrefpallet_Services_Execute" },
            new() { Module = "HICONE", Name = "SDEscanear Bobina Services", Code = "sdescanearbobina_Services_Execute" },
            new() { Module = "HICONE", Name = "SDEscanear Carrete Services", Code = "sdescanearcarrete_Services_Execute" },
            new() { Module = "HICONE", Name = "SDEscanear Pallet Services", Code = "sdescanearpallet_Services_Execute" },
            new() { Module = "HICONE", Name = "SDEtiquetado Operador Services", Code = "sdetiquetadooperador_Services_Execute" },
            new() { Module = "HICONE", Name = "SDEtiquetado Pallet", Code = "sdetiquetadopallet_Execute" },
            new() { Module = "HICONE", Name = "SDEtiquetando Pallet", Code = "sdetiquetandopalletpanel_Execute" },
            new() { Module = "HICONE", Name = "SDEtiquetarCarreteExterno Services", Code = "sdetiquetarcarreteeexterno_Services_Execute" },
            new() { Module = "HICONE", Name = "SDExtrusion Anticipada Services", Code = "sdextrusionanticipada_Services_Execute" },
            new() { Module = "HICONE", Name = "SDExtrusion Ayuda URL Services", Code = "sdextrusionayudaurl_Services_Execute" },
            new() { Module = "HICONE", Name = "SDExtrusion Interrupcion Services", Code = "sdextrusioninterrupcion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDExtrusion Item Services", Code = "sdextrusionitem_Services_Execute" },
            new() { Module = "HICONE", Name = "SDExtrusion Motivo Anticipado Services", Code = "sdextrusionmotivoanticipado_Services_Execute" },
            new() { Module = "HICONE", Name = "SDExtrusion Resultado Services", Code = "sdextrusionresultado_Services_Execute" },
            new() { Module = "HICONE", Name = "SDExtrusion Temporal Services", Code = "sdextrusiontemporal_Services_Execute" },
            new() { Module = "HICONE", Name = "SDExtrusora Bobina Services", Code = "sdextrusorabobina_Services_Execute" },
            new() { Module = "HICONE", Name = "HICONE_SDPrensa Detenida", Code = "sdextrusoradetenida_Execute" },
            new() { Module = "HICONE", Name = "SDPrensa Disponible Services", Code = "sdextrusoradisponible_Services_Execute" },
            new() { Module = "HICONE", Name = "SDExtrusoraMezcladora Services", Code = "sdextrusoramezcladora_Services_Execute" },
            new() { Module = "HICONE", Name = "SDExtrusoraOcupada Services", Code = "sdextrusoraocupada_Services_Execute" },
            new() { Module = "HICONE", Name = "SDFactor Consumo Kg Services", Code = "sdfactorconsumokg_Services_Execute" },
            new() { Module = "HICONE", Name = "SDBobina Molino", Code = "sdgridbobina_Execute" },
            new() { Module = "HICONE", Name = "SDBobina Medicion", Code = "sdgridbobinamediicion_Execute" },
            new() { Module = "HICONE", Name = "SDGrid Bobina Proceso", Code = "sdgridbobinaproceso_Execute" },
            new() { Module = "HICONE", Name = "SDBobina Reposo", Code = "sdgridbobinareposo_Execute" },
            new() { Module = "HICONE", Name = "SDGuardar Carrete Services", Code = "sdguardarcarrete_Services_Execute" },
            new() { Module = "HICONE", Name = "SDGuardar Carrete AMolino Services", Code = "sdguardarcarreteamolino_Services_Execute" },
            new() { Module = "HICONE", Name = "SDInit Extrusion Services", Code = "sdinitextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDInit Prensado Services", Code = "sdinitprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "SDInsumo Prensado", Code = "sdinsumoprensado_Execute" },
            new() { Module = "HICONE", Name = "SDLimpiar Notificaciones Services", Code = "sdlimpiarnotificaciones_Services_Execute" },
            new() { Module = "HICONE", Name = "SDLista Carretes Molido", Code = "sdlistacarretesmolido_Execute" },
            new() { Module = "HICONE", Name = "SDLista Carretes Por Validar", Code = "sdlistacarretesporvalidar_Execute" },
            new() { Module = "HICONE", Name = "SDLista Carretes Validados", Code = "sdlistacarretesvalidados_Execute" },
            new() { Module = "HICONE", Name = "SDListaConEtiqueta", Code = "sdlistaconetiqueta_Execute" },
            new() { Module = "HICONE", Name = "SDEtiquetando Pallet", Code = "sdlistaetiquetando_Execute" },
            new() { Module = "HICONE", Name = "SDLista Etiquetando", Code = "sdlistaetiquetandocarr_Execute" },
            new() { Module = "HICONE", Name = "SDLote Silo Services", Code = "sdlotesilo_Services_Execute" },
            new() { Module = "HICONE", Name = "SDNuevo Producto Services", Code = "sdnuevoproducto_Services_Execute" },
            new() { Module = "HICONE", Name = "SDObtener Tiempo Proceso Services", Code = "sdobtenerntiempoproceso_Services_Execute" },
            new() { Module = "HICONE", Name = "SDOperador DP", Code = "sdoperadordp_Execute" },
            new() { Module = "HICONE", Name = "SDOrden Etiquetado Services", Code = "sdordenetiquetado_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPalets En Ensamble Prensado", Code = "sdpaletsenensambleprensado_Execute" },
            new() { Module = "HICONE", Name = "SDPalets Prensado", Code = "sdpaletsprensado_Execute" },
            new() { Module = "HICONE", Name = "SDPallets Terminado", Code = "sdpaletsterminado_Execute" },
            new() { Module = "HICONE", Name = "SDPallets Terminado Prensado", Code = "sdpaletsterminadoprensado_Execute" },
            new() { Module = "HICONE", Name = "SDPalletEtiquetado Services", Code = "sdpalletetiquetado_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPausar Bobinas Services", Code = "sdpausarbobinas_Services_Execute" },
            new() { Module = "HICONE", Name = "Banner with bottom progress bar", Code = "sdpbannerheaderprogressbottom_Execute" },
            new() { Module = "HICONE", Name = "Banner with top progress bar", Code = "sdpbannerheaderprogresstop_Execute" },
            new() { Module = "HICONE", Name = "Web browser", Code = "sdpbrowser_Execute" },
            new() { Module = "HICONE", Name = "Calendar", Code = "sdpcalendar_Execute" },
            new() { Module = "HICONE", Name = "SDPCalendar Filter Events Services", Code = "sdpcalendarfilterevents_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPCart Address Set Selected Services", Code = "sdpcartaddresssetselected_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPCart Payment Methods Add New Services", Code = "sdpcartpaymentmethodsaddnew_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPCart Payment Methods Set Selected Services", Code = "sdpcartpaymentmethodssetselected_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPCart Products Add Services", Code = "sdpcartproductsadd_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPCart Products Count Services", Code = "sdpcartproductscount_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPCart Products List Services", Code = "sdpcartproductslist_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPCart Products Remove Services", Code = "sdpcartproductsremove_Services_Execute" },
            new() { Module = "HICONE", Name = "Category with levels", Code = "sdpcategorylevelslist_Execute" },
            new() { Module = "HICONE", Name = "Category list", Code = "sdpcategorylist_Execute" },
            new() { Module = "HICONE", Name = "SDPCategory List DP", Code = "sdpcategorylistdp_Execute" },
            new() { Module = "HICONE", Name = "SDPCategory List DP Services", Code = "sdpcategorylistdp_Services_Execute" },
            new() { Module = "HICONE", Name = "Area", Code = "sdpchartarea_Execute" },
            new() { Module = "HICONE", Name = "Area for multiple series", Code = "sdpchartareamultipleseries_Execute" },
            new() { Module = "HICONE", Name = "Area Stacked 100%", Code = "sdpchartareastacked100_Execute" },
            new() { Module = "HICONE", Name = "Area Stacked", Code = "sdpchartareastacked_Execute" },
            new() { Module = "HICONE", Name = "Bars for multiple series", Code = "sdpchartbarmultipleseries_Execute" },
            new() { Module = "HICONE", Name = "Bars", Code = "sdpchartbarsingleseries_Execute" },
            new() { Module = "HICONE", Name = "Bars Stacked 100%", Code = "sdpchartbarstacked100_Execute" },
            new() { Module = "HICONE", Name = "Bars Stacked", Code = "sdpchartbarstacked_Execute" },
            new() { Module = "HICONE", Name = "Columns for multiple series", Code = "sdpchartcolumnmultipleseries_Execute" },
            new() { Module = "HICONE", Name = "Columns", Code = "sdpchartcolumnsingleserie_Execute" },
            new() { Module = "HICONE", Name = "Columns Stacked 100%", Code = "sdpchartcolumnstacked100_Execute" },
            new() { Module = "HICONE", Name = "Columns Stacked", Code = "sdpchartcolumnstacked_Execute" },
            new() { Module = "HICONE", Name = "Lines for multiple series", Code = "sdpchartlinemultiple_Execute" },
            new() { Module = "HICONE", Name = "Lines", Code = "sdpchartlinesingle_Execute" },
            new() { Module = "HICONE", Name = "Lines Stacked 100%", Code = "sdpchartlinestacked100_Execute" },
            new() { Module = "HICONE", Name = "Lines Stacked", Code = "sdpchartlinestacked_Execute" },
            new() { Module = "HICONE", Name = "Pie", Code = "sdpchartpie_Execute" },
            new() { Module = "HICONE", Name = "Points", Code = "sdpchartpoint_Execute" },
            new() { Module = "HICONE", Name = "Points for multiple series", Code = "sdpchartpointmultipleseries_Execute" },
            new() { Module = "HICONE", Name = "Radial Lines", Code = "sdpchartradiallines_Execute" },
            new() { Module = "HICONE", Name = "Radial Lines for multiple series", Code = "sdpchartradiallinesseries_Execute" },
            new() { Module = "HICONE", Name = "Spline", Code = "sdpchartspline_Execute" },
            new() { Module = "HICONE", Name = "Spline Area", Code = "sdpchartsplinearea_Execute" },
            new() { Module = "HICONE", Name = "Spline Area for multiple series", Code = "sdpchartsplineareaseries_Execute" },
            new() { Module = "HICONE", Name = "Spline Area Stacked 100%", Code = "sdpchartsplineareastacked100_Execute" },
            new() { Module = "HICONE", Name = "Spline Area Stacked", Code = "sdpchartsplineareastacked_Execute" },
            new() { Module = "HICONE", Name = "Spline for multiple series", Code = "sdpchartsplineseries_Execute" },
            new() { Module = "HICONE", Name = "Spline Stacked 100%", Code = "sdpchartsplinestacked100_Execute" },
            new() { Module = "HICONE", Name = "Spline Stacked", Code = "sdpchartsplinestacked_Execute" },
            new() { Module = "HICONE", Name = "Step Area", Code = "sdpchartsteparea_Execute" },
            new() { Module = "HICONE", Name = "Step Area for multiple series", Code = "sdpchartstepareaseries_Execute" },
            new() { Module = "HICONE", Name = "Step Lines", Code = "sdpchartsteplines_Execute" },
            new() { Module = "HICONE", Name = "Step Lines for multiple series", Code = "sdpchartsteplinesseries_Execute" },
            new() { Module = "HICONE", Name = "Data display", Code = "sdpdatadisplay_Execute" },
            new() { Module = "HICONE", Name = "Display for banner image", Code = "sdpdatadisplayforbannerimage_Execute" },
            new() { Module = "HICONE", Name = "Display for banner image with subtitle", Code = "sdpdatadisplayforbannerimagewithsubtitle_Execute" },
            new() { Module = "HICONE", Name = "Display for geolocation", Code = "sdpdatadisplayforgeolocation_Execute" },
            new() { Module = "HICONE", Name = "Display for image and description", Code = "sdpdatadisplayforimage_Execute" },
            new() { Module = "HICONE", Name = "Display for image, description and amount", Code = "sdpdatadisplayforimageandamount_Execute" },
            new() { Module = "HICONE", Name = "Profile display", Code = "sdpdatadisplayprofile_Execute" },
            new() { Module = "HICONE", Name = "Display with sections", Code = "sdpdatadisplaysections_Execute" },
            new() { Module = "HICONE", Name = "Display with tabs", Code = "sdpdatadisplaytabs_Execute" },
            new() { Module = "HICONE", Name = "Data edit", Code = "sdpdataedit_Execute" },
            new() { Module = "HICONE", Name = "Edit with header", Code = "sdpdataeditwithheader_Execute" },
            new() { Module = "HICONE", Name = "Edit with sections", Code = "sdpdataeditwithsections_Execute" },
            new() { Module = "HICONE", Name = "SDPerfil Operador", Code = "sdperfiloperador_Execute" },
            new() { Module = "HICONE", Name = "SDPMDFFields To JSON Services", Code = "sdpfieldstojson_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPGet Decimal From Hex Services", Code = "sdpgetdecimalfromhex_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPGet Unicode From Hex Services", Code = "sdpgetunicodefromhex_Services_Execute" },
            new() { Module = "HICONE", Name = "GX Pie", Code = "sdpgxchartpie_Execute" },
            new() { Module = "HICONE", Name = "GX Timeline", Code = "sdpgxcharttimeline_Execute" },
            new() { Module = "HICONE", Name = "GX Timeline for multiple series", Code = "sdpgxcharttimelineseries_Execute" },
            new() { Module = "HICONE", Name = "Banner and Carousel", Code = "sdphomebannerandcarousel_Execute" },
            new() { Module = "HICONE", Name = "Banner and options", Code = "sdphomebannerandoptions_Execute" },
            new() { Module = "HICONE", Name = "Banner and options variant 1", Code = "sdphomebannerandoptionsv1_Execute" },
            new() { Module = "HICONE", Name = "SDPHome Banner DP", Code = "sdphomebannerdp_Execute" },
            new() { Module = "HICONE", Name = "SDPHome Carousel Options DP", Code = "sdphomecarouseloptionsdp_Execute" },
            new() { Module = "HICONE", Name = "Dashboard with indicators", Code = "sdphomedashboard_Execute" },
            new() { Module = "HICONE", Name = "Home empty with banner", Code = "sdphomeemptybanner_Execute" },
            new() { Module = "HICONE", Name = "Home with empty tabs", Code = "sdphomeemptytabs_Execute" },
            new() { Module = "HICONE", Name = "Home with header and list", Code = "sdphomeheaderandlist_Execute" },
            new() { Module = "HICONE", Name = "Home with map locations", Code = "sdphomemap_Execute" },
            new() { Module = "HICONE", Name = "SDPHome Map Locations Filter DP", Code = "sdphomemaplocationsfilterdp_Execute" },
            new() { Module = "HICONE", Name = "SDPHome Sample Map Locations", Code = "sdphomesamplemaplocations_Execute" },
            new() { Module = "HICONE", Name = "Shopping", Code = "sdphomeshopping_Execute" },
            new() { Module = "HICONE", Name = "Statistics", Code = "sdphomestats_Execute" },
            new() { Module = "HICONE", Name = "Image gallery", Code = "sdpimagegallery_Execute" },
            new() { Module = "HICONE", Name = "Image gallery with inline preview", Code = "sdpimagegalleryinline_Execute" },
            new() { Module = "HICONE", Name = "Image gallery fullscreen", Code = "sdpimagegallerypaged_Execute" },
            new() { Module = "HICONE", Name = "Launchpad", Code = "sdplaunchpad_Execute" },
            new() { Module = "HICONE", Name = "SDPLaunchpad DP", Code = "sdplaunchpaddp_Execute" },
            new() { Module = "HICONE", Name = "Cards", Code = "sdplistcards_Execute" },
            new() { Module = "HICONE", Name = "Cards with background image", Code = "sdplistcardsbackimage_Execute" },
            new() { Module = "HICONE", Name = "Cards with background image, variant 1", Code = "sdplistcardsbackimagev1_Execute" },
            new() { Module = "HICONE", Name = "Cards with background image, variant 2", Code = "sdplistcardsbackimagev2_Execute" },
            new() { Module = "HICONE", Name = "Cards with banner image and subtitle", Code = "sdplistcardsbannerimagewithsubtitle_Execute" },
            new() { Module = "HICONE", Name = "Cards with multiple layouts", Code = "sdplistcardsmultiplelayouts_Execute" },
            new() { Module = "HICONE", Name = "Multiple cards in columns", Code = "sdplistcardsmultiplelayoutscolumns_Execute" },
            new() { Module = "HICONE", Name = "Cards Multiple Layouts and Stories", Code = "sdplistcardsmultiplelayoutsstories_Execute" },
            new() { Module = "HICONE", Name = "Horizontal columns", Code = "sdplistcolumns_Execute" },
            new() { Module = "HICONE", Name = "Header detail and list in tabs", Code = "sdplistdetailwithbannerandtabs_Execute" },
            new() { Module = "HICONE", Name = "Followers", Code = "sdplistfollowers_Execute" },
            new() { Module = "HICONE", Name = "Horizontal list with chart", Code = "sdplisthorizontalwithchart_Execute" },
            new() { Module = "HICONE", Name = "Horizontal list with multiple layouts", Code = "sdplisthorizontalwithmultiplelayouts_Execute" },
            new() { Module = "HICONE", Name = "Multiple information", Code = "sdplistinformation_Execute" },
            new() { Module = "HICONE", Name = "Filtered information", Code = "sdplistinformationfiltered_Execute" },
            new() { Module = "HICONE", Name = "Locations list", Code = "sdplistlocations_Execute" },
            new() { Module = "HICONE", Name = "SDPList Locations Set Map Services", Code = "sdplistlocationssetmap_Services_Execute" },
            new() { Module = "HICONE", Name = "Locations list with map header", Code = "sdplistlocationswithmap_Execute" },
            new() { Module = "HICONE", Name = "Postcard with multiple layouts", Code = "sdplistpostal_Execute" },
            new() { Module = "HICONE", Name = "Social Feed", Code = "sdplistsocialfeed_Execute" },
            new() { Module = "HICONE", Name = "Social Feed with Stories", Code = "sdplistsocialfeedwithstories_Execute" },
            new() { Module = "HICONE", Name = "Title", Code = "sdplisttitle_Execute" },
            new() { Module = "HICONE", Name = "Title and subtitle", Code = "sdplisttitlesubtitle_Execute" },
            new() { Module = "HICONE", Name = "Users Cards", Code = "sdplistuserscards_Execute" },
            new() { Module = "HICONE", Name = "Image with title and subtitle", Code = "sdplistwithimage_Execute" },
            new() { Module = "HICONE", Name = "Image and amounts", Code = "sdplistwithimageandamounts_Execute" },
            new() { Module = "HICONE", Name = "Login with background", Code = "sdploginbackimage_Execute" },
            new() { Module = "HICONE", Name = "Login with banner", Code = "sdploginbanner_Execute" },
            new() { Module = "HICONE", Name = "Dark login", Code = "sdplogindark_Execute" },
            new() { Module = "HICONE", Name = "Login with phone number", Code = "sdploginphonenumber_Execute" },
            new() { Module = "HICONE", Name = "Register with phone number", Code = "sdploginregisteraccount_Execute" },
            new() { Module = "HICONE", Name = "Register with user", Code = "sdploginregistergam_Execute" },
            new() { Module = "HICONE", Name = "Register with logo", Code = "sdploginregisterlogo_Execute" },
            new() { Module = "HICONE", Name = "Login", Code = "sdploginsimple1_Execute" },
            new() { Module = "HICONE", Name = "Login with terms and conditions", Code = "sdploginsimple2_Execute" },
            new() { Module = "HICONE", Name = "Login with logo variant 1", Code = "sdploginsimple3_Execute" },
            new() { Module = "HICONE", Name = "Login with logo and background", Code = "sdploginsimple_Execute" },
            new() { Module = "HICONE", Name = "Login with logo", Code = "sdploginsimplelogo_Execute" },
            new() { Module = "HICONE", Name = "Login with register", Code = "sdploginsimplelogoregister_Execute" },
            new() { Module = "HICONE", Name = "Login with transparency", Code = "sdplogintransparency_Execute" },
            new() { Module = "HICONE", Name = "Dark login with transparecies", Code = "sdplogintransparenycdark_Execute" },
            new() { Module = "HICONE", Name = "Map of elements with images", Code = "sdpmapimageslist_Execute" },
            new() { Module = "HICONE", Name = "Map of elements", Code = "sdpmappinlist_Execute" },
            new() { Module = "HICONE", Name = "SDPMDFFields Required Chek Services", Code = "sdpmdffieldsrequiredchek_Services_Execute" },
            new() { Module = "HICONE", Name = "Simple menu", Code = "sdpmenu_Execute" },
            new() { Module = "HICONE", Name = "Dark menu with background image", Code = "sdpmenudarkwithbackground_Execute" },
            new() { Module = "HICONE", Name = "Dark menu with banner", Code = "sdpmenudarkwithbanner_Execute" },
            new() { Module = "HICONE", Name = "Menu Data Provider", Code = "sdpmenudp_Execute" },
            new() { Module = "HICONE", Name = "SDPMenu Info DP", Code = "sdpmenuinfodp_Execute" },
            new() { Module = "HICONE", Name = "Settings menu", Code = "sdpmenusettings_Execute" },
            new() { Module = "HICONE", Name = "SDPMenu Settings DP", Code = "sdpmenusettingsdp_Execute" },
            new() { Module = "HICONE", Name = "Menu with background image", Code = "sdpmenuwithbackground_Execute" },
            new() { Module = "HICONE", Name = "Menu with banner", Code = "sdpmenuwithbanner_Execute" },
            new() { Module = "HICONE", Name = "Menu with Icons", Code = "sdpmenuwithicons_Execute" },
            new() { Module = "HICONE", Name = "Menu with progress", Code = "sdpmenuwithprogress_Execute" },
            new() { Module = "HICONE", Name = "Menu with user", Code = "sdpmenuwithuser_Execute" },
            new() { Module = "HICONE", Name = "Mobile Dynamic Form", Code = "sdpmobiledynamicform_Execute" },
            new() { Module = "HICONE", Name = "Onboarding", Code = "sdponboarding_Execute" },
            new() { Module = "HICONE", Name = "Products list", Code = "sdpproductslist_Execute" },
            new() { Module = "HICONE", Name = "SDPProducts List DP", Code = "sdpproductslistdp_Execute" },
            new() { Module = "HICONE", Name = "SDPrensa Carrera Services", Code = "sdprensacarrera_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPrensado Anticipado Services", Code = "sdprensadoanticipado_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPrensado Ayuda URL Services", Code = "sdprensadoayudaurl_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPrensado Interrupcion Services", Code = "sdprensadointerrupcion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPrensado Item Services", Code = "sdprensadoitem_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPrensado Merma Kg Services", Code = "sdprensadomermakg_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPrensado Motivo Anticipado Services", Code = "sdprensadomotivoanticipado_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPrensado Resultado Services", Code = "sdprensadoresultado_Services_Execute" },
            new() { Module = "HICONE", Name = "sd Prensado TAB3", Code = "sdprensadotab3_Execute" },
            new() { Module = "HICONE", Name = "SDPrensado Temporal Services", Code = "sdprensadotemporal_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPrensa Ocupada Services", Code = "sdprensaocupada_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPrensa Troquel Services", Code = "sdprensatroquel_Services_Execute" },
            new() { Module = "HICONE", Name = "SDProducto Carrera Services", Code = "sdproductocarrera_Services_Execute" },
            new() { Module = "HICONE", Name = "SDProducto Carrete DP", Code = "sdproductocarretedp_Execute" },
            new() { Module = "HICONE", Name = "SDProducto Con Etiqueta DP", Code = "sdproductoconetiquetadp_Execute" },
            new() { Module = "HICONE", Name = "SDProducto DP", Code = "sdproductodp_Execute" },
            new() { Module = "HICONE", Name = "SDProducto Etiquetable DP", Code = "sdproductoetiquetabledp_Execute" },
            new() { Module = "HICONE", Name = "SDProducto Insumo Services", Code = "sdproductoinsumo_Services_Execute" },
            new() { Module = "HICONE", Name = "SDProducto Item Services", Code = "sdproductoitem_Services_Execute" },
            new() { Module = "HICONE", Name = "SDProducto Terminado", Code = "sdproductoterminadodp_Execute" },
            new() { Module = "HICONE", Name = "Sample Chart", Code = "sdpsamplechart_Execute" },
            new() { Module = "HICONE", Name = "SDPSample Chart Data Services", Code = "sdpsamplechartdata_Services_Execute" },
            new() { Module = "HICONE", Name = "Sample screen", Code = "sdpsampleoptionscreen_Execute" },
            new() { Module = "HICONE", Name = "Sample Story", Code = "sdpsamplestory_Execute" },
            new() { Module = "HICONE", Name = "Sample Story List", Code = "sdpsamplestorylist_Execute" },
            new() { Module = "HICONE", Name = "Welcome", Code = "sdpsamplewelcome_Execute" },
            new() { Module = "HICONE", Name = "Signature Pad", Code = "sdpsignaturepad_Execute" },
            new() { Module = "HICONE", Name = "Story", Code = "sdpstory_Execute" },
            new() { Module = "HICONE", Name = "Timeline", Code = "sdptimeline_Execute" },
            new() { Module = "HICONE", Name = "User information", Code = "sdpuserinformation_Execute" },
            new() { Module = "HICONE", Name = "SDPUser Information Sample DP", Code = "sdpuserinformationsampledp_Execute" },
            new() { Module = "HICONE", Name = "SDPWeb Server Session Get Services", Code = "sdpwebserversessionget_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPWeb Server Session Num Get Services", Code = "sdpwebserversessionnumget_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPWeb Server Session Num Set Services", Code = "sdpwebserversessionnumset_Services_Execute" },
            new() { Module = "HICONE", Name = "SDPWeb Server Session Set Services", Code = "sdpwebserversessionset_Services_Execute" },
            new() { Module = "HICONE", Name = "SDRecalibrar Extrusion Services", Code = "sdrecalibrarextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDRecalibrar Producto Services", Code = "sdrecalibrarproducto_Services_Execute" },
            new() { Module = "HICONE", Name = "SDRechazar Bobina Services", Code = "sdrechazarbobina_Services_Execute" },
            new() { Module = "HICONE", Name = "SDResultado Prensado", Code = "sdresultadoprensado_Execute" },
            new() { Module = "HICONE", Name = "SDResultados Extrusion", Code = "sdresultadosextrusion_Execute" },
            new() { Module = "HICONE", Name = "SDResultados Prensado", Code = "sdresultadosprensado_Execute" },
            new() { Module = "HICONE", Name = "SDRetiquetar Pallet Services", Code = "sdretiquetarpallet_Services_Execute" },
            new() { Module = "HICONE", Name = "SDRevertir Bobina Services", Code = "sdrevertirbobina_Services_Execute" },
            new() { Module = "HICONE", Name = "SDRevertir Carrete Services", Code = "sdrevertircarrete_Services_Execute" },
            new() { Module = "HICONE", Name = "SDRevertir Molino Carrete Id Services", Code = "sdrevertirmolinocarreteid_Services_Execute" },
            new() { Module = "HICONE", Name = "SDRevertir Validacion Carrete Id Services", Code = "sdrevertirvalidacioncarreteid_Services_Execute" },
            new() { Module = "HICONE", Name = "SDSleeping Services", Code = "sdsleeping_Services_Execute" },
            new() { Module = "HICONE", Name = "SDTiempo Extrusion Services", Code = "sdtiempoextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "SDTiempo Laboral Services", Code = "sdtiempolaboral_Services_Execute" },
            new() { Module = "HICONE", Name = "SDTiempo Prensado Services", Code = "sdtiempoprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "SDTipo Material Services", Code = "sdtipomaterial_Services_Execute" },
            new() { Module = "HICONE", Name = "SDTolerancia Turno Services", Code = "sdtoleranciaturno_Services_Execute" },
            new() { Module = "HICONE", Name = "SDTroquel Compatible Services", Code = "sdtroquelcompatible_Services_Execute" },
            new() { Module = "HICONE", Name = "SDTroquel Mantenimiento Services", Code = "sdtroquelmantenimiento_Services_Execute" },
            new() { Module = "HICONE", Name = "SDTroquel Selector", Code = "sdtroquelselector_Execute" },
            new() { Module = "HICONE", Name = "SDTurno Activo Services", Code = "sdturnoactivo_Services_Execute" },
            new() { Module = "HICONE", Name = "SDTurno Actual Services", Code = "sdturnoactual_Services_Execute" },
            new() { Module = "HICONE", Name = "SDValidar Carrete", Code = "sdvalidarcarrete_Execute" },
            new() { Module = "HICONE", Name = "SDVersion App", Code = "sdversionapp_Execute" },
            new() { Module = "HICONE", Name = "SDVincular Carrete Services", Code = "sdvincularcarrete_Services_Execute" },
            new() { Module = "HICONE", Name = "SDVincular Carrete Externo", Code = "sdvincularcarreteexterno_Execute" },
            new() { Module = "HICONE", Name = "SDWizardExtrusiones", Code = "sdwizardextrusiones_Execute" },
            new() { Module = "HICONE", Name = "SDWizardPrensados", Code = "sdwizardprensados_Execute" },
            new() { Module = "ReportesHICONE", Name = "Get Advanced Security WWP Functionalities", Code = "secgamgetadvancedsecuritywwpfunctionalities_Execute" },
            new() { Module = "HICONE", Name = "Send Printer Bobina", Code = "sendprinterbobina_Execute" },
            new() { Module = "HICONE", Name = "Send Printer Carrera", Code = "sendprintercarrera_Execute" },
            new() { Module = "HICONE", Name = "Send Printer Carrete", Code = "sendprintercarrete_Execute" },
            new() { Module = "HICONE", Name = "Send Printer Palet", Code = "sendprinterpallet_Execute" },
            new() { Module = "HICONE", Name = "Send Printer Pallet Carretes", Code = "sendprinterpalletcarretes_Execute" },
            new() { Module = "HICONE", Name = "Set Estado Bobina Services", Code = "setestadobobina_Services_Execute" },
            new() { Module = "HICONE", Name = "Set Estado Troquel Services", Code = "setestadocarrera_Services_Execute" },
            new() { Module = "HICONE", Name = "Set Estado Carrete Services", Code = "setestadocarrete_Services_Execute" },
            new() { Module = "HICONE", Name = "Set Estado Extrusion Services", Code = "setestadoextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "Set Estado Prensado Services", Code = "setestadoprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "Set GAM Attribute Services", Code = "setgamattribute_Services_Execute" },
            new() { Module = "HICONE", Name = "Set Palet No Carretes Services", Code = "setpaletnocarretes_Services_Execute" },
            new() { Module = "HICONE", Name = "Sgte Turno Extrusora Services", Code = "sgteturnoextrusora_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Silo Delete", Code = "silo_Delete" },
            new() { Module = "ReportesHICONE", Name = "Silo", Code = "silo_Execute" },
            new() { Module = "ReportesHICONE", Name = "Silo FullControl", Code = "silo_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Silo Insert", Code = "silo_Insert" },
            new() { Module = "ReportesHICONE", Name = "Silo Update", Code = "silo_Update" },
            new() { Module = "HICONE", Name = "Silo DP", Code = "silodp_Execute" },
            new() { Module = "HICONE", Name = "Silo Material DP", Code = "silomaterialdp_Execute" },
            new() { Module = "HICONE", Name = "Select Silo", Code = "siloprompt_Execute" },
            new() { Module = "HICONE", Name = "Silo View", Code = "siloview_Execute" },
            new() { Module = "HICONE", Name = "Silo", Code = "siloww_Execute" },
            new() { Module = "HICONE", Name = "Silo WWGet Filter Data Services", Code = "siloww_Services_Execute" },
            new() { Module = "HICONE", Name = "Sleeping Services", Code = "sleeping_Services_Execute" },
            new() { Module = "HICONE", Name = "WWP_SMS Delete", Code = "sms_Delete" },
            new() { Module = "HICONE", Name = "WWP_SMS", Code = "sms_Execute" },
            new() { Module = "HICONE", Name = "WWP_SMS FullControl", Code = "sms_FullControl" },
            new() { Module = "HICONE", Name = "WWP_SMS Insert", Code = "sms_Insert" },
            new() { Module = "HICONE", Name = "WWP_SMS Update", Code = "sms_Update" },
            new() { Module = "ReportesHICONE", Name = "Statement Of Income Delete", Code = "statementofincome_Delete" },
            new() { Module = "ReportesHICONE", Name = "Statement Of Income", Code = "statementofincome_Execute" },
            new() { Module = "ReportesHICONE", Name = "Statement Of Income FullControl", Code = "statementofincome_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Statement Of Income Insert", Code = "statementofincome_Insert" },
            new() { Module = "ReportesHICONE", Name = "Statement Of Income Update", Code = "statementofincome_Update" },
            new() { Module = "HICONE", Name = "Select Statement Of Income", Code = "statementofincomeprompt_Execute" },
            new() { Module = "HICONE", Name = "Statement Of Income View", Code = "statementofincomeview_Execute" },
            new() { Module = "HICONE", Name = "Statement Of Income", Code = "statementofincomeww_Execute" },
            new() { Module = "HICONE", Name = "Statement Of Income WWGet Filter Data Services", Code = "statementofincomeww_Services_Execute" },
            new() { Module = "HICONE", Name = "Sumario Carrete Formato", Code = "sumariodetalleformato_Execute" },
            new() { Module = "HICONE", Name = "Extrusion", Code = "tablerodirectivoextrusion_Execute" },
            new() { Module = "HICONE", Name = "Tablero Directivo Extrusion Get Filter Data Services", Code = "tablerodirectivoextrusion_Services_Execute" },
            new() { Module = "HICONE", Name = "Prensado", Code = "tablerodirectivoprensado_Execute" },
            new() { Module = "HICONE", Name = "Tablero Directivo Prensado Get Filter Data Services", Code = "tablerodirectivoprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "Terminado Pallet DP", Code = "terminadopalletdp_Execute" },
            new() { Module = "HICONE", Name = "Terminado Pallet DP Services", Code = "terminadopalletdp_Services_Execute" },
            new() { Module = "HICONE", Name = "Terminar Carrera Services", Code = "terminarcarrera_Services_Execute" },
            new() { Module = "HICONE", Name = "SDTerminar Carrera DB Services", Code = "terminarcarreradb_Services_Execute" },
            new() { Module = "HICONE", Name = "Tipo Bobinas DP", Code = "tipobobinasdp_Execute" },
            new() { Module = "HICONE", Name = "Tipo Carrete DP", Code = "tipocarretedp_Execute" },
            new() { Module = "HICONE", Name = "Tipo Carrete DPPor Prensa", Code = "tipocarretedpporprensa_Execute" },
            new() { Module = "HICONE", Name = "Total Palet Prensado Services", Code = "totalpaletprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "Trazabilidad Delete", Code = "trazabilidad_Delete" },
            new() { Module = "HICONE", Name = "Trazabilidad", Code = "trazabilidad_Execute" },
            new() { Module = "HICONE", Name = "Trazabilidad FullControl", Code = "trazabilidad_FullControl" },
            new() { Module = "HICONE", Name = "Trazabilidad Insert", Code = "trazabilidad_Insert" },
            new() { Module = "HICONE", Name = "Trazabilidad Update", Code = "trazabilidad_Update" },
            new() { Module = "HICONE", Name = "Trazabilidad View", Code = "trazabilidadview_Execute" },
            new() { Module = "ReportesHICONE", Name = "Troquel Delete", Code = "troquel_Delete" },
            new() { Module = "ReportesHICONE", Name = "Troquel", Code = "troquel_Execute" },
            new() { Module = "ReportesHICONE", Name = "Troquel FullControl", Code = "troquel_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Troquel Insert", Code = "troquel_Insert" },
            new() { Module = "ReportesHICONE", Name = "Troquel Update", Code = "troquel_Update" },
            new() { Module = "HICONE", Name = "Troquel DP", Code = "troqueldp_Execute" },
            new() { Module = "HICONE", Name = "Select Producto", Code = "troquelproducctoprompt_Execute" },
            new() { Module = "HICONE", Name = "Select Troquel", Code = "troquelprompt_Execute" },
            new() { Module = "HICONE", Name = "Troquel View", Code = "troquelview_Execute" },
            new() { Module = "HICONE", Name = "Troquel Prensa Troquel WCGet Filter Data Services", Code = "troquelview_Services_Execute" },
            new() { Module = "HICONE", Name = "Troquel", Code = "troquelww_Execute" },
            new() { Module = "HICONE", Name = "Troquel WWGet Filter Data Services", Code = "troquelww_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "Turno Delete", Code = "turno_Delete" },
            new() { Module = "ReportesHICONE", Name = "Turno", Code = "turno_Execute" },
            new() { Module = "ReportesHICONE", Name = "Turno FullControl", Code = "turno_FullControl" },
            new() { Module = "ReportesHICONE", Name = "Turno Insert", Code = "turno_Insert" },
            new() { Module = "ReportesHICONE", Name = "Turno Update", Code = "turno_Update" },
            new() { Module = "HICONE", Name = "Turno DP", Code = "turnodp_Execute" },
            new() { Module = "HICONE", Name = "Select Turno", Code = "turnoprompt_Execute" },
            new() { Module = "HICONE", Name = "Turnos Por Semana", Code = "turnosporsemana_Execute" },
            new() { Module = "HICONE", Name = "Turnos Por Semana Extrusoras", Code = "turnosporsemanaextrusoras_Execute" },
            new() { Module = "HICONE", Name = "Turnos Por Semana Prensas", Code = "turnosporsemanaprensas_Execute" },
            new() { Module = "HICONE", Name = "Turno View", Code = "turnoview_Execute" },
            new() { Module = "HICONE", Name = "Turno", Code = "turnoww_Execute" },
            new() { Module = "HICONE", Name = "Turno WWGet Filter Data Services", Code = "turnoww_Services_Execute" },
            new() { Module = "HICONE", Name = "Unit Plan2", Code = "unitplan2_Execute" },
            new() { Module = "HICONE", Name = "Unit Plan", Code = "unitplan_Execute" },
            new() { Module = "HICONE", Name = "Update FTB", Code = "updateftb_Execute" },
            new() { Module = "ReportesHICONE", Name = "User Custom Delete", Code = "usercustomizations_Delete" },
            new() { Module = "ReportesHICONE", Name = "User Custom", Code = "usercustomizations_Execute" },
            new() { Module = "ReportesHICONE", Name = "User Custom FullControl", Code = "usercustomizations_FullControl" },
            new() { Module = "ReportesHICONE", Name = "User Custom Insert", Code = "usercustomizations_Insert" },
            new() { Module = "ReportesHICONE", Name = "User Custom Update", Code = "usercustomizations_Update" },
            new() { Module = "HICONE", Name = "User Profile", Code = "userprofile_Execute" },
            new() { Module = "HICONE", Name = "Validar Bobina Services", Code = "validarbobina_Services_Execute" },
            new() { Module = "HICONE", Name = "Validar Carrera Services", Code = "validarcarrera_Services_Execute" },
            new() { Module = "HICONE", Name = "Validar Medicion Services", Code = "validarmedicion_Services_Execute" },
            new() { Module = "HICONE", Name = "View Configuracion", Code = "viewconfiguracion_Execute" },
            new() { Module = "HICONE", Name = "View Extrusora", Code = "viewextrusora_Execute" },
            new() { Module = "HICONE", Name = "View Extrusora Producto", Code = "viewextrusoraproducto_Execute" },
            new() { Module = "HICONE", Name = "View Inventario", Code = "viewinventario_Execute" },
            new() { Module = "HICONE", Name = "View Operador", Code = "viewoperador_Execute" },
            new() { Module = "HICONE", Name = "View Prensa", Code = "viewprensa_Execute" },
            new() { Module = "HICONE", Name = "View Prensa Producto", Code = "viewprensaproducto_Execute" },
            new() { Module = "HICONE", Name = "View Producto", Code = "viewproducto_Execute" },
            new() { Module = "HICONE", Name = "View Producto Categoria", Code = "viewproductocategoria_Execute" },
            new() { Module = "HICONE", Name = "Bobina", Code = "vwanaliticabobina_Execute" },
            new() { Module = "HICONE", Name = "vw Analitica Bobina Get Filter Data Services", Code = "vwanaliticabobina_Services_Execute" },
            new() { Module = "HICONE", Name = "Carrete", Code = "vwanaliticacarrete_Execute" },
            new() { Module = "HICONE", Name = "vw Analitica Carrete Get Filter Data Services", Code = "vwanaliticacarrete_Services_Execute" },
            new() { Module = "HICONE", Name = "Prensado", Code = "vwanaliticaprensado_Execute" },
            new() { Module = "HICONE", Name = "vw Analitica Prensado Get Filter Data Services", Code = "vwanaliticaprensado_Services_Execute" },
            new() { Module = "HICONE", Name = "vw Carrete Carrera", Code = "vwcarretecarrera_Execute" },
            new() { Module = "HICONE", Name = "Extrusion Resultado", Code = "vwextrusionresultado_Execute" },
            new() { Module = "HICONE", Name = "vw Extrusion Resultado Get Filter Data Services", Code = "vwextrusionresultado_Services_Execute" },
            new() { Module = "HICONE", Name = "Orden Etiquetado", Code = "vwordenetiquetado_Execute" },
            new() { Module = "HICONE", Name = "vw Orden Etiquetado Get Filter Data Services", Code = "vwordenetiquetado_Services_Execute" },
            new() { Module = "HICONE", Name = "Prensado Resultado", Code = "vwprensadoresultado_Execute" },
            new() { Module = "HICONE", Name = "vw Prensado Resultado Get Filter Data Services", Code = "vwprensadoresultado_Services_Execute" },
            new() { Module = "HICONE", Name = "Palet Carrete", Code = "vwtrazabilidad_Execute" },
            new() { Module = "HICONE", Name = "vw Trazabilidad Get Filter Data Services", Code = "vwtrazabilidad_Services_Execute" },
            new() { Module = "HICONE", Name = "WWP_Web Client Delete", Code = "webclient_Delete" },
            new() { Module = "HICONE", Name = "WWP_Web Client", Code = "webclient_Execute" },
            new() { Module = "HICONE", Name = "WWP_Web Client FullControl", Code = "webclient_FullControl" },
            new() { Module = "HICONE", Name = "WWP_Web Client Insert", Code = "webclient_Insert" },
            new() { Module = "HICONE", Name = "WWP_Web Client Update", Code = "webclient_Update" },
            new() { Module = "HICONE", Name = "WWP_Web Notification Delete", Code = "webnotification_Delete" },
            new() { Module = "HICONE", Name = "WWP_Web Notification", Code = "webnotification_Execute" },
            new() { Module = "HICONE", Name = "WWP_Web Notification FullControl", Code = "webnotification_FullControl" },
            new() { Module = "HICONE", Name = "WWP_Web Notification Insert", Code = "webnotification_Insert" },
            new() { Module = "HICONE", Name = "WWP_Web Notification Update", Code = "webnotification_Update" },
            new() { Module = "HICONE", Name = "Existencia", Code = "wpexistenciamain_Execute" },
            new() { Module = "HICONE", Name = "wp Importar Permisos Por Rol", Code = "wpimportarpermisosporrol_Execute" },
            new() { Module = "HICONE", Name = "wp Producto Categorias", Code = "wpproductocategoria_Execute" },
            new() { Module = "HICONE", Name = "Configuracions", Code = "wwconfiguracion_Execute" },
            new() { Module = "HICONE", Name = "Extrusoras", Code = "wwextrusora_Execute" },
            new() { Module = "HICONE", Name = "Extrusora Productoes", Code = "wwextrusoraproducto_Execute" },
            new() { Module = "HICONE", Name = "Inventarios", Code = "wwinventario_Execute" },
            new() { Module = "HICONE", Name = "Operadors", Code = "wwoperador_Execute" },
            new() { Module = "HICONE", Name = "WWP_Automatic Notification Definitions To Load", Code = "wwp_automaticnotificationdefinitionstoload_Execute" },
            new() { Module = "HICONE", Name = "Get Notifications For User", Code = "wwp_getnotificationsforuser_Execute" },
            new() { Module = "HICONE", Name = "WWP_Get Users For Discussion Mentions Services", Code = "wwp_getusersfordiscussionmentions_Services_Execute" },
            new() { Module = "ReportesHICONE", Name = "WWP_Load Tree View Sample Data", Code = "wwp_loadtreeviewsampledata_Execute" },
            new() { Module = "HICONE", Name = "Select Mail Template", Code = "wwp_mailtemplateprompt_Execute" },
            new() { Module = "HICONE", Name = "WWP_Mail Template View", Code = "wwp_mailtemplateview_Execute" },
            new() { Module = "HICONE", Name = "Mail Template", Code = "wwp_mailtemplateww_Execute" },
            new() { Module = "HICONE", Name = "WWP_Mail Template WWGet Filter Data Services", Code = "wwp_mailtemplateww_Services_Execute" },
            new() { Module = "HICONE", Name = "Notification Delete", Code = "wwp_notification_Delete" },
            new() { Module = "HICONE", Name = "Notification", Code = "wwp_notification_Execute" },
            new() { Module = "HICONE", Name = "Notification FullControl", Code = "wwp_notification_FullControl" },
            new() { Module = "HICONE", Name = "Notification Insert", Code = "wwp_notification_Insert" },
            new() { Module = "HICONE", Name = "Notification Update", Code = "wwp_notification_Update" },
            new() { Module = "HICONE", Name = "Search results", Code = "wwp_search_Execute" },
            new() { Module = "HICONE", Name = "Discussion Message Delete", Code = "wwpdiscussionmessage_Delete" },
            new() { Module = "HICONE", Name = "Discussion Message", Code = "wwpdiscussionmessage_Execute" },
            new() { Module = "HICONE", Name = "Discussion Message FullControl", Code = "wwpdiscussionmessage_FullControl" },
            new() { Module = "HICONE", Name = "Discussion Message Insert", Code = "wwpdiscussionmessage_Insert" },
            new() { Module = "HICONE", Name = "Discussion Message Update", Code = "wwpdiscussionmessage_Update" },
            new() { Module = "HICONE", Name = "Discussion Message Mention Delete", Code = "wwpdiscussionmessagemention_Delete" },
            new() { Module = "HICONE", Name = "Discussion Message Mention", Code = "wwpdiscussionmessagemention_Execute" },
            new() { Module = "HICONE", Name = "Discussion Message Mention FullControl", Code = "wwpdiscussionmessagemention_FullControl" },
            new() { Module = "HICONE", Name = "Discussion Message Mention Insert", Code = "wwpdiscussionmessagemention_Insert" },
            new() { Module = "HICONE", Name = "Discussion Message Mention Update", Code = "wwpdiscussionmessagemention_Update" },
            new() { Module = "HICONE", Name = "WWP_Entity Delete", Code = "wwpentity_Delete" },
            new() { Module = "HICONE", Name = "WWP_Entity", Code = "wwpentity_Execute" },
            new() { Module = "HICONE", Name = "WWP_Entity FullControl", Code = "wwpentity_FullControl" },
            new() { Module = "HICONE", Name = "WWP_Entity Insert", Code = "wwpentity_Insert" },
            new() { Module = "HICONE", Name = "WWP_Entity Update", Code = "wwpentity_Update" },
            new() { Module = "HICONE", Name = "Image editor", Code = "wwpimageeditor_Execute" },
            new() { Module = "HICONE", Name = "Mail Delete", Code = "wwpmail_Delete" },
            new() { Module = "HICONE", Name = "Mail", Code = "wwpmail_Execute" },
            new() { Module = "HICONE", Name = "Mail FullControl", Code = "wwpmail_FullControl" },
            new() { Module = "HICONE", Name = "Mail Insert", Code = "wwpmail_Insert" },
            new() { Module = "HICONE", Name = "Mail Update", Code = "wwpmail_Update" },
            new() { Module = "HICONE", Name = "Mail Template Delete", Code = "wwpmailtemplate_Delete" },
            new() { Module = "HICONE", Name = "Mail Template", Code = "wwpmailtemplate_Execute" },
            new() { Module = "HICONE", Name = "Mail Template FullControl", Code = "wwpmailtemplate_FullControl" },
            new() { Module = "HICONE", Name = "Mail Template Insert", Code = "wwpmailtemplate_Insert" },
            new() { Module = "HICONE", Name = "Mail Template Update", Code = "wwpmailtemplate_Update" },
            new() { Module = "HICONE", Name = "NFC Tag scanner", Code = "wwpnfcscan_Execute" },
            new() { Module = "HICONE", Name = "NFC Tag writer", Code = "wwpnfcwrite_Execute" },
            new() { Module = "HICONE", Name = "Notification Definition Delete", Code = "wwpnotificationdefinition_Delete" },
            new() { Module = "HICONE", Name = "Notification Definition", Code = "wwpnotificationdefinition_Execute" },
            new() { Module = "HICONE", Name = "Notification Definition FullControl", Code = "wwpnotificationdefinition_FullControl" },
            new() { Module = "HICONE", Name = "Notification Definition Insert", Code = "wwpnotificationdefinition_Insert" },
            new() { Module = "HICONE", Name = "Notification Definition Update", Code = "wwpnotificationdefinition_Update" },
            new() { Module = "HICONE", Name = "Work With Prensa", Code = "wwprensa_Execute" },
            new() { Module = "HICONE", Name = "Prensa Productoes", Code = "wwprensaproducto_Execute" },
            new() { Module = "HICONE", Name = "Productoes", Code = "wwproducto_Execute" },
            new() { Module = "HICONE", Name = "Producto Categorias", Code = "wwproductocategoria_Execute" },
            new() { Module = "HICONE", Name = "WWP_Subscription Delete", Code = "wwpsubscription_Delete" },
            new() { Module = "HICONE", Name = "WWP_Subscription", Code = "wwpsubscription_Execute" },
            new() { Module = "HICONE", Name = "WWP_Subscription FullControl", Code = "wwpsubscription_FullControl" },
            new() { Module = "HICONE", Name = "WWP_Subscription Insert", Code = "wwpsubscription_Insert" },
            new() { Module = "HICONE", Name = "WWP_Subscription Update", Code = "wwpsubscription_Update" },
            new() { Module = "HICONE", Name = "Manage my Subscriptions", Code = "wwpsubscriptionssettings_Execute" },
            new() { Module = "HICONE", Name = "Manage Role's Subscriptions", Code = "wwpsubscriptionssettingsbyrole_Execute" },
            new() { Module = "HICONE", Name = "Extended User from GAMUser Delete", Code = "wwpuserextended_Delete" },
            new() { Module = "HICONE", Name = "Extended User from GAMUser", Code = "wwpuserextended_Execute" },
            new() { Module = "HICONE", Name = "Extended User from GAMUser FullControl", Code = "wwpuserextended_FullControl" },
            new() { Module = "HICONE", Name = "Extended User from GAMUser Insert", Code = "wwpuserextended_Insert" },
            new() { Module = "HICONE", Name = "Extended User from GAMUser Update", Code = "wwpuserextended_Update" },
            new() { Module = "HICONE", Name = "Visualize all notifications", Code = "wwpvisualizeallnotifications_Execute" },
            new() { Module = "HICONE", Name = "Visualize one notification", Code = "wwpvisualizenotification_Execute" },
            new() { Module = "HICONE", Name = "Wizard with fill gauge", Code = "wwpwizardfillgauge_Execute" },
            new() { Module = "HICONE", Name = "Wizard with step indicator", Code = "wwpwizardpager_Execute" },
            new() { Module = "HICONE", Name = "Wizard Extrusion DP", Code = "wzextrusiondp_Execute" },
            new() { Module = "HICONE", Name = "Wizard Extrusion DP Services", Code = "wzextrusiondp_Services_Execute" },
            new() { Module = "HICONE", Name = "wz Prensado DP", Code = "wzprensadodp_Execute" },
            new() { Module = "HICONE", Name = "wz Prensado DP Services", Code = "wzprensadodp_Services_Execute" },
            new() { Module = "HICONE", Name = "DP Dynamic Combo Box Producto", Code = "dpcbproducto_Execute" },
            new() { Module = "HICONE", Name = "DP Dynamic Combo Box Producto Base", Code = "dpcbproductobase_Execute" },
            new() { Module = "HICONE", Name = "Menu Data Provider", Code = "hiconesdoptionsdp_Execute" },
            new() { Module = "HICONE", Name = "Producción de Prensado", Code = "prensadodeldiacarrera_Execute" },
            new() { Module = "HICONE", Name = "Prensado Del Dia DP", Code = "prensadodeldiadp_Execute" },
            new() { Module = "HICONE", Name = "Prensado Del Dia DP Services", Code = "prensadodeldiadp_Service_Execute" },
            new() { Module = "HICONE", Name = "Prensa DP", Code = "prensadp_Execute" },
            new() { Module = "HICONE", Name = "Columns for multiple series", Code = "sdpchartcolumnsmultipleseries_Execute" }

        };

        foreach (var p in permissions)
        {
            var perm = await _context.Permissions.FirstOrDefaultAsync(x => x.Code == p.Code);
            if (perm == null)
            {
                perm = p;
                _context.Permissions.Add(perm);
                await _context.SaveChangesAsync();
            }
            else if (perm.Module != p.Module)
            {
                perm.Module = p.Module;
                await _context.SaveChangesAsync();
            }

            // Relationship mapping
            if (perm.Module == "GAM Backoffice")
            {
                if (!await _context.SecurityApplicationPermissions.AnyAsync(ap => ap.SecurityApplicationId == appGam.Id && ap.PermissionId == perm.Id))
                    _context.SecurityApplicationPermissions.Add(new SecurityApplicationPermission { SecurityApplicationId = appGam.Id, PermissionId = perm.Id });
            }
            else if (perm.Module == "ReportesHICONE")
            {
                // To Reportes
                if (!await _context.SecurityApplicationPermissions.AnyAsync(ap => ap.SecurityApplicationId == appReportes.Id && ap.PermissionId == perm.Id))
                    _context.SecurityApplicationPermissions.Add(new SecurityApplicationPermission { SecurityApplicationId = appReportes.Id, PermissionId = perm.Id });
                // Also to HICONE and KBS (as they were originally HICONE)
                if (!await _context.SecurityApplicationPermissions.AnyAsync(ap => ap.SecurityApplicationId == appHicone.Id && ap.PermissionId == perm.Id))
                    _context.SecurityApplicationPermissions.Add(new SecurityApplicationPermission { SecurityApplicationId = appHicone.Id, PermissionId = perm.Id });
                if (!await _context.SecurityApplicationPermissions.AnyAsync(ap => ap.SecurityApplicationId == appKbs.Id && ap.PermissionId == perm.Id))
                    _context.SecurityApplicationPermissions.Add(new SecurityApplicationPermission { SecurityApplicationId = appKbs.Id, PermissionId = perm.Id });
            }
            else if (perm.Module == "HICONE")
            {
                if (!await _context.SecurityApplicationPermissions.AnyAsync(ap => ap.SecurityApplicationId == appHicone.Id && ap.PermissionId == perm.Id))
                    _context.SecurityApplicationPermissions.Add(new SecurityApplicationPermission { SecurityApplicationId = appHicone.Id, PermissionId = perm.Id });
                if (!await _context.SecurityApplicationPermissions.AnyAsync(ap => ap.SecurityApplicationId == appKbs.Id && ap.PermissionId == perm.Id))
                    _context.SecurityApplicationPermissions.Add(new SecurityApplicationPermission { SecurityApplicationId = appKbs.Id, PermissionId = perm.Id });
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
                MustChangePassword = false,
                EmailConfirmed = true
            };

            _context.Users.Add(adminUser);
            await _context.SaveChangesAsync(default);

            _context.UserRoles.Add(new UserRole { UserId = adminUser.Id, RoleId = superAdminRole.Id });
            _context.UserTenants.Add(new UserTenant { UserId = adminUser.Id, TenantId = defaultTenantId, IsDefault = true });
        }
        else
        {
            var adminUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == adminEmail);
            if (adminUser != null)
            {
                adminUser.Username = "admin";
                adminUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword("hicone123");
                await _context.SaveChangesAsync(default);
            }
        }

        await _context.SaveChangesAsync(default);

        // Operational Catalogs (Turnos, Operarios, Extrusoras, Prensas, Productos, Troqueles, CausasInterrupcion, Silos)
        if (!await _context.Turnos.AnyAsync())
        {
            _context.Turnos.AddRange(
                new Turno { Nombre = "Matutino", Clave = "1", HoraInicio = new TimeSpan(6, 0, 0), HoraFin = new TimeSpan(14, 0, 0), TenantId = defaultTenantId },
                new Turno { Nombre = "Vespertino", Clave = "2", HoraInicio = new TimeSpan(14, 0, 0), HoraFin = new TimeSpan(22, 0, 0), TenantId = defaultTenantId },
                new Turno { Nombre = "Nocturno", Clave = "3", HoraInicio = new TimeSpan(22, 0, 0), HoraFin = new TimeSpan(6, 0, 0), TenantId = defaultTenantId }
            );

            _context.Operarios.AddRange(
                new Operario { NumeroEmpleado = "OP-001", NombreCompleto = "Juan Producción", Especialidad = "Extrusión", TenantId = defaultTenantId },
                new Operario { NumeroEmpleado = "OP-002", NombreCompleto = "Pedro Prensa", Especialidad = "Prensado", TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        if (!await _context.Extrusoras.AnyAsync())
        {
            var ext1Id = Guid.NewGuid();
            var ext2Id = Guid.NewGuid();

            _context.Extrusoras.AddRange(
                new Extrusora { Id = ext1Id, Codigo = "EXT-01", Nombre = "Extrusora Principal #1", CapacidadKgHora = 150, NumeroEstaciones = 1, Estado = EstadoExtrusora.Disponible, TenantId = defaultTenantId },
                new Extrusora { Id = ext2Id, Codigo = "EXT-02", Nombre = "Extrusora Secundaria #2", CapacidadKgHora = 120, NumeroEstaciones = 1, Estado = EstadoExtrusora.Disponible, TenantId = defaultTenantId }
            );

            _context.Prensas.AddRange(
                new Prensa { Codigo = "PRE-A1", Nombre = "Prensa Hidráulica A1", Estado = EstadoPrensa.Disponible, TenantId = defaultTenantId },
                new Prensa { Codigo = "PRE-B2", Nombre = "Prensa Hidráulica B2", Estado = EstadoPrensa.Disponible, TenantId = defaultTenantId }
            );

            // Seeding legacy Maquinas with identical Guids for FK compatibility
            _context.Maquinas.AddRange(
                new Maquina { Id = ext1Id, Codigo = "EXT-01", Nombre = "Extrusora Principal #1", Tipo = "Extrusora", Estado = "Disponible", TenantId = defaultTenantId },
                new Maquina { Id = ext2Id, Codigo = "EXT-02", Nombre = "Extrusora Secundaria #2", Tipo = "Extrusora", Estado = "Disponible", TenantId = defaultTenantId }
            );

            await _context.SaveChangesAsync(default);
        }

        if (!await _context.Productos.AnyAsync())
        {
            var cat1 = new ProductoCategoria { Nombre = "Bobinas de Empaque", TenantId = defaultTenantId };
            _context.ProductoCategorias.Add(cat1);
            await _context.SaveChangesAsync(default);

            var prod1 = new Producto 
            { 
                Codigo = "BOB-4-STD", 
                Nombre = "Bobina 4\" Estándar", 
                Calibre = 0.05m, 
                Ancho = 100, 
                Longitud = 1000, 
                CategoriaId = cat1.Id, 
                TenantId = defaultTenantId 
            };
            var prod2 = new Producto 
            { 
                Codigo = "BOB-6-PREM", 
                Nombre = "Bobina 6\" Premium", 
                Calibre = 0.08m, 
                Ancho = 150, 
                Longitud = 800, 
                CategoriaId = cat1.Id, 
                TenantId = defaultTenantId 
            };
            _context.Productos.AddRange(prod1, prod2);
            await _context.SaveChangesAsync(default);
        }

        if (!await _context.Troqueles.AnyAsync())
        {
            _context.Troqueles.AddRange(
                new Troquel { Codigo = "TRQ-001", Nombre = "Troquel 12 Cavidades", Estado = EstadoTroquel.Disponible, TenantId = defaultTenantId },
                new Troquel { Codigo = "TRQ-002", Nombre = "Troquel 24 Cavidades High-Speed", Estado = EstadoTroquel.Disponible, TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        if (!await _context.CausasInterrupcion.AnyAsync())
        {
            _context.CausasInterrupcion.AddRange(
                new CausaInterrupcion { Codigo = "P-MECC", Descripcion = "Falla Mecánica", Tipo = "Mecánica", TenantId = defaultTenantId },
                new CausaInterrupcion { Codigo = "P-MAT", Descripcion = "Falta de Material", Tipo = "Suministro", TenantId = defaultTenantId },
                new CausaInterrupcion { Codigo = "P-OPER", Descripcion = "Cambio de Turno / Operador", Tipo = "Operación", TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        if (!await _context.Silos.AnyAsync())
        {
            _context.Silos.AddRange(
                new Silo 
                { 
                    Codigo = "SILO-01", 
                    Nombre = "Silo Principal Virgen", 
                    CapacidadMaxima = 50000, 
                    ExistenciaActual = 25000, 
                    Estado = "Operativo", 
                    EstadoMaterial = "Virgen (pelet)", 
                    TipoMaterial = "PCR", 
                    KgMinimo = 5000, 
                    KgMaximo = 50000, 
                    Ubicacion = "N/A",
                    TenantId = defaultTenantId 
                },
                new Silo 
                { 
                    Codigo = "SILO-02", 
                    Nombre = "Silo Molido Interno", 
                    CapacidadMaxima = 20000, 
                    ExistenciaActual = 4500, 
                    Estado = "Operativo", 
                    EstadoMaterial = "Molido", 
                    TipoMaterial = "PCR", 
                    KgMinimo = 2000, 
                    KgMaximo = 20000, 
                    Ubicacion = "N/A",
                    TenantId = defaultTenantId 
                }
            );
            await _context.SaveChangesAsync(default);
        }

        if (!await _context.ExtrusoraProductos.AnyAsync())
        {
            var extrusoras = await _context.Extrusoras.ToListAsync();
            var productos = await _context.Productos.ToListAsync();
            if (extrusoras.Any() && productos.Any())
            {
                _context.ExtrusoraProductos.AddRange(
                    new ExtrusoraProducto 
                    { 
                        ExtrusoraId = extrusoras[0].Id, 
                        ProductoId = productos[0].Id, 
                        DefaultCalibre = 0.015m, 
                        DefaultAncho = 2315m, // 2315/16 style width or numeric
                        DefaultLongitud = 17950, 
                        DefaultMinutosReposo = 720, 
                        TenantId = defaultTenantId 
                    },
                    new ExtrusoraProducto 
                    { 
                        ExtrusoraId = extrusoras[0].Id, 
                        ProductoId = productos[1].Id, 
                        DefaultCalibre = 0.013m, 
                        DefaultAncho = 2315m, 
                        DefaultLongitud = 19400, 
                        DefaultMinutosReposo = 1440, 
                        TenantId = defaultTenantId 
                    },
                    new ExtrusoraProducto 
                    { 
                        ExtrusoraId = extrusoras[1].Id, 
                        ProductoId = productos[0].Id, 
                        DefaultCalibre = 0.015m, 
                        DefaultAncho = 2315m, 
                        DefaultLongitud = 8750, 
                        DefaultMinutosReposo = 720, 
                        TenantId = defaultTenantId 
                    }
                );
                await _context.SaveChangesAsync(default);
            }
        }

        if (!await _context.Extrusiones.AnyAsync())
        {
            var extrusoras = await _context.Extrusoras.ToListAsync();
            var turnos = await _context.Turnos.ToListAsync();
            var operarios = await _context.Operarios.ToListAsync();
            var productos = await _context.Productos.ToListAsync();
            var causas = await _context.CausasInterrupcion.ToListAsync();

            if (extrusoras.Any() && turnos.Any() && operarios.Any() && productos.Any())
            {
                var ext1 = new Extrusion
                {
                    Id = Guid.NewGuid(),
                    Codigo = "EXT-2026-001",
                    Fecha = DateTime.UtcNow.AddDays(-2).Date,
                    FechaInicio = DateTime.UtcNow.AddDays(-2).AddHours(-8),
                    FechaFin = DateTime.UtcNow.AddDays(-2),
                    Estado = EstadoExtrusion.Finalizada,
                    ExtrusoraId = extrusoras[0].Id,
                    TurnoId = turnos[0].Id,
                    OperarioId = operarios[0].Id,
                    ProductoId = productos[0].Id,
                    Calibre = 0.05m,
                    Ancho = 100,
                    Longitud = 1000,
                    MetaKg = 500,
                    VirgenKg = 400,
                    MolidoKg = 100,
                    LoteSilo = "L-SILO-001",
                    LotePaqueteAditivos = "CCP-07A-164040 L",
                    ExtrusionIdLegacy = 24470,
                    Producido = 44.3m,
                    TiempoInterrupcionMin = 22,
                    TenantId = defaultTenantId
                };

                var ext2 = new Extrusion
                {
                    Id = Guid.NewGuid(),
                    Codigo = "EXT-2026-002",
                    Fecha = DateTime.UtcNow.AddDays(-1).Date,
                    FechaInicio = DateTime.UtcNow.AddDays(-1).AddHours(-4),
                    FechaFin = DateTime.UtcNow.AddDays(-1),
                    Estado = EstadoExtrusion.Finalizada,
                    ExtrusoraId = extrusoras[0].Id,
                    TurnoId = turnos[1].Id,
                    OperarioId = operarios[1].Id,
                    ProductoId = productos[1].Id,
                    Calibre = 0.08m,
                    Ancho = 150,
                    Longitud = 800,
                    MetaKg = 600,
                    VirgenKg = 500,
                    MolidoKg = 100,
                    LoteSilo = "L-SILO-002",
                    LotePaqueteAditivos = "CCP-07B-239483 L",
                    ExtrusionIdLegacy = 24405,
                    Producido = 0,
                    TenantId = defaultTenantId
                };

                _context.Extrusiones.AddRange(ext1, ext2);
                await _context.SaveChangesAsync(default);

                // Bobinas para ext1
                var bobina1 = new Bobina
                {
                    Id = Guid.NewGuid(),
                    ExtrusionId = ext1.Id,
                    Station = "A",
                    BobbinNo = 1,
                    SerialNo = "S-24470-A1",
                    Kg = 22.5m,
                    ScrapKg = 1.2m,
                    Thickness = 0.051m,
                    Observations = "Bobina normal A",
                    Codigo = "B-24470-A1",
                    TenantId = defaultTenantId
                };
                var bobina2 = new Bobina
                {
                    Id = Guid.NewGuid(),
                    ExtrusionId = ext1.Id,
                    Station = "B",
                    BobbinNo = 1,
                    SerialNo = "S-24470-B1",
                    Kg = 21.8m,
                    ScrapKg = 0.8m,
                    Thickness = 0.049m,
                    Observations = "Bobina normal B",
                    Codigo = "B-24470-B1",
                    TenantId = defaultTenantId
                };
                _context.Bobinas.AddRange(bobina1, bobina2);

                // Interrupciones para ext1
                if (causas.Any())
                {
                    var interrupcion = new ExtrusionInterrupcion
                    {
                        Id = Guid.NewGuid(),
                        ExtrusionId = ext1.Id,
                        CausaId = causas[0].Id,
                        HoraInicio = DateTime.UtcNow.AddDays(-2).AddHours(-6),
                        HoraFin = DateTime.UtcNow.AddDays(-2).AddHours(-6).AddMinutes(22),
                        Concluida = true,
                        Descripcion = "Ajuste de rodillos de arrastre",
                        TenantId = defaultTenantId
                    };
                    _context.ExtrusionInterrupciones.Add(interrupcion);
                }

                await _context.SaveChangesAsync(default);
            }
        }

        // Asegurar tres datos de prueba temporales para extrusiones
        var testCode1 = "TEST-EXT-01";
        var testCode2 = "TEST-EXT-02";
        var testCode3 = "TEST-EXT-03";
        if (!await _context.Extrusiones.AnyAsync(e => e.Codigo == testCode1 || e.Codigo == testCode2 || e.Codigo == testCode3))
        {
            var extrusoras = await _context.Extrusoras.ToListAsync();
            var turnos = await _context.Turnos.ToListAsync();
            var operarios = await _context.Operarios.ToListAsync();
            var productos = await _context.Productos.ToListAsync();
            if (extrusoras.Any() && turnos.Any() && operarios.Any() && productos.Any())
            {
                var t1 = new Extrusion
                {
                    Id = Guid.NewGuid(),
                    Codigo = testCode1,
                    Fecha = DateTime.UtcNow.Date,
                    FechaInicio = DateTime.UtcNow.AddHours(-2),
                    Estado = EstadoExtrusion.EnProceso,
                    ExtrusoraId = extrusoras[0].Id,
                    TurnoId = turnos[0].Id,
                    OperarioId = operarios[0].Id,
                    ProductoId = productos[0].Id,
                    Calibre = 0.12m,
                    Ancho = 800,
                    Longitud = 2000,
                    MetaKg = 1000,
                    VirgenKg = 800,
                    MolidoKg = 200,
                    LoteSilo = "LOTE-VIRGEN-TEST-01",
                    LotePaqueteAditivos = "AD-TEST-01",
                    TenantId = defaultTenantId
                };
                var t2 = new Extrusion
                {
                    Id = Guid.NewGuid(),
                    Codigo = testCode2,
                    Fecha = DateTime.UtcNow.Date,
                    FechaInicio = DateTime.UtcNow.AddHours(-5),
                    Estado = EstadoExtrusion.Programada,
                    ExtrusoraId = extrusoras.Count > 1 ? extrusoras[1].Id : extrusoras[0].Id,
                    TurnoId = turnos.Count > 1 ? turnos[1].Id : turnos[0].Id,
                    OperarioId = operarios.Count > 1 ? operarios[1].Id : operarios[0].Id,
                    ProductoId = productos.Count > 1 ? productos[1].Id : productos[0].Id,
                    Calibre = 0.08m,
                    Ancho = 600,
                    Longitud = 1500,
                    MetaKg = 800,
                    VirgenKg = 700,
                    MolidoKg = 100,
                    LoteSilo = "LOTE-VIRGEN-TEST-02",
                    LotePaqueteAditivos = "AD-TEST-02",
                    TenantId = defaultTenantId
                };
                var t3 = new Extrusion
                {
                    Id = Guid.NewGuid(),
                    Codigo = testCode3,
                    Fecha = DateTime.UtcNow.Date,
                    FechaInicio = DateTime.UtcNow.AddHours(-10),
                    FechaFin = DateTime.UtcNow.AddHours(-2),
                    Estado = EstadoExtrusion.Finalizada,
                    ExtrusoraId = extrusoras.Count > 2 ? extrusoras[2].Id : extrusoras[0].Id,
                    TurnoId = turnos.Count > 2 ? turnos[2].Id : turnos[0].Id,
                    OperarioId = operarios.Count > 2 ? operarios[2].Id : operarios[0].Id,
                    ProductoId = productos.Count > 2 ? productos[2].Id : productos[0].Id,
                    Calibre = 0.15m,
                    Ancho = 1000,
                    Longitud = 3000,
                    MetaKg = 1500,
                    VirgenKg = 1200,
                    MolidoKg = 300,
                    LoteSilo = "LOTE-VIRGEN-TEST-03",
                    LotePaqueteAditivos = "AD-TEST-03",
                    TenantId = defaultTenantId
                };
                _context.Extrusiones.AddRange(t1, t2, t3);
                await _context.SaveChangesAsync(default);
            }
        }
    }
}
