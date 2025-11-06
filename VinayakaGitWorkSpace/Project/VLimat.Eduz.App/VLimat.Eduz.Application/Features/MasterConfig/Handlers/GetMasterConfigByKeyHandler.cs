
using MediatR;
using VLimat.Eduz.Application.Features.MasterConfig.Queries;
using VLimat.Eduz.Application.DTOs;
using System.Threading;
using System.Threading.Tasks;
using VLimat.Eduz.Domain.Repositories;

namespace VLimat.Eduz.Application.Features.MasterConfig.Handlers
{
    public class GetMasterConfigByConfigurationHandler : IRequestHandler<GetMasterConfigByConfigurationQuery, MasterConfigResponse?>
    {
        private readonly IMasterConfigRepository _repo;

        public GetMasterConfigByConfigurationHandler(IMasterConfigRepository repo) => _repo = repo;

        public async Task<MasterConfigResponse?> Handle(GetMasterConfigByConfigurationQuery request, CancellationToken cancellationToken)
        {
            var entity = await _repo.GetByConfigurationAsync(request.AcademicId, request.Configuration, cancellationToken);
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