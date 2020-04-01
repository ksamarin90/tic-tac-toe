import React from 'react';

const style = {
    border: "2px solid darkblue",
    cursor: 'pointer',
    outline: 'none'
}


const Square = ({value, onClick}) => (
    <button style={style} onClick={onClick}>
        {value}
    </button>
)

export default Square;