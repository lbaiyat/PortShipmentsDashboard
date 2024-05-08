import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import { useEffect, useState } from "react";
import {getTotalValuesByDestination} from "../../services/APIService";
import './DestinationValuesGrid.css';
import {currencyFormat} from "../../utils/Helper";
function DestinationValuesGrid() {

    const [ colDefs, setColDefs ] = useState([]);
    const [ rowData, setRowData ] = useState([]);
    useEffect(() => {
        getTotalValuesByDestination()
            .then(results => {
                setColDefs(results.columnDefs);
                setRowData(results.data.map(v => {
                    v.TotalValue = currencyFormat(v.TotalValue);
                    return v;
                }))
            })
    }, []);
    
    return (
        <div
            className="ag-theme-quartz grid-container no-horizontal-scroll"
            style={
                {height: 315, width: '32em'}
            }
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}

export default DestinationValuesGrid;