import React from 'react'
import './Counter.css'

const Counter = ({count}) => {
    if (count === 6 ) return null;
    if(count<0) count=0
    return (
        <div className='counter-div'>
           <h2 className='counter'>{count}</h2>
        </div>
    )
}

export default Counter