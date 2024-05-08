select DestinationPort as Destination, count(*) as TotalShipments
from Shipment
where DestinationPort is not ""
group by DestinationPort