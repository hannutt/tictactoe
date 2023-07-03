
import dice1 from "./images/dice1.png";
import dice2 from "./images/dice2.png";
import dice3 from "./images/dice3.png";
import dice4 from "./images/dice4.png";
import dice5 from "./images/dice5.png";
import dice6 from "./images/dice6.png";
import './styles.css'


import { useEffect, useState } from "react";


//import 'bootstrap/dist/css/bootstrap.min.css'
export default function DiceGame(props) {

    var diceImages = [dice1, dice2, dice3, dice4, dice5, dice6]
    var colors = ['blue', 'red', 'green', 'white', 'yellow', 'black', 'purple', 'gray', 'pink', 'brown']
    const [image, setNewImage] = useState(diceImages[0])
    const [image2, setNewImage2] = useState(diceImages[1])
    const [image3, setNewImage3] = useState(diceImages[2])
    const [timesRolled, setTimesRolled] = useState(0)
    const [bgColor, setBgColor] = useState()
    const [pairs, setPairs] = useState(0)
    const [rnd1, setRnd1] = useState(0)
    const [rnd2, setRnd2] = useState(0)
    const [rnd3, setRnd3] = useState(0)
    const [res, setRes] = useState(0)
    const [dices3, setDices3] = useState(false)
    const [MaxLimit, setMaxLimit] = useState(0)
    const [Minlimit, setMinLimit] = useState(0)
    var [results, setResults] = useState(0)

    var [msg,setMsg] = useState("")
    const gameres = []
    var updatedResult = 0



    //setRes toteutetaan useEffectillä, koska muuten tulos näkyisi aina yhden heiton jäljessä
    //näin se näkyy reali-aikaisesti
    useEffect(() => {
        setRes(rnd1 + rnd2)

    }, [rnd1, rnd2])

    const rollDice = () => {
        //kun funktio suoritetaan haetaan localstoragesta key avaimen  arvo ja tallennetaan se answer
        //muuttujaan. Näin saadaan fuktiolle tieto, että anytriple vaihtoehto on valittu
        var answer = localStorage.getItem("key")
        console.log(answer)


        var randomNum1 = Math.floor(Math.random() * 6);
        var randomNum2 = Math.floor(Math.random() * 6);
        var randomNum3 = Math.floor(Math.random() * 6);

        //sanakirja, määritellään mitä arvon randomnum muuttujien luku vastaa
        //eli 0 on 1 jne
        var dict = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 }
        //muuttujaan tallennetaan colors listasta satunnaisesti valittu merkkijono eli väri jota
        //käytetään noppien taustavärinä
        var randomColor = colors[(Math.floor(Math.random() * colors.length))]

        setNewImage(diceImages[randomNum1])
        setNewImage2(diceImages[randomNum2])
        setNewImage3(diceImages[randomNum3])
        setTimesRolled(timesRolled + 1)
        setBgColor(randomColor)
        if (randomNum1 === randomNum2) {
            setPairs(pairs + 1)
        }
        console.log(randomNum1)
        //jos satunnaisluvut löytyvät dict sanakirjasta tallennetaan ne state muuttujiin
        if (randomNum1 in dict && randomNum2 in dict || randomNum1 in dict && randomNum2 && randomNum3 in dict) {
            console.log(dict[randomNum1])
            setRnd1(dict[randomNum1])
            console.log(dict[randomNum2])
            setRnd2(dict[randomNum2])
            setRnd3(dict[randomNum3])
        }
        var num1 =rnd1
        var num2 = rnd2
        var num3 = rnd3
        var result = rnd1 + rnd2 + rnd3

        if (result > 4 && result <= 10) {
                setMsg(msg="you won")
            
        }

        /*
        else if (result > 10 || rnd1 === 3 || rnd2 === 3 || rnd3 === 3) {

                setMsg(msg="you lose")

        }*/
      

        else if (answer==='triple' && num1===3)
        {
            alert("you got 3")
        }

        else if (answer==='triple' && num2===3)
        {
            alert("you got 3")
        }

        else if (answer==='triple' && num3===3)
        {
            alert("you got 3")
        }

        // eslint-disable-next-line no-mixed-operators
       



    }

    return (
        <div className="Dices">
            <h3>Dices</h3>

            <label htmlFor="dice3">Sic Bo</label>
            <input type="checkbox" id="dice3" onChange={() => setDices3(!dices3)}></input>
            {/*checkox ja ehdollinen renderöinti, jos checkbox on valittu näytetään dices3times 
      komponentti*/}
            {dices3 && <Dices3times />}
            {!dices3 && <Dices2Times />}

        </div>
    )

    function DiceResult(props) {
        return (
            <div>
                <p>End result: {props.gameRes}</p>
            </div>
        )
    }

    function Dices2Times() {
        return (
            <div className="container">
                <img className="diceSquare" alt="dice" src={image} style={{ background: bgColor }}></img>
                <div style={{ width: '4px', display: 'inline-block' }} />
                <img className="diceSquare" src={image2} alt="dice" style={{ background: bgColor }}></img>

                <p>You got: {rnd1} {rnd2} </p>
                <p>{res}</p>
                <p>Times rolled: {timesRolled}</p>
                <p>Pairs: {pairs}</p>
                <button type="button" className="DiceBtn" onClick={rollDice}>Roll</button>
            </div>


        )


    }

    function Bets(props) {
        const [MaxSmallBet, setMaxSmallBet] = useState(0)
        const [MinSmallBet, setMinSmallbet] = useState(0)
        const [MaxBigBet, setMaxBigBet] = useState(0)
        const [MinBigBet, setMinBigBet] = useState(0)
        const [cbChecked, setCbChecked] = useState(false)
        //tämä funktio suoritetaan kun checkboksi on valittu stateu muuttujat pitää
        //antaa parametreina että niiden arvoa voi muuttaa
        const handleCheckBox = (event, MaxSmallBet, MinSmallBet, MaxBigBet, MinBigBet, cbChecked) => {
            //muuttujaan tallennetaan valitun checkboksin id-tunnus
            var id = event.target.id



            if (id === 'small') {

                console.log('small bets set')
                setCbChecked(cbChecked = true)
                setMaxSmallBet(MaxSmallBet = 10)
                setMinSmallbet(MinSmallBet = 4)
                //setlimit on dicegame funktion statemuuttuja joka saadaan bets funktion
                //käyttöön props parametrilla.
                props.setMaxLimit(MaxSmallBet)
                props.setMinLimit(MinSmallBet)





            }

            else if (id === "big") {
                setCbChecked(cbChecked = true)
                setMaxBigBet(MaxBigBet = 17)
                setMinBigBet(MinBigBet = 11)
                props.setMaxLimit(MaxBigBet)
                props.setMinLimit(MinBigBet)
            }

            else {
                setCbChecked(cbChecked = false)
            }


        }

        return (
            <div>
                <h3>Min: {props.Minlimit} Max: {props.limit} </h3>
                {/*jos cbchecked on true, eli checkboksi on valittu, näytetään tässä triple komponentti*/}
              

                <label htmlFor="smallbets">Small Bet</label>
                <input type="checkbox" id="small" onChange={handleCheckBox}></input>

                <label htmlFor="bigbets">Big Bet</label>
                <input type="checkbox" id="big" onChange={handleCheckBox}></input>

            </div>
        )

    }

    function Triple(props) {
        const [anyTriple, setAnyTriple] = useState('')
        //jos checkbox on valittu tallennetaan localstorageen key nimisen avaimen pariksi merkkijono triple
        const handleTriple = () => {
            setAnyTriple(!anyTriple)
            localStorage.setItem("key","triple")

        }


        return (
            <div>

                <h4>Sic Bo Triples</h4>
                <label htmlFor="Anytriple">Any triple</label>
                <input type="checkbox" id="Anytriple" onChange={handleTriple}></input>
                {/*jos anytriple arvo on true eli checkboksi on valittu, näytetää TripleAnybtn komponetti
            joka sisältää button elementin*/}
                {anyTriple && <TripleAnyBtn />}

                <label htmlFor="triple">Specfic triple</label>
                <input type="checkbox" id="triple"></input>
            </div>

        )
    }

 


    function TripleAnyBtn(props) {
        



        return (
            <div>
                <button onClick={rollDice}>Roll</button>
            </div>


        )



    }

    function Dices3times(props) {


        return (

            <div className="container">
                <h3> Sic Bo</h3>
                {/*Bets komponenttia käytetään Dice3Times komponentissa eli käytännössä
                näytetään bets komponentit checkboksit ja limit+minlimit statemuuttujat
                limit yms ennen muuttujaa ovat ominaisuuksia joihin talletetaan data*/}
                <Triple />
                <Bets limit={MaxLimit} setMaxLimit={setMaxLimit} Minlimit={Minlimit} setMinLimit={setMinLimit} />

                <img className="diceSquare" alt="dice" src={image} style={{ background: bgColor }}></img>
                <div style={{ width: '4px', display: 'inline-block' }} />
                <img className="diceSquare" alt="dice" src={image2} style={{ background: bgColor }}></img>
                <div style={{ width: '4px', display: 'inline-block' }} />
                <img className="diceSquare" alt="dice" src={image3} style={{ background: bgColor }}></img>
                <p>You got: {rnd1 + rnd2 + rnd3}</p>

                <p>Times rolled: {timesRolled}</p>
                <p>Pairs: {pairs}</p>
                <p> Min Limit: {Minlimit}</p>
                <p> Max Limit: {MaxLimit}</p>
                <DiceResult gameRes={msg}/>


                <button type="button" className="DiceBtn" onClick={rollDice}>Roll</button>
            </div>
        )


    }

   


}

