const NavComponent = (props) => {


    const handleClick = (url) => {
        document.getElementById(url).scrollIntoView({behavior: "smooth"});
    }

    return (

        <nav>
            <div className="navButtons">

                <div className='nav-item' onClick={() => props.callback(['flex', 'none', 'none'], 'https://api.weatherapi.com/v1/current.json?key=7e59edf657214bdbb1c50318242104&q=${location}&aqi=no')}>Current</div>

                <div className='nav-item' onClick={() => props.callback(['none', 'flex', 'none'], 'https://api.weatherapi.com/v1/forecast.json?key=7e59edf657214bdbb1c50318242104&q=${location}&days=7&aqi=no&alerts=no')}>Weekly</div>

            </div>
        </nav>
    );
}

export default NavComponent;