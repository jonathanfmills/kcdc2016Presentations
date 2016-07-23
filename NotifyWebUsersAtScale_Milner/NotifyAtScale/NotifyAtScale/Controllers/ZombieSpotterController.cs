using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NotifyAtScale.Controllers
{
    public class ZombieSpotterController : Controller
    {
        // GET: ZombieSpotter
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(Models.ZombieSpotting model)
        {
            if (ModelState.IsValid)
            {
                var context = GlobalHost.ConnectionManager.GetHubContext<Hubs.ZombieHub>();
                context.Clients.All.zombieSpotted(model);
                ViewBag.Message = "Zombie reported";

                return View();
            }
            else
            {
                return View(model);
            }
        }
    }
}