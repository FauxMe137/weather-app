import './HourlyForecast.css';

function HourlyForecast({hourly, temperatureUnit, getWeatherIcon, currentTime}){
    if (!hourly) return null;

    const currentHour = new Date().getHours();

    const forecastHours = hourly.time
        .map((time, index) => ({
            time,
            temperature: hourly.temperature_2m[index],
            weatherCode: hourly.weather_code[index],
            isDay: hourly.is_day[index],
        }))
        .filter((hour) => {
            const hourNumber = new Date(hour.time).getHours();
            return hourNumber >= currentHour;
        })
        .slice(0, 12);

    return (
        <section className="hourly-forecast">
            <h2 className="section-label">HOURLY FORECAST</h2>

            <div className="hourly-forecast-list">
                {forecastHours.map((hour) => {
                    const displayedTemperature =
                        temperatureUnit === 'C'
                            ? hour.temperature
                            : Math.round(
                                  ((hour.temperature * 9) / 5 + 32) * 10
                              ) / 10;
                    
                    const isCurrentHour = hour.time.slice(0,13) === currentTime?.slice(0,13);

                    const formattedTime = isCurrentHour ? "Now" : new Date(hour.time)
                        .toLocaleTimeString([], {
                            hour: 'numeric',
                            hour12: true,
                        });

                    return (
                        <article className="hourly-card" key={hour.time}>
                            <p className="hourly-time">
                                {formattedTime}
                            </p>

                            <span className="material-symbols-rounded hourly-icon">
                                {getWeatherIcon(
                                    hour.weatherCode,
                                    hour.isDay
                                )}
                            </span>

                            <p className="hourly-temperature">
                                {displayedTemperature}°{temperatureUnit}
                            </p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default HourlyForecast;