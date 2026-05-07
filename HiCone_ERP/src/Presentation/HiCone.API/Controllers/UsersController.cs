using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

[Authorize] // Only authenticated users
[ApiController]
[Route("api/v1/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public UsersController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users
            .Select(u => new {
                u.Id,
                u.Email,
                u.FirstName,
                u.LastName,
                u.IsActive,
                u.IsBlocked,
                u.CompanyId,
                u.LastLoginAt
            })
            .ToListAsync();
        
        return Ok(users);
    }

    [HttpPost("{id}/toggle-block")]
    public async Task<IActionResult> ToggleBlock(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        user.IsBlocked = !user.IsBlocked;
        await _context.SaveChangesAsync(default);
        
        return Ok(new { user.IsBlocked });
    }
}
