using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace VLimat.Eduz.Infrastructure.Persistence
{
    /// <summary>
    /// Unit-of-work abstraction for Dapper-based work (connection + transaction).
    /// Call <see cref="BeginAsync"/> before using <see cref="Connection"/> / <see cref="Transaction"/>.
    /// </summary>
    public interface IDapperUnitOfWork : IDisposable
    {
        IDbConnection Connection { get; }
        IDbTransaction? Transaction { get; }

        Task BeginAsync(CancellationToken cancellationToken = default);
        Task CommitAsync(CancellationToken cancellationToken = default);
        Task RollbackAsync(CancellationToken cancellationToken = default);
    }
}
