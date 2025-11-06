using System.Threading;
using System.Threading.Tasks;
using VLimat.Eduz.Domain.Features.Masters;

namespace VLimat.Eduz.Domain.Repositories
{
    public interface IMasterConfigRepository
    {
        Task<MasterConfig?> GetByConfigurationAsync(int academicId, string configKey, CancellationToken cancellationToken = default);
        Task<IEnumerable<MasterConfig?>> GetAllByConfigurationAsync(int academicId, string configKey, CancellationToken cancellationToken = default);
        Task<MasterConfig> AddAsync(MasterConfig entity, CancellationToken cancellationToken = default);
        Task UpdateAsync(MasterConfig entity, CancellationToken cancellationToken = default);
    }
}