import React from 'react';

function BackButton(){
    return (
        <button className='back-button' onClick={()=>{window.history.back();}}>Back</button>
    )
}

export default BackButton;
