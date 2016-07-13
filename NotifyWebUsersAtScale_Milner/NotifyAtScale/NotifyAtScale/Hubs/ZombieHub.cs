using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.ServiceBus.Notifications;
using Microsoft.Azure;
using System.Threading.Tasks;

namespace NotifyAtScale.Hubs
{
    public class ZombieHub : Hub
    {
        public void ZombieSpotted(Models.ZombieSpotting details)
        {
            Clients.All.zombieSpotted(details);
            
            Task hubTask = SendToNotificationHubAsync(details);
            hubTask.Wait(1000);
        }

        private async Task<NotificationOutcome> SendToNotificationHubAsync(Models.ZombieSpotting details)
        {
            var connectionString = CloudConfigurationManager.GetSetting("NotificationHub.ConnectionString");
            var imageUrl = ComputeImageUrl(details.Type);

            var payload = string.Format("{{'data':{{'message':'{0}', 'title':'{1}','imgUrl':'{2}'}}}}", details.Details, "Zombie Sighted!", imageUrl );

            var client = NotificationHubClient.CreateClientFromConnectionString(connectionString, "zombiehub_ca");
            return await client.SendGcmNativeNotificationAsync(payload);
        }

        private string ComputeImageUrl(Models.ZombieType type)
        {
            return string.Format("{0}/content/images/{1}.jpg", Context.Request.Url.GetLeftPart(UriPartial.Authority), type.ToString());
        }
    }
}