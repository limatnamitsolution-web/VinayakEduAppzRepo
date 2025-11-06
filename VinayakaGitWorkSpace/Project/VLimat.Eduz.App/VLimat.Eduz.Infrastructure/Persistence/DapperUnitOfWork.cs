using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace VLimat.Eduz.Infrastructure.Persistence
{
    /// <summary>
    /// Simple Dapper unit-of-work: opens a connection, begins a transaction and exposes commit/rollback.
    /// Disposal will clean up connection and transaction.
    /// </summary>
    public sealed class DapperUnitOfWork : IDapperUnitOfWork
    {
        private readonly DapperDbContext _db;
        private IDbConnection? _connection;
        private IDbTransaction? _transaction;
        private bool _disposed;

        public DapperUnitOfWork(DapperDbContext db) => _db = db ?? throw new ArgumentNullException(nameof(db));

        public IDbConnection Connection => _connection ?? throw new InvalidOperationException("Call BeginAsync before using the connection.");
        public IDbTransaction? Transaction => _transaction;

        public async Task BeginAsync(CancellationToken cancellationToken = default)
        {
            if (_connection != null) return; // already started
            _connection = await _db.CreateOpenConnectionAsync(cancellationToken).ConfigureAwait(false);
            _transaction = _connection.BeginTransaction();
        }

        public Task CommitAsync(CancellationToken cancellationToken = default)
        {
            if (_transaction == null) throw new InvalidOperationException("Transaction not started.");
            _transaction.Commit();
            Cleanup();
            return Task.CompletedTask;
        }

        public Task RollbackAsync(CancellationToken cancellationToken = default)
        {
            if (_transaction == null)
            {
                Cleanup();
                return Task.CompletedTask;
            }

            try
            {
                _transaction.Rollback();
            }
            finally
            {
                Cleanup();
            }

            return Task.CompletedTask;
        }

        private void Cleanup()
        {
            try { _transaction?.Dispose(); } catch { }
            _transaction = null;

            try { _connection?.Close(); } catch { }
            try { _connection?.Dispose(); } catch { }
            _connection = null;
        }

        public void Dispose()
        {
            if (_disposed) return;
            Cleanup();
            _disposed = true;
        }
    }
}
