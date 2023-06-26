import React, { useState }  from "react";
import {Chart} from 'react-google-charts'



export default function Poll () {
    const [liked,setLiked] = useState(0)
    const [notLiked,setNotLiked] = useState(0)
    const [comment,setComment] = useState("")

    const positiveFB = () => {
        setLiked(liked+1)
        localStorage.setItem('Positive: ',JSON.stringify(liked))
       
    }

    const negativeFb = () => {
        setNotLiked(notLiked+1)
        localStorage.setItem('Negative: ',JSON.stringify(notLiked))
        

    }
    const fetchFromStorage=() => {
        const liked = JSON.parse(localStorage.getItem('Positive: '))
        setLiked(liked)
        const notLiked =  JSON.parse(localStorage.getItem('Negative: '))
        setNotLiked(notLiked)

    }
    
        
    
    return(
        <div>
            <h3>Give feedback</h3>
        <button onClick={positiveFB}>Liked it</button><br></br>
        
        <button onClick={negativeFb}>Not liked</button><br></br>
        <button onClick={fetchFromStorage}>Fetch ratings from localStorage</button>
        <p>Positive: {liked}</p>
        <p>Negative: {notLiked}</p>
        
        
        </div>
        
    )
}