import './DailyForecast.css';
import { useState } from 'react';

function DailyForecast({ daily, temperatureUnit, getWeatherIcon, getWeatherCondition }) {
    if (!daily) return null;

    const forecastDays = daily.time.map((date, index) => ({
        date,
        weatherCode: daily.weather_code[index],
        maxTemperature: daily.temperature_2m_max[index],
        minTemperature: daily.temperature_2m_min[index],
        precipitationProbability:
            daily.precipitation_probability_max[index],
    }));

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
                        <article className="daily-forecast-row" key={day.date}>
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
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default DailyForecast;