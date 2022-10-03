import React from 'react'

const Counter = ({count})=> {

    if(count===0) return null;
    return(
        <div className='counter-div'>
            {count}
        </div>
    )
}

export default Counter