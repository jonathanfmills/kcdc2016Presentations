using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR;
using Microsoft.Azure;

namespace NotifyAtScale
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
           
            var connectionString = CloudConfigurationManager.GetSetting("Microsoft.ServiceBus.ConnectionString");

            //use one of these to handle the backplane - but not both
            //make sure you have setup the necessary backing resources
            // http://www.asp.net/signalr/overview/performance/scaleout-in-signalr
            GlobalHost.DependencyResolver.UseServiceBus(connectionString, "zombie");
            //GlobalHost.DependencyResolver.UseRedis("zombie", 20,"", "");

            app.MapSignalR();
        }
    }
}
