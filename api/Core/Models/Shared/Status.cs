using System.ComponentModel.DataAnnotations.Schema;
using ProductivityHarborApi.Core.Models.Task;

namespace ProductivityHarborApi.Core.Models.Shared
{
    [Table("productivityharbor_statuses")]
    public class Status : PhBaseModel
    {
        public Status() 
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Color { get; set; }
        public string? Priority { get; set; }

        public ICollection<PhTask> PhTasks { get; set; } = new HashSet<PhTask>();
    }
}
