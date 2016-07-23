using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NotifyAtScale.Models
{
    public class ZombieSpotting
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public string Details { get; set; }

        public ZombieType Type { get; set; }

    }
}