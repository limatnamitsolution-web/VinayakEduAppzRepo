
using MediatR;
using VLimat.Eduz.Application.Features.MasterConfig.Queries;
using System.Threading;
using System.Threading.Tasks;
using VLimat.Eduz.Domain.Repositories;
using VLimat.Eduz.Application.Features.MasterConfig.DTOs;

namespace VLimat.Eduz.Application.Features.MasterConfig.Handlers
{
    public class GetAllMasterConfigByConfigurationHandler : IRequestHandler<GetAllMasterConfigByConfigurationQuery, IEnumerable<MasterConfigResponse>>
    {
        private readonly IMasterConfigRepository _repo;

        public GetAllMasterConfigByConfigurationHandler(IMasterConfigRepository repo) => _repo = repo;

        public async Task<IEnumerable<MasterConfigResponse>> Handle(GetAllMasterConfigByConfigurationQuery request, CancellationToken cancellationToken)
        {
            var entities = await _repo.GetAllByConfigurationAsync(request.AcademicId, request.Configuration, cancellationToken);
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