using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using VLimat.Eduz.Domain.Repositories;
using VLimat.Eduz.Infrastructure.Features.MasterConfigs.Repositories;
using VLimat.Eduz.Infrastructure.Persistence;

namespace VLimat.Eduz.Infrastructure.DependencyInjection
{
    public static class InfrastructureExtensions
    {

        public static IServiceCollection AddInfrastructureRepositories(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<ApplicationDbContext>(options =>
           options.UseSqlServer(connectionString));
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new Exception("Connection string is null or empty");
            }
            services.AddScoped<IMasterConfigRepository, EfMasterConfigRepository>();

            


            services.AddScoped<IDapperMasterConfigRepository, DapperMasterConfigRepository>();
            services.AddSingleton(sp =>
            {
                var config = sp.GetRequiredService<IConfiguration>();
                return new DapperDbContext(config, "DapperConnection");
            });

            services.AddScoped<IDapperUnitOfWork, DapperUnitOfWork>();
           
            return services;
        }
    }
}