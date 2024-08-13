import React from 'react';

function Header(props) {
    return (
        <div className={"flex flex-row h-24 bg-primary items-center justify-center"}>
            <img src={"qsplit_logo.svg"}/>
        </div>
    );
}

export default Header;