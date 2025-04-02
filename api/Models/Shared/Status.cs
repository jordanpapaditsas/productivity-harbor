using System.ComponentModel.DataAnnotations.Schema;
using ProductivityHarborApi.Models.Task;

namespace ProductivityHarborApi.Models.Shared
{
    [Table("productivityharbor_statuses")]
    public class Status : PhBaseModel
    {
        public Status() 
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Color { get; set; } = string.Empty;
        public string? Priority { get; set; }

        public ICollection<PhTask> PhTasks { get; set; } = new HashSet<PhTask>();
    }
}
