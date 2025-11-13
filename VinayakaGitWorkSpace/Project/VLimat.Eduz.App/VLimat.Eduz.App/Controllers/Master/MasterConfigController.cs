using MediatR;
using Microsoft.AspNetCore.Mvc;
using VLimat.Eduz.App.Common;
using VLimat.Eduz.Application.Common;
using VLimat.Eduz.Application.Features.MasterConfig.Commands;
using VLimat.Eduz.Application.Features.MasterConfig.DTOs;
using VLimat.Eduz.Application.Features.MasterConfig.Providers;

namespace VLimat.Eduz.App.Controllers.Master
{

    [Area("Master")]
    [Route("api/[area]/[controller]")]
    [ApiController]
    public class MasterConfigController  : ControllerBase
    {
        private readonly MediatR.IMediator _mediator;

        private readonly IProviderMasterConfigFactory _queryFactory;
        public MasterConfigController(MediatR.IMediator mediator, IProviderMasterConfigFactory queryFactory)
            => (_mediator, _queryFactory) = (mediator, queryFactory);



        //[HttpGet("GetAll")]
        //public async Task<IActionResult> GetAllMasterConfig(int academicId, string Configuration, CancellationToken cancellationToken)
        //{
        //   // var query = _queryFactory.CreateEntityGetAllMaster(academicId, Configuration);
        //    var query = _queryFactory.CreateGetAllMasterConfig(academicId, Configuration);
        //    var result = await _mediator.Send(query, cancellationToken);
        //    if (result == null) return NotFound();
        //    return Ok(result);
        //}
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllMasterConfig(string encryptedAcademicId, string encryptedConfiguration, CancellationToken cancellationToken)
        {
            // Use your secret key (must match Angular)
            string secretKey = "your-strong-secret-key";

            // Decrypt values
            int academicId = int.Parse(CryptoHelper.DecryptString(encryptedAcademicId, secretKey));
            string configuration = CryptoHelper.DecryptString(encryptedConfiguration, secretKey);

            var query = _queryFactory.CreateGetAllMasterConfig(academicId, configuration);
            var result = await _mediator.Send(query, cancellationToken);
            if (result == null) return NotFound();
            return Ok(result);
        }
        [HttpGet("Get")]
        public async Task<IActionResult> GetByConfiguration(int Id, CancellationToken cancellationToken)
        {
            //var query = _queryFactory.CreateEntityGetMasterConfig(Id);
            var query = _queryFactory.CreateGetMasterConfig(Id);
            var result = await _mediator.Send(query, cancellationToken);
            if (result == null) return NotFound();
            return Ok(result);
        }
        //[HttpPost]
        //public async Task<IActionResult> Create([FromBody] MasterConfigRequest request, CancellationToken cancellationToken)
        //{
        //    var command = new CreateCommand(request);
        //    var created = await _mediator.Send(command, cancellationToken);
        //    // Return Created pointing to GetAllByConfiguration; ensure route values match action parameter names
        //    return CreatedAtAction(nameof(GetAllByConfiguration), new { academicId = created.AcademicId, Configuration = created.Configuration }, created);
        //}
    }
}
