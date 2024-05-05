import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import './ShipmentsGrid.css'
import { useEffect, useState } from "react";
import {getAllShipments, getShipmentColumnDefs, getShipments} from "../services/APIService";
function ShipmentsGrid(props) {

    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);
    useEffect(() => {
        getAllShipments()
        .then(data => {
            setRowData(data);
        });
        
        getShipmentColumnDefs()
        .then(colDefs => {
            setColDefs(colDefs);
        })
    }, []);

    return (
        <div
            className="ag-theme-quartz grid-container" // applying the grid theme
            style={
                {height: 700, width: '100%'}
            } 
            // the grid will fill the size of the parent container
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}

export default ShipmentsGrid;
