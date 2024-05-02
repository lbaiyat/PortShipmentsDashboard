using System.ComponentModel.DataAnnotations;
namespace DefaultNamespace;

public class Shipment
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public float Price { get; set; }
    public float Weight { get; set; }
    public float Length { get; set; }
    public float Width { get; set; }
    public float Height { get; set; }
    public string ShipmentDate { get; set; }
    public string DestinationPort { get; set; }
}