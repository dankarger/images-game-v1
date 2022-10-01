import React from 'react'
import BasicButton from "../../components/Button/Button";

const HomePage = () => {

    const handleStartButtonClick=()=>{
        console.log('start')
    }


    return (
        <div>
            HOMEPAGE
            <BasicButton label='start' theme={"outlined"} onclick={handleStartButtonClick} />
        </div>
    )
}

export default HomePage