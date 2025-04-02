using System.ComponentModel.DataAnnotations.Schema;
using ProductivityHarborApi.Core.Enums.Contact;

namespace ProductivityHarborApi.Models.Contact
{
    [Table("productivityharbor_contacts")]
    public class Contact : PhBaseModel
    {
        public Contact() 
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string? Email { get; set; }
        public string? Phone1 { get; set; }
        public string? Phone2 { get; set; }
        public string? Phone3 { get; set; }
        public ContactTypeEnum ContactType { get; set; }
        public StageStatusEnum? StageStatus { get; set; }
  
    }
}
