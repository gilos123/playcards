import React from 'react'

const Options = (props) => {
    return props.deck.map((item)=>{
        return <h3 style={{marginLeft:50}}>{item}</h3>
    })
};

export default Options;