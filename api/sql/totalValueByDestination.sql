select DestinationPort as Destination, sum(Price) as TotalValue
from Shipment
where DestinationPort is not ""
group by DestinationPort