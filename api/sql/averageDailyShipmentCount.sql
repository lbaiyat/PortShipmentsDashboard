select count(*) / count(distinct(ShipmentDate)) as AverageDailyShipmentCount
from Shipment
