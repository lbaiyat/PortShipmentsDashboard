with daily_total as (
    select sum(Price) as Price from Shipment
    where ShipmentDate is not ""
    group by ShipmentDate
)
select round(avg(Price), 2) as AverageDailyPrice from daily_total