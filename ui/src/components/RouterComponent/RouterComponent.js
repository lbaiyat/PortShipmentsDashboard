import { Route, Routes } from "react-router-dom";
import DataPage from "../../pages/DataPage";
import AnalyticsPage from "../../pages/AnalyticsPage";
function RouterComponent() {
    
    return (
        <div>
            <Routes>
                <Route path="/data" element={<DataPage />}></Route>
                <Route path="/analytics" element={<AnalyticsPage />}></Route>
            </Routes>
        </div>
    )
}
export default RouterComponent;