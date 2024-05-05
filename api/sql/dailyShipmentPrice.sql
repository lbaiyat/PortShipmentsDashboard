select ShipmentDate, Sum(Price) from Shipment
group by ShipmentDate