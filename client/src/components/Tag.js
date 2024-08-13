import React from 'react';

export const colors = {
     Danger: {
        bg: '#FFDADA',
        text: '#FF4C4C'
    },
    Warning: {
        bg: '#FFF7D9',
        text: '#FFB800'
    },
    Success: {
        bg: '#BEECD6',
        text: '#48D97A'
    },

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