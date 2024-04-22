const NavComponent = (props) => {


    const handleClick = (url) => {
        document.getElementById(url).scrollIntoView({behavior: "smooth"});
    }

    return (

        <nav>


            <div className="navButtons">

                <div className='nav-item' onClick={() => handleClick('scroll2')}>Current</div>

                <div className='nav-item' onClick={() => handleClick('scroll3')}>Weekly</div>

            </div>
        </nav>
    );
}

export default NavComponent;