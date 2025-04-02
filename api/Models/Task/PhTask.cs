using ProductivityHarborApi.Models.Shared;

namespace ProductivityHarborApi.Models.Task
{
    public class PhTask : PhBaseModel
    {
        public PhTask()
        {
            Id = Guid.NewGuid();
            Status = new Status();
        }
        public Guid Id { get; set; }
        public int SerialNumber { get; set; }
        public  Guid StatusId { get; set; }
        public  Status Status { get; set; } = new Status();
    }
}
