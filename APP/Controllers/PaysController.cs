using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace APP.Controllers
{
    public class PaysController : Controller
    {
        [HttpGet]
        public JsonResult Index()
        {
            return Json();
        }
    }
}