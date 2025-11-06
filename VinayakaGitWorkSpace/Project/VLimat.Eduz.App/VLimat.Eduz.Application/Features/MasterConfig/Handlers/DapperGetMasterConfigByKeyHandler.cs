using MediatR;
using System.Threading;
using System.Threading.Tasks;
using VLimat.Eduz.Application.DTOs;
using VLimat.Eduz.Application.Features.MasterConfig.Queries;
using VLimat.Eduz.Domain.Repositories;

namespace VLimat.Eduz.Application.Features.MasterConfig.Handlers
{
    // Uses IMasterConfigRepository so DI can provide the Dapper implementation (DapperMasterConfigRepository).
    public class DapperGetMasterConfigByKeyHandler : IRequestHandler<DapperGetMasterConfigByConfigurationQuery, MasterConfigResponse?>
    {
        private readonly IMasterConfigRepository _repo;

        public DapperGetMasterConfigByKeyHandler(IMasterConfigRepository repo) => _repo = repo;

        public async Task<MasterConfigResponse?> Handle(DapperGetMasterConfigByConfigurationQuery request, CancellationToken cancellationToken)
        {
            var entity = await _repo.GetByConfigurationAsync(request.AcademicId, request.Configuration, cancellationToken).ConfigureAwait(false);
            if (entity == null) return null;

            return new MasterConfigResponse
            {
                AcademicId = entity.AcademicId,
                Configuration = entity.Configuration,
                ConfigKey = entity.ConfigKey,
                ConfigValue = entity.ConfigValue,
                Description = entity.Description,
                SortOrder = entity.SortOrder,
                AC_Yr = entity.AC_Yr,
                IsActive = entity.IsActive,
                CreatedDate = entity.CreatedDate,
                CreatedBy = entity.CreatedBy
            };
        }
    }
}
