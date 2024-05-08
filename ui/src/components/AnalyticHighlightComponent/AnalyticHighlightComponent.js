
import './AnalyticHighlightComponent.css'
function AnalyticHighlightComponent(props) {
    
    return (
        <div className="highlight-card shadow mb-5 bg-white rounded">
            <span className="highlight-title">
                {props.title}
            </span>
            <span className="highlight-value">
                {props.value}
            </span>
        </div>
    )
}

export default AnalyticHighlightComponent;