select ShipmentDate, Count(*) as ShipmentCount from Shipment
where ShipmentDate is not ""                              
group by ShipmentDate
