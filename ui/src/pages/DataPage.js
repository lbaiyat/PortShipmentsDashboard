import ShipmentsGrid from "../components/ShipmentsGrid/ShipmentsGrid";
import './DataPage.css'

function DataPage() {
    return (
        <div>
            <div className="data-page-title">Shipment Data</div>
            <div className="shadow mb-5">
                <ShipmentsGrid/>
            </div>
        </div>
    )
}

export default DataPage;