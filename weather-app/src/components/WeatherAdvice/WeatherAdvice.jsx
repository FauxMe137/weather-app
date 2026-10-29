import './WeatherAdvice.css';

function WeatherAdvice({
    humidity,
    windSpeed,
    hourly,
    feelsLike,
    uvIndex,
    weatherCode,
    currentTime,
}) {
    const advice = [];

    const currentHourIndex = hourly.time.findIndex(
        (time) => time.slice(0, 13) === currentTime.slice(0, 13)
    );

    const nextSixHours = currentHourIndex === -1
        ? []
        : hourly.precipitation_probability.slice(
            currentHourIndex,
            currentHourIndex + 6
        );

    const validProbabilities = nextSixHours.filter(Number.isFinite);

    const rainProbability = validProbabilities.length > 0
        ? Math.max(...validProbabilities)
        : null;

    // 1. Humidity Advice
    if (humidity >= 70) {
        advice.push({
            id: 'humidity',
            icon: 'humidity_percentage',
            title: 'High Humidity',
            message: 'Stay hydrated and take breaks during strenuous outdoor activities.',
        });
    } else if (humidity <= 30) {
        advice.push({
            id: 'humidity',
            icon: 'humidity_percentage',
            title: 'Low Humidity',
            message: 'Dry air may cause discomfort. Drink water and consider moisturising your skin.',
        });
    } else {
        advice.push({
            id: 'humidity',
            icon: 'humidity_percentage',
            title: 'Comfortable Humidity',
            message: 'Humidity is moderate, making conditions comfortable for most everyday activities.',
        });
    }

    // 2. Wind Advice
    if (windSpeed >= 30) {
        advice.push({
            id: 'wind',
            icon: 'air',
            title: 'Strong Winds',
            message: 'Be cautious outdoors and secure loose objects around your home.',
        });
    } else if (windSpeed >= 15) {
        advice.push({
            id: 'wind',
            icon: 'air',
            title: 'Breezy Conditions',
            message: 'Expect noticeable winds when walking or cycling outdoors.',
        });
    } else {
        advice.push({
            id: 'wind',
            icon: 'air',
            title: 'Light Winds',
            message: 'Light winds are favourable for walking and outdoor exercise.',
        });
    }

    // 3. Outdoor Activity Advice
    if ([95, 96, 99].includes(weatherCode)) {
        advice.push({
            id: 'outdoor',
            icon: 'fitness_center',
            title: 'Stay Indoors',
            message: 'Thunderstorms may be dangerous. Postpone outdoor exercise until conditions improve.',
        });
    } else if ([65, 67, 82].includes(weatherCode)) {
        advice.push({
            id: 'outdoor',
            icon: 'fitness_center',
            title: 'Limit Outdoor Activities',
            message: 'Heavy rain is possible. Consider indoor exercise or postpone outdoor plans.',
        });
    } else if (feelsLike >= 35) {
        advice.push({
            id: 'outdoor',
            icon: 'fitness_center',
            title: 'Take It Easy Outdoors',
            message: 'Hot conditions can increase heat stress. Avoid strenuous activity during the hottest hours.',
        });
    } else {
        advice.push({
            id: 'outdoor',
            icon: 'fitness_center',
            title: 'Good for Outdoor Activities',
            message: 'Conditions look suitable for a walk, light exercise, or an outdoor outing.',
        });
    }

    // 4. Rain Advice
        if (rainProbability === null) {
            advice.push({
                id: 'rain',
                icon: 'rainy',
                title: 'Rain Forecast Unavailable',
                message: 'Check the hourly forecast before making outdoor plans.',
            });
        } else if (rainProbability >= 70) {
            advice.push({
                id: 'rain',
                icon: 'rainy',
                title: 'High Chance of Rain',
                message: 'Rain is likely during the next few hours. Consider taking an umbrella.',
            });
        } else if (rainProbability >= 40) {
            advice.push({
                id: 'rain',
                icon: 'rainy',
                title: 'Rain Possible',
                message: 'There is a chance of rain. Consider taking an umbrella if you are heading out.',
            });
        } else {
            advice.push({
                id: 'rain',
                icon: 'rainy',
                title: 'Low Chance of Rain',
                message: 'Rain is less likely over the next few hours, making outdoor plans easier to manage.',
            });
        }

    // 5. Clothing Advice
    if (feelsLike >= 32) {
        advice.push({
            id: 'clothing',
            icon: 'checkroom',
            title: 'Dress Lightly',
            message: 'Choose lightweight, breathable clothing to help keep cool.',
        });
    } else if (feelsLike >= 24) {
        advice.push({
            id: 'clothing',
            icon: 'checkroom',
            title: 'Light Clothing',
            message: 'Light, comfortable clothing should suit these temperatures.',
        });
    } else if (feelsLike >= 15) {
        advice.push({
            id: 'clothing',
            icon: 'checkroom',
            title: 'Bring a Light Layer',
            message: 'Consider a light jacket, especially if you will be outside for a while.',
        });
    } else {
        advice.push({
            id: 'clothing',
            icon: 'checkroom',
            title: 'Dress Warmly',
            message: 'Wear warm layers to help stay comfortable in the cooler conditions.',
        });
    }

    // 6. UV Advice
    const numericUV = Number(uvIndex);

    if (!Number.isFinite(numericUV)) {
        advice.push({
            id: 'uv',
            icon: 'wb_sunny',
            title: 'UV Information Unavailable',
            message: 'Check the local UV forecast before spending a long time outdoors.',
        });
    } else if (numericUV >= 8) {
        advice.push({
            id: 'uv',
            icon: 'wb_sunny',
            title: 'Very High UV',
            message: 'Seek shade when possible and use sunscreen, protective clothing, and sunglasses.',
        });
    } else if (numericUV >= 6) {
        advice.push({
            id: 'uv',
            icon: 'wb_sunny',
            title: 'High UV',
            message: 'Use sun protection when outdoors, including sunscreen and sunglasses.',
        });
    } else if (numericUV >= 3) {
        advice.push({
            id: 'uv',
            icon: 'wb_sunny',
            title: 'Moderate UV',
            message: 'Consider sunscreen and other sun protection during extended outdoor exposure.',
        });
    } else {
        advice.push({
            id: 'uv',
            icon: 'wb_sunny',
            title: 'Low UV',
            message: 'UV exposure is relatively low, though sun protection may still be useful during long outings.',
        });
    }

    return (
        <section className="weather-advice">
            <h2 className='section-label'>Weather Advice</h2>

            <div className="weather-advice-list">
                {advice.map((item) => (
                    <article className="weather-advice-item" key={item.id}>
                        <span
                            className="material-symbols-rounded weather-advice-icon"
                            aria-hidden="true"
                        >
                            {item.icon}
                        </span>

                        <div className="weather-advice-text">
                            <h3>{item.title}</h3>
                            <p>{item.message}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default WeatherAdvice;