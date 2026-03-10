using Crud.DATA;
using Crud.MODELS.ENTITY;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
	private readonly ApplicationDbContext _context;
	private readonly IConfiguration _configuration;

	public AuthController(ApplicationDbContext context, IConfiguration configuration)
	{
		_context = context;
		_configuration = configuration;
	}

	[HttpPost("signup")]
	public async Task<IActionResult> Signup(UserDto request)
	{
		if (await _context.Users.AnyAsync(u => u.Username == request.Username))
			return BadRequest("User already exists.");

		var user = new User
		{
			Username = request.Username,
			PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
		};

		_context.Users.Add(user);
		await _context.SaveChangesAsync();
		return Ok(new { message = "Signup successful!" });
	}

	[HttpPost("login")]
	public async Task<IActionResult> Login(UserDto request)
	{
		var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

		if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
			return BadRequest("Invalid username or password.");

		var token = CreateToken(user);
		return Ok(new { token, username = user.Username, role = user.Role });
	}

	private string CreateToken(User user)
	{
		var claims = new List<Claim> {
			new Claim(ClaimTypes.Name, user.Username),
			new Claim(ClaimTypes.Role, user.Role)
		};
		var tokenKey = _configuration.GetValue<string>("AppSettings:Token");

		if (string.IsNullOrEmpty(tokenKey))
		{
			throw new Exception("JWT Token key is missing from appsettings.json!");
		}

		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

		//var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));
		var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

		var token = new JwtSecurityToken(
			claims: claims,
			expires: DateTime.Now.AddDays(1),
			signingCredentials: creds
		);

		return new JwtSecurityTokenHandler().WriteToken(token);
	}
}