
using Microsoft.Extensions.DependencyInjection;
using MediatR;
using System.Reflection;

namespace VLimat.Eduz.Application.DependencyInjection
{
    public static class MediatorExtensions
    {
        public static IServiceCollection AddApplicationMediator(this IServiceCollection services)
        {
            // Registers MediatR handlers found in this assembly
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
            // If you want to wire your pipeline behaviors from the Application / Infrastructure assemblies,
            // register them here (the types already exist in the project):
            // services.AddTransient(typeof(IPipelineBehavior<,>), typeof(Application.Common.Behaviors.ApplicationExceptionBehavior<,>));
            // services.AddTransient(typeof(IPipelineBehavior<,>), typeof(Infrastructure.Common.Behaviors.InfrastructureExceptionBehavior<,>));

            return services;
        }
    }
}