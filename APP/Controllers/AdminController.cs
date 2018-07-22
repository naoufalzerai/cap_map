using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using APP.Models;

namespace APP.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }        
    }
}
