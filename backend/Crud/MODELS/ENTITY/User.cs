namespace Crud.MODELS.ENTITY
{
	public class User
	{
		public int Id { get; set; }
		public string Username { get; set; } = string.Empty;
		public string PasswordHash { get; set; } = string.Empty; // Store hashed, never plain text!
		public string Role { get; set; } = "User"; // e.g., "Supervisor" or "User"
	}

	public class UserDto
	{
		public string Username { get; set; } = string.Empty;
		public string Password { get; set; } = string.Empty;
	}

}
