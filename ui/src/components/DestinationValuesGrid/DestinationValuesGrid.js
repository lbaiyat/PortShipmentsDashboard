import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import { useEffect, useState } from "react";
import { getTotalShipmentsByDestination } from "../../services/APIService";
import './DestinationShipmentGrid.css';
function DestinationShipmentsGrid(props) {

    const [ colDefs, setColDefs ] = useState([]);
    const [ rowData, setRowData ] = useState([]);
    useEffect(() => {
        getTotalShipmentsByDestination()
            .then(results => {
                setColDefs(results.columnDefs);
                setRowData(results.data)
            })
    }, []);
    
    return (
        <div
            className="ag-theme-quartz grid-container no-horizontal-scroll"
            style={
                {height: 300, width: '32em'}
            }
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}

export default DestinationShipmentsGrid;