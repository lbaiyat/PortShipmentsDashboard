
import {baseApiUrl} from "../utils/UrlStore";
export const getAllShipments = () => {
    return fetch(`${baseApiUrl}/shipments/all`)
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
        )
}

export const getDailyShipmentPrices = () => {
    return fetch(`${baseApiUrl}/shipments/daily-shipment-price`)
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
        )
}

export const getDailyShipmentCount = () => {
    return fetch(`${baseApiUrl}/shipments/daily-shipment-count`)
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
        )
}

export const getTotalShipmentsByDestination = () => {
    return fetch(`${baseApiUrl}/shipments/total-shipments-by-destination`)
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
        )
}

export const getTotalValuesByDestination = () => {
    return fetch(`${baseApiUrl}/shipments/total-value-by-destination`)
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
        )
}

export const getTotalShipmentPrice = () => {
    return fetch(`${baseApiUrl}/shipments/total-shipment-price`)
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
        )
}

export const getTotalShipmentCount = () => {
    return fetch(`${baseApiUrl}/shipments/total-shipment-count`)
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
        )
}

export const getDailyAveragePrice = () => {
    return fetch(`${baseApiUrl}/shipments/daily-average-price`)
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
        )
}

export const getDailyAverageShipmentCount = () => {
    return fetch(`${baseApiUrl}/shipments/daily-average-shipment-count`)
        .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
        )
}

