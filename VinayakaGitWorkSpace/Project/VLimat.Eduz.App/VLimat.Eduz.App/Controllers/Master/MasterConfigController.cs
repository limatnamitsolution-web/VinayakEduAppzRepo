using MediatR;
using Microsoft.AspNetCore.Mvc;
using VLimat.Eduz.Application.Features.MasterConfig.Commands;
using VLimat.Eduz.Application.Features.MasterConfig.Queries;
using VLimat.Eduz.Application.DTOs;
using VLimat.Eduz.Application.Common;

namespace VLimat.Eduz.App.Controllers.Master
{
    [Route("api/[controller]")]
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
            // Assuming created.ConfigKey or other identifier exists
            return CreatedAtAction(nameof(GetAllByConfiguration), new { academicId = created.AcademicId, configKey = created.ConfigKey }, created);
        }
    }
}
