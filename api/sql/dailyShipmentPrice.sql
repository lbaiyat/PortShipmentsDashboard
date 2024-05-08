select ShipmentDate, Sum(Price) as Price from Shipment
where ShipmentDate is not ""                              
group by ShipmentDate
