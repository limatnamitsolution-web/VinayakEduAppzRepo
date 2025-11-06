using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using VLimat.Eduz.Application.DTOs;
using VLimat.Eduz.Application.Features.MasterConfig.Queries;
using VLimat.Eduz.Domain.Repositories;

namespace VLimat.Eduz.Application.Features.MasterConfig.Handlers
{
    // Uses IMasterConfigRepository so DI can provide the Dapper implementation (DapperMasterConfigRepository).
    public class DapperGetAllMasterConfigByKeyHandler : IRequestHandler<DapperGetAllMasterConfigByConfigurationQuery, IEnumerable<MasterConfigResponse>>
    {
        private readonly IDapperMasterConfigRepository _repo;

        public DapperGetAllMasterConfigByKeyHandler(IDapperMasterConfigRepository repo) => _repo = repo;

        public async Task<IEnumerable<MasterConfigResponse>> Handle(DapperGetAllMasterConfigByConfigurationQuery request, CancellationToken cancellationToken)
        {
            var entities = await _repo.GetAllByConfigurationAsync(request.AcademicId, request.Configuration, cancellationToken).ConfigureAwait(false);
            if (entities == null) return Enumerable.Empty<MasterConfigResponse>();

            return entities
                .Where(e => e is not null)
                .Select(e => {
                    var item = e!;
                    return new MasterConfigResponse
                    {
                        AcademicId = item.AcademicId,
                        Configuration = item.Configuration,
                        ConfigKey = item.ConfigKey,
                        ConfigValue = item.ConfigValue,
                        Description = item.Description,
                        SortOrder = item.SortOrder,
                        AC_Yr = item.AC_Yr,
                        IsActive = item.IsActive,
                        CreatedDate = item.CreatedDate,
                        CreatedBy = item.CreatedBy
                    };
                })
                .ToList();
        }
    }
}
