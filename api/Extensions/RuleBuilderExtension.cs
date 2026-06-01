using FluentValidation;

namespace ProductivityHarborApi.Extensions
{
    public static class RuleBuilderExtension
    {
        public static void Password<T>(this IRuleBuilder<T, string> ruleBuilder, int minLength = 10)
        {
            ruleBuilder.Matches(expression: "[a-z]")
                       .WithMessage("Password needs to have at least one lowercase character.");
            ruleBuilder.Matches(expression: "[A-Z]")
                       .WithMessage("Password needs to have at least one uppercase character.");
            ruleBuilder.Matches(expression: "[0-9]")
                       .WithMessage("Password needs to have at least one numeric character.");
            ruleBuilder.Matches(expression: "[^a-zA-Z0-9]")
                       .WithMessage("Password needs to have at least one special character: #!@$%^&*(.");
            ruleBuilder.MinimumLength(minLength)
                       .WithMessage("Password cannot be less than 10 characters.");
        }
    }
}
