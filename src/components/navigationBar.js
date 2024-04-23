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

                    props.callback(['flex', 'none', 'flex']);

                    setColor(['rgb(152, 62, 255)', 'black']);

                }
                } style={{ backgroundColor: color[0], color: color[1] }}>Current</div>

                <div className='nav-item' onClick={() => {

                    props.callback(['none', 'flex', 'flex']);

                    setColor(['black', 'rgb(152, 62, 255)']);
                }
                } style={{ backgroundColor: color[1], color: color[0] }}>Weekly</div>

            </div>
        </nav>
    );
}

export default NavComponent;