import apple from "./images/apple.png";
import pear from "./images/pear.png";
import rasberry from "./images/raspberry.png";
import banana from "./images/banana.png";
import strawberry from "./images/strawberry.png";
import pineapple from "./images/pineapple.png";
import grapes from "./images/grapes.png";
import peanut from "./images/peanut.png";
import crown from "./images/crownCoin.png"
import token from "./images/token.png"
import diamond from "./images/diamond.png"
import './styles.css'
import Modal from './Modal'
import start from "./sounds/start.mp3"
import { useState } from "react";




export default function FruitGame(props) {
    var fruits = [apple, pear, rasberry, banana, strawberry, pineapple, peanut, grapes,diamond]
    

    const [openModal,setOpenModal] = useState(false)
  
    const [btnDisableLeft,setBtnDisableLeft] = useState(false)
    const [btnDisableRight,setBtnDisableRight] = useState(false)
    const [rollBtn,setRollBtn] = useState(false)

    const [image, setNewImage] = useState()
    const [image2, setNewImage2] = useState()
    const [image3, setNewImage3] = useState()
    const [image4, setNewImage4] = useState()
    const [image5, setNewImage5] = useState()
    const [image6, setNewImage6] = useState()
    const [coins,setCoins] = useState(5)
    const [coinDouble,setCoinDouble] = useState(false)

    const [isLeftLocked,setLeftLocked] = useState(false)
    const [isRightLocked,setRightLocked] = useState(false)

    const [disableSound,setDisableSound] = useState(false)

    //apufunktio suoritetaan kun painiketta jossa se on määritelty onclickin jälkeen klikataan
    //state muuttujat täytyy määritellä sen ulkopuolella
    const Roll = (event) => {
        
        //jos disablesound state on true niin audio olio ei saa toistettavaa äänitiedostos
        if (disableSound===true) {
            var audio = new Audio()
        }
        else{
            //muussa tapauksessa se saa start tiedoston toistettavaksi
            var audio = new Audio(start)
            audio.play()

        }
      
        // muuttujat saavat satunnaisen luvun väliltä 1-9
        var randomFruit1 = Math.floor(Math.random() * 9);
        var randomFruit2 = Math.floor(Math.random() * 9);
        var randomFruit3 = Math.floor(Math.random() * 9);
        var randomFruit4 = Math.floor(Math.random() * 9);
        var randomFruit5 = Math.floor(Math.random() * 9);
        var randomFruit6 = Math.floor(Math.random() * 9);
        setNewImage(fruits[randomFruit1])
        setNewImage2(fruits[randomFruit2])
        setNewImage3(fruits[randomFruit3])
        setNewImage4(fruits[randomFruit4])
        setNewImage5(fruits[randomFruit5])
        setNewImage6(fruits[randomFruit6])

        //images taulukkoon lisätään kaikki images statet eli valitut kuvatiedostot, että pääpalkinto voidaan
        //tarkastaa images.includes(diamond) komennolla. näin ei tarvitse tarkistaa if/else komennolla
        //jokaista image muuttuujaa
        var images = [image,image2,image3,image4,image5,image6]
       
        //määritettää ehtolauseilla mitkä kuvat ovat pareja image1 on vasemman puoleinen ylin ja image 4
        //oikeanpuoleinen ylin jne.
        if (image===apple && image4===apple)
        {
         
            setCoins(coins+1)
            alert("pairs")
        }

        else if (images.includes(diamond))
        {
            alert("Grand prize")
        }

        else if (image2 === pear && image5 === pear)
        {
            setCoins(coins+1)
            alert("pairs")
        }
        else if (image3 === banana && image6 === banana)
        {
            setCoins(coins+1)
            alert("pairs")
        }
        else {
            setCoins(coins-1)
        }

        if (coins===0)
        {
            setOpenModal(!openModal)
            setBtnDisableLeft(true)
            setBtnDisableRight(true)
            setRollBtn(true)
           
        }
    }

   

    function RollOneBtn(event) {

      
        const handleCB = (event) =>
        {    
            var btnId = event.target.id
            //jos checkboksi on valittu, toteutetaan painikkeen disablointi eli state saa true arvon
            if (btnId==='cbLeft' && event.target.checked)
            {
                setBtnDisableLeft(true)
                setLeftLocked(!isLeftLocked)

            }
            //muussa tapauksessa eli checkboksia ei ole valittu state saa falsen
           else if (btnId==='cbRight' && event.target.checked)
           {
            setRightLocked(!isRightLocked)
           }
        }
       

      
        return (
            <div>
                
                
                <label htmlFor="cbLeft">Lock leftside</label>
                <input type="checkbox" id="cbLeft" value="RollRight" onChange={handleCB}></input>
                <label htmlFor="cbRight">Lock Rightside</label>
                <input type="checkbox" id="cbRight" value="RollRight" onChange={handleCB}></input>
                {/*locked komponetti saa selected ominasuude, jonka arvo on joko right tai left teksti*/}
                {isLeftLocked && <Locked selected={"right"}/>}

                {isRightLocked && <Locked selected={"left"}/>}
                {/*
                <div className="rollright">
                    <button disabled={btnDisableLeft} onClick={RollRight}>Roll Right</button>
                </div>
                <div className="rollLeft">
                    <button disabled={btnDisableRight} onClick={RollLeft}>Roll Left</button>
                    
                </div>
        */}
            </div>

        )
    }

    function Locked(props) {
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
    
        
        //muuttujaan talletetaan propsina saatu selected ominaisuuden arvo
        //sen jälkeen if/else if lauseilla annetaan painikkeelle onclick funktio
        var sel = props.selected
        if (sel==="right")
        {
            return (
                <button onClick={RollRight}>Roll right</button>
            )
        }
        else if (sel==="left")
        {
            return (
                <button onClick={RollLeft}>Roll left</button>

            )
            

        }
      
    }

    function DoubleBtn() {
        const handleDouble= () => {
            setCoinDouble(!coinDouble)
        }
        return(
            <div>
                <button onClick={handleDouble}>Double</button>
                {coinDouble && <Double/>}
            </div>
        )
    }

    function Double() {
        //satunnaisluku väliltä 0-1
        var randomMark = Math.floor(Math.random() * 2);
        const marks = [crown,token]
        
        const [coinImage,setCoinImage] = useState()

        const randomCoin = (event) => {
            var id = event.target.id
            //asetetaan kuvaksi marks taulukon kuva indeksinumeron avulla, eli väliltä 0-1
            setCoinImage(marks[randomMark])
        if (id === "crown" && coinImage===crown)
        {
            setCoins(coins+1)
        }
        else if (id==="token" && coinImage===token)
        {
            setCoins(coins+1)

        }

        }

        const Close = () => {

            setCoinDouble(!coinDouble)
        }
        return(
            <div>

            <p>Choose Crown or Token</p>
            <label htmlFor="crown">Crown</label>
            <input type="checkbox"onChange={randomCoin} id="crown" ></input>
            <label htmlFor="token">Token</label>
            <input type="checkbox" id="token" onChange={randomCoin}></input>
            <button onClick={Close}>Close</button>
            <img src={coinImage}/>
            </div>
        )
    }

    function DisableSound()
    {
        return(
            <div>
            <label htmlFor="disableSound">Disable sound</label>
            {/*onChange eli jos checkboksia klikataan niin onchage muuttaa disablesound staten arvoa
            päinvastaiseksi kuin se ennen klikkausta on*/}
            <input type="checkbox" id="disableSound" onChange={()=>setDisableSound(!disableSound)}></input>
            </div>

        )
    }

    function SlotMachine() {
      

        return (
            <><div>
              
                <p>Coins: {coins}</p>
            </div>
            <DisableSound/>
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
                    <button disabled={rollBtn} onClick={Roll}>Roll Slot</button>
                </div></>
        )

    }
    return (
        <div>
            {/*välitetään modal komponentille openModal state muuttuja*/}
            <Modal open={openModal}/>
            <SlotMachine />
            <RollOneBtn />
            <DoubleBtn/>
        </div>
    )



}
























