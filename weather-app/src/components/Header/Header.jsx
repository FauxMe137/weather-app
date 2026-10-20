import './Header.css';

function Header({theme, onToggleTheme, temperatureUnit, onToggleTemperatureUnit, searchQuery, setSearchQuery, onSearchLocation}){
    return(
        <header className="app-header">
            <a href="/" className="app-brand">
                <span className="material-symbols-rounded">partly_cloudy_day</span>
                <span>Axiome Weather</span>
            </a>

            <div className="header-controls">
                <div className="search-placeholder">
                    <form className="location-search" onSubmit={onSearchLocation}>
                        <span className="material-symbols-rounded">search</span>

                        <input
                            type="text"
                            placeholder="Search location..."
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            aria-label="Search location"
                        />

                        <button type="submit" aria-label="Submit location search">
                            <span className="material-symbols-rounded">arrow_forward</span>
                        </button>
                    </form>
                </div>

                <button className="header-button" onClick={onToggleTemperatureUnit} title={`Switch to ${temperatureUnit === 'C' ? 'Fahrenheit' : 'Celsius'}`} type="button" aria-label={`Switch to ${temperatureUnit === 'C' ? 'Fahrenheit' : 'Celsius'}`}>°{temperatureUnit}</button>
                <button className="header-button" onClick={onToggleTheme} title='Toggle theme' type="button" aria-label="Toggle theme">
                    <span className="material-symbols-rounded">{theme === "light" ? "dark_mode" : "light_mode"}</span>
                </button>
            </div>
        </header>
    );
};

export default Header;