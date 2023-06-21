
import dice1 from "./images/dice1.png";
import dice2 from "./images/dice2.png";
import dice3 from "./images/dice3.png";
import dice4 from "./images/dice4.png";
import dice5 from "./images/dice5.png";
import dice6 from "./images/dice6.png";
import './styles.css'

import { useEffect, useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css'
export default function DiceGame () {
    
    var diceImages = [dice1,dice2,dice3,dice4,dice5,dice6]
    var colors = ['blue','red','green','white','yellow','black','purple','gray','pink','brown']
    const [image,setNewImage] = useState(diceImages[0])
    const [image2,setNewImage2] = useState(diceImages[1])
    const [image3,setNewImage3] = useState(diceImages[2])
    const [timesRolled,setTimesRolled] = useState(0)
    const [bgColor,setBgColor] = useState()
    const [pairs, setPairs] = useState(0)
    const [rnd1,setRnd1] = useState(0)
    const [rnd2,setRnd2] = useState(0)
    const [rnd3,setRnd3] = useState(0)
    const [res, setRes] = useState(0)
    const [dices3,setDices3 ] = useState(false)
    //setRes toteutetaan useEffectillä, koska muuten tulos näkyisi aina yhden heiton jäljessä
    //näin se näkyy reali-aikaisesti
    useEffect(() => {
        setRes(rnd1+rnd2)

     },[rnd1,rnd2])

    const rollDice = () => {
        var randomNum1 = Math.floor(Math.random() * 6);
        var randomNum2 = Math.floor(Math.random() * 6);
        var randomNum3 = Math.floor(Math.random() * 5);
        
        //sanakirja, määritellään mitä arvon randomnum muuttujien luku vastaa
        //eli 0 on 1 jne
        var dict ={0:1,1:2,2:3,3:4,4:5,5:6}
        //muuttujaan tallennetaan colors listasta satunnaisesti valittu merkkijono eli väri jota
        //käytetään noppien taustavärinä
        var randomColor = colors[(Math.floor(Math.random() * colors.length))]
        setNewImage(diceImages[randomNum1])
        setNewImage2(diceImages[randomNum2])
        setNewImage3(diceImages[randomNum3])
        setTimesRolled(timesRolled+1)
        setBgColor(randomColor)
        if (randomNum1 === randomNum2)
        {
            setPairs(pairs+1)
        }
        console.log(randomNum1)
        //jos satunnaisluvut löytyvät dict sanakirjasta tallennetaan ne state muuttujiin
        if (randomNum1 in dict && randomNum2 in dict || randomNum1 in dict && randomNum2 && randomNum3 in dict  )
         {
            console.log(dict[randomNum1])
            setRnd1(dict[randomNum1])
            console.log(dict[randomNum2])
            setRnd2(dict[randomNum2])
            setRnd3(dict[randomNum3])
         }
        
         
         
        
        
    }

    return (
        <div className="Dices">
            <h3>Dices</h3>
            <label htmlFor="dice3">3 Dices</label>
      <input type="checkbox" id="dice3" onChange={()=>setDices3(!dices3)}></input>
      {/*checkox ja ehdollinen*/}
      {dices3 && <Dices3times/>}
      {!dices3 && <Dices2Times/>}
      

        
            

            
        </div>
    )

    function Dices2Times()
    {
        return (
            <div className="container">
            <img className="diceSquare" src={image} style={{background:bgColor}}></img>
            <div style={{width:'4px' ,display:'inline-block'}}/>
            <img className="diceSquare" src={image2} style={{background:bgColor}}></img>

            <p>You got: {rnd1} {rnd2} </p>
            <p>{res}</p>
            <p>Times rolled: {timesRolled}</p>
            <p>Pairs: {pairs}</p>
            <button type="button" className="DiceBtn" onClick={rollDice}>Roll</button>
        </div>

            
        )
        
        
    }

    function Dices3times() {

        return (
            
            <div className="container">
                <h3> 3 Dices</h3>
                <img className="diceSquare" src={image} style={{background:bgColor}}></img>
                <div style={{width:'4px' ,display:'inline-block'}}/>
                <img className="diceSquare" src={image2} style={{background:bgColor}}></img>
                <div style={{width:'4px' ,display:'inline-block'}}/>
                <img className="diceSquare" src={image3} style={{background:bgColor}}></img>
                <p>You got: {rnd1} & {rnd2} {rnd3}</p>
                <p>{rnd1+rnd2+rnd3}</p>
                <p>Times rolled: {timesRolled}</p>
                <p>Pairs: {pairs}</p>
                <button type="button" className="DiceBtn" onClick={rollDice}>Roll</button>
            </div>
        )

    }
    
}

