using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace MyAngularProject.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly JwtHandler _jwtHandler;

    public AccountController(JwtHandler jwtHandler) 
    {
        _jwtHandler = jwtHandler;
    }
   [HttpPost("Login")]       
   public async Task<IActionResult> Login([FromBody] UserForAuthentication userForAuthentication)
    {
        if (userForAuthentication.Email == "samet" && userForAuthentication.Password=="123456")
        {
            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(userForAuthentication.Email);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new AuthResponse { IsAuthSuccessful = true, Token = token });
        }
        else
            return Unauthorized(new AuthResponse { ErrorMessage = "Invalid Authentication" });
        
    }
}
