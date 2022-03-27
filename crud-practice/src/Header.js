import React from "react";

const Header = (props) => {
    return (
    <header>
        <h1>
            <a href = '/' onClick={(event)=>{
                event.preventDefault();
                props.onChange()
            }}>{props.title}</a>
        </h1>
    </header>
    )
}

export default Header;