import { useState } from "react";

const NavComponent = (props) => {
    const [color, setColor] = useState(['rgb(152, 62, 255)', 'black'])

    const handleClick = (url) => {
        document.getElementById(url).scrollIntoView({ behavior: "smooth" });
    }

    return (

        <nav>
            <div className="navButtons">

                <div className='nav-item' onClick={() => {

                    props.callback(['flex', 'none', 'none'], 'https://api.weatherapi.com/v1/current.json?key=7e59edf657214bdbb1c50318242104&q=${location}&aqi=no');

                    setColor(['rgb(152, 62, 255)', 'black']);

                }
                } style={{ backgroundColor: color[0], color: color[1] }}>Current</div>

                <div className='nav-item' onClick={() => {

                    props.callback(['none', 'flex', 'none'], 'https://api.weatherapi.com/v1/forecast.json?key=7e59edf657214bdbb1c50318242104&q=${location}&days=7&aqi=no&alerts=no');

                    setColor(['black', 'rgb(152, 62, 255)']);
                }
                } style={{ backgroundColor: color[1], color: color[0] }}>Weekly</div>

            </div>
        </nav>
    );
}

export default NavComponent;