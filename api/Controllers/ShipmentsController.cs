using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DefaultNamespace;


[ApiController]
[Route("shipments")]
public class ShipmentsController: ControllerBase
{
    private readonly AppDbContext _context;

    public ShipmentsController(AppDbContext context)
    {
        _context = context;
    }
    
    [Route("one")]
    public ActionResult<IEnumerable<Shipment>> GetShipments()
    {

        var shipments = _context.Shipment.ToList();
        return Ok(shipments);
        // var inventory = new List<string>
        // {
        //     "Vial",
        //     "Syringe",
        //     "Nitrile Gloves",
        //     "Guaze 100mm x 100mm"
        // };
        // return inventory;
    }
}