import './WeatherDetails.css';

function WeatherDetails({details}){
    return(
        <section className="weather-details">
            <h2 className="section-label">WEATHER DETAILS</h2>
            <div className="weather-details-grid">
                {details.map((detail) => (
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
    );
};

export default WeatherDetails;