using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using VLimat.Eduz.Domain.Features.Masters;
using VLimat.Eduz.Domain.Repositories;
using VLimat.Eduz.Infrastructure.Persistence;
using VLimat.Eduz.Domain.Security;

namespace VLimat.Eduz.Infrastructure.Features.MasterConfigs.Repositories
{
    public class MasterConfigRepository : IMasterConfigRepository
    {
        private readonly DapperDbContext _db;
        private readonly IDapperUnitOfWork _uow;
        private readonly ICurrentUser _currentUser;

        public MasterConfigRepository(DapperDbContext db, IDapperUnitOfWork uow, ICurrentUser currentUser)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
            _uow = uow ?? throw new ArgumentNullException(nameof(uow));
            _currentUser = currentUser ?? throw new ArgumentNullException(nameof(currentUser));
        }

        public async Task<MasterConfig?> GetAsync(int Id, CancellationToken cancellationToken = default)
        {
            const string sp = "mst.usp_vklmt_MasterConfigs_GetById";

            if (_uow.Transaction != null)
            {
                var result = await _uow.Connection.QueryFirstOrDefaultAsync<MasterConfig>(
                    new CommandDefinition(sp, new { Id }, _uow.Transaction, commandType: CommandType.StoredProcedure, cancellationToken: cancellationToken));
                return result;
            }

            using var conn = await _db.CreateOpenConnectionAsync(cancellationToken).ConfigureAwait(false);
            return await conn.QueryFirstOrDefaultAsync<MasterConfig>(
                new CommandDefinition(sp, new { Id }, commandType: CommandType.StoredProcedure, cancellationToken: cancellationToken));
        }

        public async Task<IEnumerable<MasterConfig?>> GetAllAsync(int academicId, string configuration, CancellationToken cancellationToken = default)
        {
            const string sp = "mst.usp_vklmt_MasterConfigs_GetByAcademicAndConfiguration";

            if (_uow.Transaction != null)
            {
                var results = await _uow.Connection.QueryAsync<MasterConfig>(
                    new CommandDefinition(sp, new { AcademicId = _currentUser.AcademicId, Configuration = configuration }, _uow.Transaction, commandType: CommandType.StoredProcedure, cancellationToken: cancellationToken));
                return results.Cast<MasterConfig?>().ToList();
            }

            using var conn = await _db.CreateOpenConnectionAsync(cancellationToken).ConfigureAwait(false);
            var list = await conn.QueryAsync<MasterConfig>(
                new CommandDefinition(sp, new { AcademicId = _currentUser.AcademicId, Configuration = configuration }, commandType: CommandType.StoredProcedure, cancellationToken: cancellationToken));
            return list.Cast<MasterConfig?>().ToList();
        }

        public async Task<MasterConfig> AddAsync(MasterConfig entity, CancellationToken cancellationToken = default)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            const string sp = "mst.usp_vklmt_MasterConfigs_Insert";

            var startedLocal = false;
            try
            {
                if (_uow.Transaction == null)
                {
                    await _uow.BeginAsync(cancellationToken).ConfigureAwait(false);
                    startedLocal = true;
                }

                // Stored proc returns NewId via final SELECT CAST(SCOPE_IDENTITY() AS INT)
                var id = await _uow.Connection.QuerySingleAsync<int>(
                    new CommandDefinition(sp, new
                    {
                        AcademicId = _currentUser.AcademicId,
                        Configuration = entity.Configuration,
                        ConfigKey = entity.ConfigKey,
                        ConfigValue = entity.ConfigValue,
                        Description = entity.Description,
                        SortOrder = entity.SortOrder,
                        AC_Yr = entity.AC_Yr,
                        IsActive = entity.IsActive,
                        CreatedDate = entity.CreatedDate,
                        CreatedBy = entity.CreatedBy,
                        ModifiedDate = entity.ModifiedDate,
                        ModifiedBy = entity.ModifiedBy
                    }, _uow.Transaction, commandType: CommandType.StoredProcedure, cancellationToken: cancellationToken)).ConfigureAwait(false);

                entity.Id = id;

                if (startedLocal)
                {
                    await _uow.CommitAsync(cancellationToken).ConfigureAwait(false);
                }

                return entity;
            }
            catch
            {
                if (startedLocal)
                {
                    try { await _uow.RollbackAsync(cancellationToken).ConfigureAwait(false); } catch { }
                }
                throw;
            }
        }

        public async Task UpdateAsync(MasterConfig entity, CancellationToken cancellationToken = default)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            const string sp = "mst.usp_vklmt_MasterConfigs_Update";

            var startedLocal = false;
            try
            {
                if (_uow.Transaction == null)
                {
                    await _uow.BeginAsync(cancellationToken).ConfigureAwait(false);
                    startedLocal = true;
                }

                await _uow.Connection.ExecuteAsync(
                    new CommandDefinition(sp, new
                    {
                        Id = entity.Id,
                        AcademicId = _currentUser.AcademicId,
                        Configuration = entity.Configuration,
                        ConfigKey = entity.ConfigKey,
                        ConfigValue = entity.ConfigValue,
                        Description = entity.Description,
                        SortOrder = entity.SortOrder,
                        AC_Yr = entity.AC_Yr,
                        IsActive = entity.IsActive,
                        ModifiedDate = entity.ModifiedDate,
                        ModifiedBy = entity.ModifiedBy
                    }, _uow.Transaction, commandType: CommandType.StoredProcedure, cancellationToken: cancellationToken)).ConfigureAwait(false);

                if (startedLocal)
                {
                    await _uow.CommitAsync(cancellationToken).ConfigureAwait(false);
                }
            }
            catch
            {
                if (startedLocal)
                {
                    try { await _uow.RollbackAsync(cancellationToken).ConfigureAwait(false); } catch { }
                }
                throw;
            }
        }
    }
}