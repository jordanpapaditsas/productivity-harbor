using FluentValidation;
using ProductivityHarborApi.Core.Dto.Auth;
using ProductivityHarborApi.Extensions;

namespace ProductivityHarborApi.Core.Utils.CustomValidators
{
    public class PasswordValidator: AbstractValidator<RegisterDto>
    {
        public PasswordValidator() 
        {
            RuleFor(x => x.Password).Password();
        }
    }
}
