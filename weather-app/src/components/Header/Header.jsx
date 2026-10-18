import './Header.css';

function Header(){
    return(
        <header className="app-header">
            <a href="/" className="app-brand">
                <span className="material-symbols-rounded">partly_cloudy_day</span>
                <span>Axiome Weather</span>
            </a>

            <div className="header-controls">
                <div className="search-placeholder">
                    <span className="material-symbols-rounded">search</span>
                    <span>Search location...</span>
                </div>

                <button className="header-button" type="button" aria-label="Temperature unit">°C</button>
                <button className="header-button" type="button" aria-label="Toggle theme">
                    <span className="material-symbols-rounded">dark_mode</span>
                </button>
            </div>
        </header>
    );
};

export default Header;