using MediatR;
using VLimat.Eduz.Application.DTOs;
using System.Threading;
using System.Threading.Tasks;
using VLimat.Eduz.Domain.Repositories;



    namespace VLimat.Eduz.Application.Features.MasterConfig.Commands
    {
        public record CreateMasterConfigCommand(MasterConfigRequest Request) : IRequest<MasterConfigResponse>;
    public record DapperCreateMasterConfigCommand(MasterConfigRequest Request) : IRequest<MasterConfigResponse>;
}
