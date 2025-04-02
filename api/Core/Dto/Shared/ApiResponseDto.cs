namespace ProductivityHarborApi.Core.Dto.Shared
{
    public class ApiResponseDto
    {
        public object? Data { get; set; }
        public string? Message { get; set; }
        public string? Error { get; set; }
        public bool? IsSuccess { get; set; }
        public string? StatusCode { get; set; }
    }
}
