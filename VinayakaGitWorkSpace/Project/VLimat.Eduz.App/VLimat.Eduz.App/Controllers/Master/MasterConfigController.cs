using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
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

        // POST version that matches Angular: POST api/Master/MasterConfig/GetAll/{academicId} with body { category: configuration }
        [HttpPost("GetAll/{academicId}")]
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public async Task<IActionResult> GetAllMasterConfig([FromRoute] string academicId, [FromBody] GetAllMasterConfigRequest request, CancellationToken cancellationToken)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Category))
                return BadRequest("Request body must include a non-empty 'category' property.");

            // Use your secret key (move to configuration/secret store for production)
            string secretKey = "MyVerySecretKey_1234567890ABCDEF";

            try
            {
                // Decrypt the incoming values (both route and body)
                //var decryptedAcademicId = CryptoHelper.DecryptString(academicId, secretKey);
                //if (!int.TryParse(decryptedAcademicId, out var parsedAcademicId))
                //    return BadRequest("Decrypted academicId is not a valid integer.");

                var decryptedConfiguration = CryptoHelper.DecryptString(request.Category, secretKey);

                var query = _queryFactory.CreateGetAllMasterConfig(1, decryptedConfiguration);
                var result = await _mediator.Send(query, cancellationToken);
                if (result == null) return NotFound();
                return Ok(result);
            }
            catch (FormatException)
            {
                return BadRequest("One of the encrypted inputs is not a valid Base-64 string.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (CryptographicException)
            {
                return BadRequest("Decryption failed. Check key/format.");
            }
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

        // Simple request DTO for POST body
        public class GetAllMasterConfigRequest
        {
            public string Category { get; set; } = string.Empty;
        }
    }
}
