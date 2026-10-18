import './App.css';
import Header from './components/Header/Header';

function App(){
    const weather = {
        location: 'Lagos, Nigeria',
        temperature: '29',
        condition: 'Partly Cloudy',
        humidity: '72',
        windSpeed: '14',
        windDirection: 'Southwest',
        precipitation: '0.2',
        pressure: '1012',
        uvIndex: '7'
    };

    const weatherDetails = [
        {
            id: 'humidity',
            label: 'Humidity',
            value: `${weather.humidity}%`,
            icon: 'humidity_percentage',
        },
        {
            id: 'wind-speed',
            label: 'Wind Speed',
            value: `${weather.windSpeed} km/h`,
            icon: 'air',
        },
        {
            id: 'wind-direction',
            label: 'Wind Direction',
            value: weather.windDirection,
            icon: 'explore',
        },
        {
            id: 'precipitation',
            label: 'Precipitation',
            value: `${weather.precipitation} mm`,
            icon: 'rainy',
        },
        {
            id: 'pressure',
            label: 'Pressure',
            value: `${weather.pressure} hPa`,
            icon: 'compress',
        },
        {
            id: 'uv-index',
            label: 'UV Index',
            value: weather.uvIndex,
            icon: 'wb_sunny',
        },
    ];

    return(
        <div className="app">
            <Header/>
            
            <main className="dashboard">
                <section className="current-weather">
                    <div className="current-weather-info">
                        <p className="section-label">CURRENT WEATHER</p>
                        <h1>{weather.location}</h1>
                        <p className="weather-condition">{weather.condition}</p>
                        <p className="current-temperature">
                            {weather.temperature}
                            <span>°C</span>
                        </p>
                    </div>

                    <div className="current-weather-icon" aria-hidden="true">
                        <span className="material-symbols-rounded">partly_cloudy_day</span>
                    </div>
                </section>

                <section className="weather-details">
                    <h2 className="section-label">WEATHER DETAILS</h2>
                    <div className="weather-details-grid">
                        {weatherDetails.map((detail) => (
                            <article className="weather-detail-card" key={detail.id}>
                                <div className="detail-card-heading">
                                    <span className="material-symbols-rounded">{detail.icon}</span>
                                    <h3>{detail.label}</h3>
                                </div>

                                <p className="detail-card-value">{detail.value}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default App;