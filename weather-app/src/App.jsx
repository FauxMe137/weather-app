import './App.css';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import Header from './components/Header/Header';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import DailyForecast from './components/DailyForecast/DailyForecast';
import { useCallback, useEffect, useState } from 'react';

function App(){
    const [theme, setTheme] = useState("light");
    const [temperatureUnit, setTemperatureUnit] = useState("C");
    const [searchQuery, setSearchQuery] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function getWeatherCondition(code) {
        if (code === 0) return 'Clear Sky';
        if (code === 1) return 'Mainly Clear';
        if (code === 2) return 'Partly Cloudy';
        if (code === 3) return 'Overcast';

        if ([45, 48].includes(code)) return 'Foggy';

        if ([51, 53, 55].includes(code)) return 'Drizzle';
        if ([56, 57].includes(code)) return 'Freezing Drizzle';

        if ([61, 63, 65].includes(code)) return 'Rain';
        if ([66, 67].includes(code)) return 'Freezing Rain';

        if ([71, 73, 75, 77].includes(code)) return 'Snow';

        if ([80, 81, 82].includes(code)) return 'Rain Showers';
        if ([85, 86].includes(code)) return 'Snow Showers';

        if ([95, 96, 99].includes(code)) return 'Thunderstorm';

        return 'Unknown Conditions';
    }

    function getWindDirection(degrees) {
        const directions = [
            'North',
            'Northeast',
            'East',
            'Southeast',
            'South',
            'Southwest',
            'West',
            'Northwest',
        ];

        return directions[Math.round(degrees / 45) % 8];
    }

    function getCurrentUVIndex(data) {
        const times = data.hourly?.time;
        const values = data.hourly?.uv_index;

        if (!times || !values || !data.current?.time) {
            return 'N/A';
        }

        const currentHour = data.current.time.slice(0, 13);

        const index = times.findIndex(
            (time) => time.slice(0, 13) === currentHour
        );

        return index !== -1 ? values[index] : 'N/A';
    }
    function getWeatherIcon(code, isDay){
        if(code === 0){
            return isDay ? 'wb_sunny' : 'nightlight';
        }

        if(code === 1){
            return isDay ? 'wb_sunny' : 'nightlight';
        }

        if(code === 2){
            return 'partly_cloudy_day';
        }

        if(code === 3){
            return 'cloud';
        }

        if([45,48].includes(code)){
            return 'foggy';
        }

        if([51,53,55,56,57].includes(code)){
            return 'rainy';
        }

        if([61,63,65,66,67,80,81,82].includes(code)){
            return 'rainy';
        }

        if([71,73,75,77,85,86].includes(code)){
            return 'weather_snowy';
        }

        if([95,96,99].includes(code)){
            return 'thunderstorm';
        }

        return 'cloud';
    }

    const fetchWeather = useCallback(
        async(latitude, longitude, cityName) => {
            setLoading(true);
            setError('');

            try {
                const url = new URL(
                    'https://api.open-meteo.com/v1/forecast'
                );

                url.search = new URLSearchParams({
                    latitude: latitude,
                    longitude: longitude,
                    current: [
                        'temperature_2m',
                        'relative_humidity_2m',
                        'apparent_temperature',
                        'is_day',
                        'precipitation',
                        'rain',
                        'showers',
                        'snowfall',
                        'weather_code',
                        'cloud_cover',
                        'pressure_msl',
                        'surface_pressure',
                        'wind_speed_10m',
                        'wind_direction_10m',
                        'wind_gusts_10m',
                    ].join(','),
                    daily: [
                        'weather_code',
                        'temperature_2m_max',
                        'temperature_2m_min',
                        'precipitation_probability_max',
                        'sunrise',
                        'sunset',
                        'uv_index_max',
                    ].join(','),
                    hourly: [
                        'temperature_2m',
                        'weather_code',
                        'is_day',
                        'precipitation_probability',
                        'uv_index',
                        'relative_humidity_2m',
                    ].join(','),
                    forecast_days: '7',
                    timezone: 'auto',
                    wind_speed_unit: 'kmh',
                });

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Unable to retrieve weather data.');
                }

                const data = await response.json();

                if (!data.current) {
                    throw new Error('Weather data is unavailable for this location.');
                }

                const current = data.current;

                setWeather({
                    location: cityName,
                    temperature: current.temperature_2m,
                    condition: getWeatherCondition(current.weather_code),
                    weatherCode: current.weather_code,
                    isDay: current.is_day,
                    feelsLike: current.apparent_temperature,
                    humidity: current.relative_humidity_2m,
                    windSpeed: current.wind_speed_10m,
                    windDirection: getWindDirection(current.wind_direction_10m),
                    precipitation: current.precipitation,
                    pressure: current.surface_pressure,
                    uvIndex: getCurrentUVIndex(data),
                    hourly: data.hourly,
                    currentTime: current.time,
                    daily: data.daily,
                });
            } catch (error) {
                console.error('Weather request failed:', error);
                setError(error.message || 'Something went wrong while fetching the weather.');
            } finally {
                setLoading(false);
            }
        }, []
    );

    async function handleSearchLocation(event) {
        event.preventDefault();

        const city = searchQuery.trim();

        if (!city) {
            return;
        }

        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`
            );

            if (!response.ok) {
                throw new Error('Unable to search for this location.');
            }

            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                console.log('No matching location found.');
                return;
            }

            const result = data.results[0];
            const cityName = `${result.name}, ${result.country}`;

            await fetchWeather(result.latitude, result.longitude, cityName);

            setSearchQuery('');

            console.log('Selected location:', result);
        } catch (error) {
            console.error('Location search failed:', error);
        }
    }

    const weatherDetails = weather ? [
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
    ] : [];

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        async function loadInitialWeather() {
            try {
                const response = await fetch(
                    'https://geocoding-api.open-meteo.com/v1/search?name=Lagos&count=1&language=en&format=json'
                );

                if (!response.ok) {
                    throw new Error('Unable to find Lagos.');
                }

                const data = await response.json();

                if (!data.results || data.results.length === 0) {
                    throw new Error('Lagos could not be found.');
                }

                const result = data.results[0];

                await fetchWeather(
                    result.latitude,
                    result.longitude,
                    `${result.name}, ${result.country}`
                );
            } catch (error) {
                console.error('Initial weather request failed:', error);
                setError(error.message || 'Unable to load initial weather.');
            }
        }

        loadInitialWeather();
    }, [fetchWeather]);

    return(
        <div className="app">
            <Header theme={theme} onToggleTheme={() => {
                setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light");
            }} temperatureUnit={temperatureUnit} onToggleTemperatureUnit={() => {
                setTemperatureUnit((currentUnit) => currentUnit === "C" ? "F" : "C");
            }} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchLocation={handleSearchLocation}/>
            
            <main className="dashboard">
                {loading && !weather && <p>Loading weather...</p>}

                {error && <p role='alert'>{error}</p>}

                {weather && (
                    <>
                        <div className="weather-content">
                            <div className="weather-dashboard">
                                <CurrentWeather location={weather.location} temperature={weather.temperature} condition={weather.condition} temperatureUnit={temperatureUnit} weatherIcon={getWeatherIcon(weather.weatherCode, weather.isDay)} feelsLike={weather.feelsLike}/>
                                <WeatherDetails details={weatherDetails}/>
                            </div>

                            <HourlyForecast hourly={weather.hourly} temperatureUnit={temperatureUnit} getWeatherIcon={getWeatherIcon} currentTime={weather.currentTime} />
                            <DailyForecast daily={weather.daily} temperatureUnit={temperatureUnit} getWeatherIcon={getWeatherIcon} getWeatherCondition={getWeatherCondition} />
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default App;