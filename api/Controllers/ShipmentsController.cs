using System;
using System.Collections.Generic;
using System.Reflection;
using System.Data.SqlClient;
using Microsoft.Data.Sqlite;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace DefaultNamespace;


[ApiController]
[Route("shipments")]
public class ShipmentsController: ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;
    private readonly string _connectionString;

    public ShipmentsController(AppDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }
    
    [Route("all")]
    public IActionResult GetShipments()
    // public ActionResult<IEnumerable<Shipment>> GetShipments()
    {
        
        List<Dictionary<string, string>> columnDefs = new List<Dictionary<string, string>>
        {
            new Dictionary<string, string> { { "field", "Name" } },
            new Dictionary<string, string> { { "field", "Price" } },
            new Dictionary<string, string> { { "field", "Weight" } },
            new Dictionary<string, string> { { "field", "Length" } },
            new Dictionary<string, string> { { "field", "Width" } },
            new Dictionary<string, string> { { "field", "Height" } },
            new Dictionary<string, string> { { "field", "ShipmentDate" } },
            new Dictionary<string, string> { { "field", "DestinationPort" } }
        };
        var data = _context.Shipment.ToList();

        Dictionary<string, object> results = new Dictionary<string, object>
        {
            { "columnDefs", columnDefs },
            { "data", data }
        };
        return Ok(results);
    }
    
    [Route("column-defs")]
    public IActionResult GetShipmentColumnDefs()
    {
        List<Dictionary<string, string>> columnDefs = new List<Dictionary<string, string>>
        {
            new Dictionary<string, string> { { "field", "Name" } },
            new Dictionary<string, string> { { "field", "Price" } },
            new Dictionary<string, string> { { "field", "Weight" } },
            new Dictionary<string, string> { { "field", "Length" } },
            new Dictionary<string, string> { { "field", "Width" } },
            new Dictionary<string, string> { { "field", "Height" } },
            new Dictionary<string, string> { { "field", "ShipmentDate" } },
            new Dictionary<string, string> { { "field", "DestinationPort" } }
        };
        return Ok(columnDefs);
    }
    
    [Route("daily-shipment-price")]
    public async Task<IActionResult> GetDailyShipmentPrice()
    {
        List<Dictionary<string, object>> results = await DatabaseUtil.GetResultsFromQueryFile(
            _context,
            _environment,
            "sql/dailyShipmentPrice.sql"
        );
        return Ok(results);
    }
    
    [Route("daily-shipment-count")]
    public async Task<IActionResult> GetDailyShipmentCount()
    {
        List<Dictionary<string, object>> results = await DatabaseUtil.GetResultsFromQueryFile(
            _context,
            _environment,
            "sql/dailyShipmentCount.sql"
        );
        return Ok(results);
    }
    
    
    [Route("total-shipments-by-destination")]
    public async Task<IActionResult> GetTotalShipmentsByDestination()
    {
        List<Dictionary<string, string>> columnDefs = new List<Dictionary<string, string>>
        {
            new Dictionary<string, string> { { "field", "Destination" } },
            new Dictionary<string, string> { { "field", "TotalShipments" } },
        };
        
        List<Dictionary<string, object>> data = await DatabaseUtil.GetResultsFromQueryFile(
            _context,
            _environment,
            "sql/totalShipmentsByDestination.sql"
        );

        Dictionary<string, object> results = new Dictionary<string, object>
        {
            { "columnDefs", columnDefs },
            { "data", data }
        };
        return Ok(results);
    }

    [Route("total-value-by-destination")]
    public async Task<IActionResult> GetTotalValueByDestination()
    {
        List<Dictionary<string, string>> columnDefs = new List<Dictionary<string, string>>
        {
            new Dictionary<string, string> { { "field", "Destination" } },
            new Dictionary<string, string> { { "field", "TotalValue" }, { "format", "currency"} },
        };
        
        List<Dictionary<string, object>> data = await DatabaseUtil.GetResultsFromQueryFile(
            _context,
            _environment,
            "sql/totalValueByDestination.sql"
        );

        Dictionary<string, object> results = new Dictionary<string, object>
        {
            { "columnDefs", columnDefs },
            { "data", data }
        };
        return Ok(results);
    }
    
    
    [Route("total-shipment-price")]
    public async Task<IActionResult> GetTotalShipmentPrice()
    {
        string sqlQuery = """
                          Select round(sum(Price), 2) as TotalPrice from Shipment 
                          """;
        List<Dictionary<string, object>> result = await DatabaseUtil.GetResultsFromRawQuery(
            _context,
            _environment,
            sqlQuery
        );

        return Ok(result[0]);
    }

    [Route("total-shipment-count")]
    public async Task<IActionResult> GetTotalShipmentCount()
    {
        string sqlQuery = """
                          Select count(*) TotalShipmentCount from Shipment
                          """;
        List<Dictionary<string, object>> result = await DatabaseUtil.GetResultsFromRawQuery(
            _context,
            _environment,
            sqlQuery
        );

        return Ok(result[0]);
    }

    [Route("daily-average-price")]
    public async Task<IActionResult> GetDailyAveragePrice()
    {
        List<Dictionary<string, object>> result = await DatabaseUtil.GetResultsFromQueryFile(
            _context,
            _environment,
            "sql/averageDailyPrice.sql"
        );

        return Ok(result[0]);
    }
    
    [Route("daily-average-shipment-count")]
    public async Task<IActionResult> GetDailyAverageShipmentCount()
    {
        List<Dictionary<string, object>> result = await DatabaseUtil.GetResultsFromQueryFile(
            _context,
            _environment,
            "sql/averageDailyShipmentCount.sql"
        );

        return Ok(result[0]);
    }
}