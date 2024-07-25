import React from 'react';

export const colors = {
    Success: {
        bg: '#b6ffe3',
        text: '#27c427'
    },
    Warning: {
        bg: '#ffe7ac',
        text: '#be8300'
    },
    Danger: {
        bg: '#ff9b9b',
        text: '#d50000'
    }
}
function Tag({text,color}) {
    return (
        <div className={`px-3 py-1 rounded-full text-sm font-bold flex flex-row items-center justify-center `}
            style={{backgroundColor: colors[color].bg, color: colors[color].text}}>
            {text}
        </div>
    );
}

export default Tag;