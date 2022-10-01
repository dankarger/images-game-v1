import React, {useState} from 'react'
import BasicButton from "../../components/Button/Button";
import api from "../../Api/Api";

const HomePage = () => {
    const [image, setImage] = useState('')
    const handleStartButtonClick=async ()=>{
        console.log('start')
      const picture =   api.get('/picture?query=test')
        console.log('pic',picture)
    }


    return (
        <div>
            HOMEPAGE
            <BasicButton label='start' theme={"outlined"} onclick={handleStartButtonClick} />
        </div>
    )
}

export default HomePage