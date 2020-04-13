import React from 'react'

const Options = (props) => {

    return (
        <div className='optionscontainer' >
            {/* <table className='tb' border='1' >
                <tbody>
                    {props.deck.map((item,key)=>{
                        return (<tr className='row'><td><h3 style={{marginLeft:50}}>{item}</h3></td></tr>)})}
                </tbody>
            </table> */}
            
            {props.deck.map((item,key)=>{
                return (<h3 style={{marginLeft:50}}>{item}</h3>)})}
        </div>
    )
};

export default Options;