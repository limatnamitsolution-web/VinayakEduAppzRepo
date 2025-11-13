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

namespace VLimat.Eduz.Infrastructure.Features.MasterConfigs.Repositories
{
    public class MasterConfigRepository : IMasterConfigRepository
    {
        private readonly DapperDbContext _db;
        private readonly IDapperUnitOfWork _uow;

        public MasterConfigRepository(DapperDbContext db, IDapperUnitOfWork uow)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
            _uow = uow ?? throw new ArgumentNullException(nameof(uow));
        }

        public async Task<MasterConfig?> GetAsync(int Id, CancellationToken cancellationToken = default)
        {
            const string sql = @"
                SELECT TOP (1) *
                FROM mst.MasterConfigs
                WHERE Id = @Id
                ORDER BY SortOrder;";

            if (_uow.Transaction != null)
            {
                var result = await _uow.Connection.QueryFirstOrDefaultAsync<MasterConfig>(new CommandDefinition(sql, new { Id = Id }, _uow.Transaction, cancellationToken: cancellationToken));
                return result;
            }

            using var conn = await _db.CreateOpenConnectionAsync(cancellationToken).ConfigureAwait(false);
            return await conn.QueryFirstOrDefaultAsync<MasterConfig>(new CommandDefinition(sql, new { Id = Id}, cancellationToken: cancellationToken));
        }

        public async Task<IEnumerable<MasterConfig?>> GetAllAsync(int academicId, string configuration, CancellationToken cancellationToken = default)
        {
            const string sql = @"
                                SELECT *
                                FROM mst.MasterConfigs
                                WHERE AcademicId = @academicId
                                  AND Configuration = @configuration
                                  AND IsActive = 1
                                ORDER BY SortOrder;";

            if (_uow.Transaction != null)
            {
                var results = await _uow.Connection.QueryAsync<MasterConfig>(new CommandDefinition(sql, new { AcademicId = academicId, Configuration = configuration }, _uow.Transaction, cancellationToken: cancellationToken));
                return results.Cast<MasterConfig?>().ToList();
            }

            using var conn = await _db.CreateOpenConnectionAsync(cancellationToken).ConfigureAwait(false);
            var list = await conn.QueryAsync<MasterConfig>(new CommandDefinition(sql, new { AcademicId = academicId, Configuration = configuration }, cancellationToken: cancellationToken));
            return list.Cast<MasterConfig?>().ToList();
        }

        public async Task<MasterConfig> AddAsync(MasterConfig entity, CancellationToken cancellationToken = default)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            const string sql = @"
INSERT INTO MasterConfigs
    (AcademicId, Configuration, ConfigKey, ConfigValue, Description, SortOrder, AC_Yr, IsActive, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy)
VALUES
    (@AcademicId, @Configuration, @ConfigKey, @ConfigValue, @Description, @SortOrder, @AC_Yr, @IsActive, @CreatedDate, @CreatedBy, @ModifiedDate, @ModifiedBy);
SELECT CAST(SCOPE_IDENTITY() AS int);";

            var startedLocal = false;
            try
            {
                if (_uow.Transaction == null)
                {
                    await _uow.BeginAsync(cancellationToken).ConfigureAwait(false);
                    startedLocal = true;
                }

                var id = await _uow.Connection.QuerySingleAsync<int>(new CommandDefinition(sql, entity, _uow.Transaction, cancellationToken: cancellationToken)).ConfigureAwait(false);
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

            const string sql = @"
UPDATE MasterConfigs
SET Configuration = @Configuration,
    ConfigKey = @ConfigKey,
    ConfigValue = @ConfigValue,
    Description = @Description,
    SortOrder = @SortOrder,
    AC_Yr = @AC_Yr,
    IsActive = @IsActive,
    ModifiedDate = @ModifiedDate,
    ModifiedBy = @ModifiedBy
WHERE Id = @Id;";

            var startedLocal = false;
            try
            {
                if (_uow.Transaction == null)
                {
                    await _uow.BeginAsync(cancellationToken).ConfigureAwait(false);
                    startedLocal = true;
                }

                await _uow.Connection.ExecuteAsync(new CommandDefinition(sql, entity, _uow.Transaction, cancellationToken: cancellationToken)).ConfigureAwait(false);

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