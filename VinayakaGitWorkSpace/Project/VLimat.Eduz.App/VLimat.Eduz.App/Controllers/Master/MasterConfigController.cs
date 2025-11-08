using MediatR;
using Microsoft.AspNetCore.Mvc;
using VLimat.Eduz.Application.Features.MasterConfig.Commands;
using VLimat.Eduz.Application.Features.MasterConfig.Queries;
using VLimat.Eduz.Application.Common;
using VLimat.Eduz.Application.Features.MasterConfig.DTOs;

namespace VLimat.Eduz.App.Controllers.Master
{

    [Area("Master")]
    [Route("api/[area]/[controller]")]
    [ApiController]
    public class MasterConfigController  : ControllerBase
    {
        private readonly MediatR.IMediator _mediator;

        public MasterConfigController(MediatR.IMediator mediator) => _mediator = mediator;

        //[HttpGet("{academicId}/{Configuration}")]
        //public async Task<IActionResult> GetByConfiguration(int academicId, string Configuration, CancellationToken cancellationToken)
        //{
        //    var query = new GetMasterConfigByConfigurationQuery(academicId, Configuration);
        //    var result = await _mediator.Send(query, cancellationToken);
        //    if (result == null) return NotFound();
        //    return Ok(result);
        //}

        [HttpGet("{academicId}/{Configuration}")]
        public async Task<IActionResult> GetAllByConfiguration(int academicId, string Configuration, CancellationToken cancellationToken)
        {
            var query = new GetAllMasterConfigByConfigurationQuery(academicId, Configuration);
            //var query = new DapperGetAllMasterConfigByConfigurationQuery(academicId, Configuration);
            var result = await _mediator.Send(query, cancellationToken);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MasterConfigRequest request, CancellationToken cancellationToken)
        {
            var command = new CreateMasterConfigCommand(request);
            var created = await _mediator.Send(command, cancellationToken);
            // Return Created pointing to GetAllByConfiguration; ensure route values match action parameter names
            return CreatedAtAction(nameof(GetAllByConfiguration), new { academicId = created.AcademicId, Configuration = created.Configuration }, created);
        }
    }
}
