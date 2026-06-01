namespace ProductivityHarborApi.Core.Dto.Shared
{
    public class ApiResponseDto
    {
        public object? Data { get; set; }
        public List<string> Messages { get; set; } = new List<string>();
        public string? Message { get; set; }
        public string? Error { get; set; }
        public bool? IsSuccess { get; set; }
        public int? StatusCode { get; set; }
    }
}
