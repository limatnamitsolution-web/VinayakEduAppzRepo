using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading;
using System.Threading.Tasks;
using VLimat.Eduz.Domain.Features.Masters;
using VLimat.Eduz.Domain.Repositories;
using VLimat.Eduz.Infrastructure.Persistence;

namespace VLimat.Eduz.Infrastructure.Features.MasterConfigs.Repositories
{
    public class EfMasterConfigRepository : IMasterConfigRepository
    {
        private readonly ApplicationDbContext _db;

        public EfMasterConfigRepository(ApplicationDbContext db) => _db = db;

        public async Task<MasterConfig?> GetByConfigurationAsync(int academicId, string Configuration, CancellationToken cancellationToken = default)
        {
            return await _db.MasterConfigs
                .FirstOrDefaultAsync(m => m.AcademicId == academicId && m.Configuration == Configuration, cancellationToken);
        }
        public async Task<IEnumerable<MasterConfig?>> GetAllByConfigurationAsync(int academicId, string Configuration, CancellationToken cancellationToken = default)
        {
            return await _db.MasterConfigs
                .Where(m => m.AcademicId == academicId && m.Configuration == Configuration && m.IsActive)
                .OrderBy(m => m.SortOrder)
                .ToListAsync(cancellationToken);
        }

        public async Task<MasterConfig> AddAsync(MasterConfig entity, CancellationToken cancellationToken = default)
        {
            _db.MasterConfigs.Add(entity);
            await _db.SaveChangesAsync(cancellationToken);
            return entity;
        }

        public async Task UpdateAsync(MasterConfig entity, CancellationToken cancellationToken = default)
        {
            _db.MasterConfigs.Update(entity);
            await _db.SaveChangesAsync(cancellationToken);
        }

       
    }
}