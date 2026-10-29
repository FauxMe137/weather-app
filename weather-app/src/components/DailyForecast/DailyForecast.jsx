import './DailyForecast.css';
import { useState } from 'react';

function DailyForecast({ daily, hourly, temperatureUnit, getWeatherIcon, getWeatherCondition }) {
    const [expandedDay, setExpandedDay] = useState(null);

    if (!daily) return null;

    const forecastDays = daily.time.map((date, index) => {
        const humidityValues = hourly.time.map((time, index) => ({
            date: time.slice(0, 10),
            humidity: hourly.relative_humidity_2m[index]
        })).filter(hour => hour.date === date && hour.humidity != null)
        .map(hour => hour.humidity);

        const averageHumidity = humidityValues.length
            ? Math.round(humidityValues.reduce((total, humidity) => total + humidity, 0) / humidityValues.length)
            : null;

        return {
            date,
            weatherCode: daily.weather_code[index],
            maxTemperature: daily.temperature_2m_max[index],
            minTemperature: daily.temperature_2m_min[index],
            precipitationProbability: daily.precipitation_probability_max[index],
            sunrise: daily.sunrise[index],
            sunset: daily.sunset[index],
            uvIndex: daily.uv_index_max[index],
            averageHumidity
        }
    });

    function formatLocalTime(time){
        if(!time) return '—';

        const [hours, minutes] = time.slice(11, 16).split(":").map(Number);

        const period = hours >= 12 ? "PM" : "AM";
        const hour12 = hours % 12 || 12;

        return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
    };

    return (
        <section className="daily-forecast">
            <h2 className="section-label">7-DAY FORECAST</h2>

            <div className="daily-forecast-list">
                {forecastDays.map((day, index) => {
                    const displayedMaxTemperature =
                        temperatureUnit === 'C'
                            ? day.maxTemperature
                            : Math.round(
                                  ((day.maxTemperature * 9) / 5 + 32) * 10
                              ) / 10;

                    const displayedMinTemperature =
                        temperatureUnit === 'C'
                            ? day.minTemperature
                            : Math.round(
                                  ((day.minTemperature * 9) / 5 + 32) * 10
                              ) / 10;

                    const dayName =
                        index === 0
                            ? 'Today'
                            : new Date(`${day.date}T12:00:00`).toLocaleDateString(
                                  undefined,
                                  { weekday: 'short' }
                              );

                    return (
                        <button type="button" onClick={() => {setExpandedDay(expandedDay === day.date ? null : day.date);}} aria-expanded={expandedDay === day.date} className={`daily-forecast-card ${expandedDay === day.date ? "expanded" : ""}`} key={day.date}>
                            <div className="daily-forecast-main">
                                <p className="daily-forecast-day">{dayName}</p>

                                <span className="material-symbols-rounded daily-forecast-icon">
                                    {getWeatherIcon(day.weatherCode, 1)}
                                </span>

                                <p className="daily-forecast-condition">
                                    {getWeatherCondition(day.weatherCode)}
                                </p>

                                <p className="daily-forecast-temperatures">
                                    <span className="daily-forecast-max">
                                        {Math.round(displayedMaxTemperature)}°
                                    </span>
                                    {"/"}
                                    <span className="daily-forecast-min">
                                        {Math.round(displayedMinTemperature)}°
                                    </span>
                                </p>

                                <p className="daily-forecast-rain">
                                    <span className="material-symbols-rounded">
                                    water_drop
                                    </span>
                                    {day.precipitationProbability ?? '—'}%
                                </p>
                            </div>

                            {expandedDay === day.date && (
                                <div className="daily-forecast-extra">
                                    <div className="daily-forecast-detail">
                                        <span className="material-symbols-rounded">
                                            wb_sunny
                                        </span>
                                        <span>UV Index</span>
                                        <strong>{day.uvIndex ?? '—'}</strong>
                                    </div>

                                    <div className="daily-forecast-detail">
                                        <span className="material-symbols-rounded">
                                            wb_twilight
                                        </span>
                                        <span>Sunrise</span>
                                        <strong>{formatLocalTime(day.sunrise)}</strong>
                                    </div>

                                    <div className="daily-forecast-detail sunset">
                                        <span className="material-symbols-rounded">
                                            wb_twilight
                                        </span>
                                        <span>Sunset</span>
                                        <strong>{formatLocalTime(day.sunset)}</strong>
                                    </div>

                                    <div className="daily-forecast-detail">
                                        <span className="material-symbols-rounded">
                                            humidity_percentage
                                        </span>
                                        <span>Humidity</span>
                                        <strong>
                                            {day.averageHumidity != null
                                                ? `${day.averageHumidity}%`
                                                : '—'}
                                        </strong>
                                    </div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default DailyForecast;