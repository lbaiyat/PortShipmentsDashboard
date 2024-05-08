import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import './ShipmentsGrid.css'

import { useEffect, useState, useRef } from "react";
import { getAllShipments } from "../../services/APIService";
function ShipmentsGrid() {
    const gridRef = useRef();
    
    const [colDefs, setColDefs] = useState([]);
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        getAllShipments()
        .then(results => {
            setColDefs(results.columnDefs)
            setRowData(results.data);
        });
    }, []);

    const onGridReady = (params) => {
        window.onresize = () => {
            params.api.sizeColumnsToFit();
        };
    };
    return (
        <div
            className="ag-theme-quartz grid-container"
            style={
                {height: 800, width: '100%'}
            } 
        >
            <AgGridReact
                ref={gridRef}
                onGridReady={onGridReady}
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}

export default ShipmentsGrid;
