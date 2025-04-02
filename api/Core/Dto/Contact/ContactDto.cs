using ProductivityHarborApi.Core.Enums.Contact;

namespace ProductivityHarborApi.Core.Dto.Contact
{
    public class ContactDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public string? Email { get; set; }
        public string? Phone1 { get; set; }
        public string? Phone2 { get; set; }
        public string? Phone3 { get; set; }
        public ContactTypeEnum ContactType { get; set; }
        public StageStatusEnum? StageStatus { get; set; }
        public virtual DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
        public virtual Guid? CreatedByUserId { get; set; }
        public virtual DateTimeOffset? UpdatedAt { get; set; }
        public virtual Guid? UpdatedByUserId { get; set; }
    }
}
