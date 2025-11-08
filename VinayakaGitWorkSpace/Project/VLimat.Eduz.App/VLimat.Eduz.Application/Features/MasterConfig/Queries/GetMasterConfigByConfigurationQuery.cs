
using MediatR;
using VLimat.Eduz.Application.Features.MasterConfig.DTOs;

namespace VLimat.Eduz.Application.Features.MasterConfig.Queries
{
    public record GetMasterConfigByConfigurationQuery(int AcademicId, string Configuration) : IRequest<MasterConfigResponse?>;

    public record GetAllMasterConfigByConfigurationQuery(int AcademicId, string Configuration) : IRequest<IEnumerable<MasterConfigResponse>>;

    public record DapperGetMasterConfigByConfigurationQuery(int AcademicId, string Configuration) : IRequest<MasterConfigResponse?>;

    public record DapperGetAllMasterConfigByConfigurationQuery(int AcademicId, string Configuration) : IRequest<IEnumerable<MasterConfigResponse>>;
}   