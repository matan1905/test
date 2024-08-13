import React from 'react';

function Header(props) {
    return (
        <div className={"flex flex-row h-24 bg-primary items-center justify-center"}>
            <img src={"qsplit_logo.svg"} onClick={() => fetch('/api/reset')}
            />
        </div>
    );
}

export default Header;