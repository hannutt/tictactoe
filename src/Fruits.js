import apple from "./images/apple.png";
import pear from "./images/pear.png";
import rasberry from "./images/raspberry.png";
import banana from "./images/banana.png";
import strawberry from "./images/strawberry.png";
import pineapple from "./images/pineapple.png";
import grapes from "./images/grapes.png";
import peanut from "./images/peanut.png";

import './styles.css'

import { useState } from "react";




export default function FruitGame(props) {
    var fruits = [apple, pear, rasberry, banana, strawberry, pineapple, peanut, grapes]
    var pairs = [apple,strawberry,rasberry,pear,banana]
  
    const [image, setNewImage] = useState()
    const [image2, setNewImage2] = useState()
    const [image3, setNewImage3] = useState()
    const [image4, setNewImage4] = useState()
    const [image5, setNewImage5] = useState()
    const [image6, setNewImage6] = useState()
    const [coins,setCoins] = useState(10)

    //apufunktio suoritetaan kun painiketta jossa se on määritelty onclickin jälkeen klikataan
    //state muuttujat täytyy määritellä sen ulkopuolella
    const Roll = () => {

        // muuttujat saavat satunnaisen luvun väliltä 1-6
        var randomFruit1 = Math.floor(Math.random() * 8);
        var randomFruit2 = Math.floor(Math.random() * 8);
        var randomFruit3 = Math.floor(Math.random() * 8);
        var randomFruit4 = Math.floor(Math.random() * 8);
        var randomFruit5 = Math.floor(Math.random() * 8);
        var randomFruit6 = Math.floor(Math.random() * 8);
        setNewImage(fruits[randomFruit1])
        setNewImage2(fruits[randomFruit2])
        setNewImage3(fruits[randomFruit3])
        setNewImage4(fruits[randomFruit4])
        setNewImage5(fruits[randomFruit5])
        setNewImage6(fruits[randomFruit6])

        
        if (pairs.includes(image,image2,image3,image4,image5,image6))
        {
         
            setCoins(coins+1)
           
        }
        else {
            setCoins(coins-1)
        }
    }

    const RollRight = () => {
        var randomFruit4 = Math.floor(Math.random() * 8);
        var randomFruit5 = Math.floor(Math.random() * 8);
        var randomFruit6 = Math.floor(Math.random() * 8);
        setNewImage4(fruits[randomFruit4])
        setNewImage5(fruits[randomFruit5])
        setNewImage6(fruits[randomFruit6])
        setCoins(coins-1)

    }

    const RollLeft = () => {
        var randomFruit1 = Math.floor(Math.random() * 8);
        var randomFruit2 = Math.floor(Math.random() * 8);
        var randomFruit3 = Math.floor(Math.random() * 8);
        setNewImage(fruits[randomFruit1])
        setNewImage2(fruits[randomFruit2])
        setNewImage3(fruits[randomFruit3])
        setCoins(coins-1)
    }

    function RollOneBtn(event) {
       const [btnDisableLeft,setBtnDisableLeft] = useState(false)
       const [btnDisableRight,setBtnDisableRight] = useState(false)
        const handleCBLeft = (event) =>
        {    var btnId = event.target.id
            //jos checkboksi on valittu, toteutetaan painikkeen disablointi eli state saa true arvon
            if (btnId==='cbLeft' && event.target.checked)
            {
                setBtnDisableLeft(true)

            }
            //muussa tapauksessa eli checkboksia ei ole valittu state saa falsen
            else {
                setBtnDisableLeft(false)
            }
        }
        const handleCbRight = (event) => 
        {
            var btnId = event.target.id
            if (btnId==='cbRight' && event.target.checked)
            {
                setBtnDisableRight(true)

            }
            else {
                setBtnDisableRight(false)
            }

        }

      
        return (
            <div>
                
                <label htmlFor="cbLeft">Lock leftside</label>
                <input type="checkbox" id="cbLeft" value="RollRight" onChange={handleCBLeft}></input>
                <label htmlFor="cbRight">Lock Rightside</label>
                <input type="checkbox" id="cbRight" value="RollRight" onChange={handleCbRight}></input>
                <div className="rollright">
                    <button disabled={btnDisableLeft} onClick={RollRight}>Roll Right</button>
                </div>
                <div className="rollLeft">
                    <button disabled={btnDisableRight} onClick={RollLeft}>Roll Left</button>
                    
                </div>
            </div>

        )
    }

    function SlotMachine() {
      

        
       


        /*  if (image===apple || image2 ===apple || image3 ===apple || image4===apple)
          {
             alert('You got a pair')

          }  */
        return (
            <><div>
                <p>Coins: {coins}</p>
            </div>
            <div className="fruitsContainer">

                    <div className="fruits">

                        <img className='img1' src={image} alt="fruit"></img>

                        <img src={image2} alt="fruit"></img>

                        <img src={image3} alt="fruit"></img>
                    </div>
                    <div className="fruits">
                        <img className='img4' src={image4} alt="fruit"></img>

                        <img src={image5} alt="fruit"></img>

                        <img src={image6} alt="fruit"></img>
                    </div>
                    <button onClick={Roll}>Roll Slot</button>
                </div></>
        )

    }
    return (
        <div>

            <SlotMachine />
            <RollOneBtn />
        </div>
    )



}
























