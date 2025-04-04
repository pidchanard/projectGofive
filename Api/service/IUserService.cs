namespace Api.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> SearchUsersAsync(string? keyword);
        Task SaveSearchAsync(SaveSearchRequest request);
        Task<IEnumerable<UserDto>> FilterUsersAsync(FilterRequest request);
    }
}
