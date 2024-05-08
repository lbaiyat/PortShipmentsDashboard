import AnalyticHighlightComponent from "../components/AnalyticHighlightComponent/AnalyticHighlightComponent";
import "./AnalyticsPage.css"
import DateLineGraphComponent from "../components/DateLineGraphComponent/DateLineGraphComponent";
import {useEffect, useState} from "react";
import {
    getDailyAveragePrice, getDailyAverageShipmentCount, getDailyShipmentCount,
    getDailyShipmentPrices,
    getTotalShipmentCount,
    getTotalShipmentPrice
} from "../services/APIService";
import DestinationShipmentsGrid from "../components/DestinationShipmentsGrid/DestinationShipmentsGrid";
import {currencyFormat, numberFormat} from "../utils/Helper";
import DestinationValuesGrid from "../components/DestinationValuesGrid/DestinationValuesGrid";
function AnalyticsPage() {

    const [totalShipmentPrice, setTotalShipmentPrice] = useState();
    const [totalShipmentCount, setTotalShipmentCount] = useState();
    const [dailyAveragePrice, setDailyAveragePrice] = useState();
    const [dailyAverageShipmentCount, setDailyAverageShipmentCount] = useState();
    
    
    const [dailyShipmentPrices, setDailyShipmentPrices] = useState([]);
    const [dailyShipmentCount, setDailyShipmentCount] = useState([]);
    useEffect(() => {
        getDailyShipmentPrices()
        .then(data => {
            const mappedData = data.map(datePrice => {
                return {
                    x: datePrice.ShipmentDate,
                    y: datePrice.Price
                };
            })
            setDailyShipmentPrices(mappedData);
        });

        getDailyShipmentCount()
        .then(data => {
            const mappedData = data.map(dateCount => {
                return {
                    x: dateCount.ShipmentDate,
                    y: dateCount.ShipmentCount
                };
            })
            setDailyShipmentCount(mappedData);
        });
        
        
        
        getTotalShipmentPrice()
            .then(data => {
                setTotalShipmentPrice(currencyFormat(data.TotalPrice));
            })
        
        getTotalShipmentCount()
            .then(data => {
                setTotalShipmentCount(numberFormat(data.TotalShipmentCount));
            })
        
        getDailyAveragePrice()
            .then(data => {
                setDailyAveragePrice(currencyFormat(data.AverageDailyPrice));
            })
        getDailyAverageShipmentCount()
            .then(data => {
                setDailyAverageShipmentCount(numberFormat(data.AverageDailyShipmentCount));
            })
    }, []);
    
    return (
        <div>
            <div className="analytics-page-title">Analytics Dashboard</div>
            <div className="d-flex flex-row justify-content-around highlight-container">
                <div className="p-2">
                    <AnalyticHighlightComponent
                        title="Total Shipment Value"
                        value={totalShipmentPrice}
                    />
                </div>
                <div className="p-2">
                    <AnalyticHighlightComponent
                        title="Total Shipments"
                        value={totalShipmentCount}
                    />
                </div>
                <div className="p-2">
                    <AnalyticHighlightComponent
                        title="Daily Avg. Shipment Value"
                        value={dailyAveragePrice}
                    />
                </div>
                <div className="p-2">
                    <AnalyticHighlightComponent
                        title="Daily Avg. Shipments"
                        value={dailyAverageShipmentCount}
                    />
                </div>
            </div>
            <div className="d-flex flex-row justify-content-around">
                <div className="p-6 content-card shadow mb-5 bg-white">
                    <span className="title">
                        Total Value by Destination
                    </span>
                    <DestinationValuesGrid/>
                    
                </div>
                <div className="p-6 content-card shadow mb-5 bg-white">
                    <span className="title">
                        Shipment Pricing by Day
                    </span>
                    <DateLineGraphComponent data={dailyShipmentPrices} valueFormatter={currencyFormat}/>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-around">
                <div className="p-6 content-card shadow mb-5 bg-white">
                    <span className="title">
                        Total Shipments By Destination
                    </span>
                    <DestinationShipmentsGrid/>
                </div>
                <div className="p-6 content-card shadow mb-5 bg-white">
                    <span className="title">
                        Total Shipments By Day
                    </span>
                    <DateLineGraphComponent data={dailyShipmentCount}/>
                </div>
            </div>
            
        </div>

    )
}

export default AnalyticsPage;