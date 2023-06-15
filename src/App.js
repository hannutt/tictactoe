/* eslint-disable no-restricted-globals */
import { useState,useRef,useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import React from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './index.css';
import {BrowserRouter,Route,NavLink,Routes} from 'react-router-dom';
import {GameHistory} from './gameHistory'
import { variables } from "./Variables";
const INITIAL_COUNT = 0;
//onSquareclick saadaan Board komponentista
function Square({ value, onSquareClick }) {


  //onclick eli klikkaustapahtumaa kutsutaan onsquareclick funktiota
  // joka suoritetaan klikkauksen yhteydessä
  //Next, you’ll add the onSquareClick function to the Square component’s props:
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}





var startTime
var endTime
//export defaultilla funktio on käytettävissä tiedoston ulkopuolella
export default function Board() {
 



  //statemuuttujan käyttö taulukkona Array(9).fill(null) creates an array with nine
  // elements and sets each of them to null
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [clicks, setClicks] = useState(0);
  //kun clicks on 1 eli yhtä painketta on klikattu käynnistetään timeri eli ajan lakskeminen
  if (clicks === 1) {

    startTime = new Date()
  }
  if (clicks === 9) {
    
    endTime = new Date()
    var timeElapsed = endTime -startTime
    var seconds = ((timeElapsed % 60000 / 1000)).toFixed(0);
    var final = 'Time went: ' + seconds + ' seconds'
    var filled = 'All squares filled';

    
    

  }
  //statemuuttujan oletusarvo on true eli klikkauksella ruutuun tulee X
  //sen jälkeen setXIsNext(!xIsNext) state muuttuu falseksi eli seuraava klikkaus lisää ruutuun o:n

  const [xIsNext, setXIsNext] = useState(true)
  const [xClicks, setxClicks] = useState(0)
  const [oClicks, setyOlicks] = useState(0)


  function handleClick(i) {


    //tarkistus jos squarea on jo klikattu eli siinä on x tai o
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //luodaan kopio squares listasta ja tallennetaan se muuttujaan
    const nextSquares = squares.slice();

    if (xIsNext) {
      //listan  i eli indeksinumero saa arvoksi x:n jos xIsnext staten arvo on true
      nextSquares[i] = "X";
      //kasvatetaan statemuuttujan arvoa jokaiselle klikkauksella
      setClicks(clicks + 1)

      setxClicks(xClicks + 1)




    } else {
      nextSquares[i] = "O";
      setClicks(clicks + 1)
      setyOlicks(oClicks + 1)

    }




    //statemuuttujan asetus
    setSquares(nextSquares)
    //asetetaan statemuuttuja arvon falseksi
    setXIsNext(!xIsNext)


  }
  //funktio palauttaa 9 button elementtiä omissa diveissä
  return (
    <>


      <h3 className="title">Carousel</h3>
      {/* näytetään clicks statemuuttuja arvo divissä*/}
      <center>
      <Carousel width={450} height={480}>
      
        <HistoryBtn />
        {/*blackjack komponenttia kutsutaan changecolor komponentissa, joten sitä ei tarvitse
        kutsut tässä*/}
        <ChangeColor/>
        
 
      
        
      </Carousel>
      <SeeHistory/>
      
      
     
      </center>
      <br></br>
      <center>
      <h3>Tic Tac Toe</h3>
      <div className="info">
          <div className="clicks">{'Total clicks: ' + clicks}</div>
          <div className="filled">{filled}</div>
          <div className="timeWent">{final}</div>

          <div className="Xclicks">X-clicks: {xClicks}</div>

          <div className="Yclicks">O-Clicks:{oClicks}</div>
        </div>
      </center>
      <div className="board-row">


        {/* 
        square komponentin kutsu. huomaa state-muuttujan talukon käyttö numerot 0-8 kertovat paikan taulukossa
        handleclick funktion kutsussa on parametrina listan indeksipaikka eli ja se otetaan
        vastaan i-nimisessä muuttujassa itse funktiossa. nuoli suorittaa funktion

      Now you’ll connect the onSquareClick prop to a function in the Board component that
      you’ll name handleClick. To connect onSquareClick to handleClick you’ll pass a
      function to the onSquareClick prop of the first Square component:  */}

        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />

      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />

      </div>





      {/*komponentille annetaan amountx ominaisuus, joka saa arvokseen xClicks statemuuttujan*/}
      <Statistics amountX={xClicks} />
      <Statistics amountO={oClicks} />

    </>
  );
}


function SeeHistory()
{
  const [historyBtn,setHistoryBtn] = useState(false)
  return (
    <>
    <BrowserRouter>
    <button className="historyBtn" onClick={()=>setHistoryBtn(!historyBtn)}>
      {/*navlinkin linkin allevivvaus pois  style={{textDecoration:'none'}}*/}
    <NavLink style={{textDecoration:'none'}} type="button" to="/gameHistory">See/hide saved results</NavLink>
    </button>
    <Routes>
      {/*ehdollinen reititys*/}
      {historyBtn &&  <Route path='/gameHistory' Component={GameHistory} />}
      
 
    </Routes>
    </BrowserRouter>
  
   
    </>

  )
 
}

function FillInputs (props) {
  return (
    <form>
    <input type="text" id="result" value={props.EndResult}/>
    <input type="text" id="time" value={props.playTime}/>
    <button onClick={()=>addClick()}>Save results</button>
  </form>
  )
 //tulosten tallennus kantaan
  function addClick() {
    const finalRes = props.EndResult
    const finalTime = props.playTime
    fetch(variables.ApiUrl,{
      method:"POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'

      },
      body:JSON.stringify({
        Result:finalRes,
        ResultTime:finalTime
      })

    })
    .then(res=>res.json())
    .then((result=> {
      alert(result)
    }))
    /*
    const options ={
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'},
        body:JSON.stringify({Result:props.endResult,ResultTime:props.playTime})
      };
      fetch(variables.ApiUrl,options)
      .then(response=>response.json())
      .then(data=>this.setState({ResultId:data.id}))*/
} 
}



//välitetään Statistics komponentille propsin avulla Xlicksin arvo
function Statistics(props) {

  Chart.register(CategoryScale);


  const state = {
    labels: ['X-Clicks', 'O-Clikcs'],
    datasets: [
      {
        label: 'X and O Clicks',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [props.amountX, props.amountO],

      }
    ]
  }

  return (
    <div>
      <Bar
        data={state}
        width={15}
        height={5}
        options={{
          title: {
            display: true,
            text: 'Clicks',
            fontSize: 10
          },
          legend: {
            display: true,
            position: 'right',

          }
        }}
      />
    </div>
  );
}




function HistoryBtn() {
  const [show, setShow] = useState(false)
  return <div>
    {/*jos statemuuttuja on true näytetään p-tagin teksti*/}
    {show && <p>Games played on three-in-a-row boards can be traced back to ancient Egypt,
      where such game boards have been found on roofing tiles dating from around 1300 BC</p>}
    {/*buttonia klikattaessa muutetaan statemuuttujan tilaa*/}
    <button onClick={() => setShow(!show)}>Show / hide game history</button>
  </div>

}


function ChangeColor() {
 
  const cssColors = ['#53e068','#a1cfa8','#c7a1cf','#eafcb8']
  var randomSelect = cssColors[(Math.floor(Math.random() * cssColors.length))];
  
  const [clicked,setClicked] = useState(false)
  const [bgColor,setBgColor] = useState('#34e8eb')
  

      return (
      <div>
        {/*settimeoutilla piilotetaan changed p-tagi 3 sekunnin kuluttua koska se on määritelty
        onclickissä, sen suoritus käynnistyy kun buttonia klikataan */}
        <button onClick={()=>{setBgColor(randomSelect);setClicked(!clicked);setTimeout(() => {setClicked(false) },3000)}}>ChangeColor</button>
       {/*jos clicked statemuuttujan arvo on on true näytetään p tagi ja teksti*/}
        {clicked && <p id="changed">Color changed!</p>}
      
         {/*change color lähettää blackjackille bgcolor muuttujan arvon*/}
      <ChangeFont bgColor={bgColor} />
      
      </div>
  )
      }

function ChangeFont(props)
{
  const Fonts =['Comic sans MS','Georgia','Arial','Segoe UI','Courier']
  const [change,setChange] = useState("Verdana")
  var randomFont = Fonts[(Math.floor(Math.random() * Fonts.length))];

  return (
    <div>
      <button onClick={()=>setChange(randomFont)}>Change font</button>
      {/*muuttujien arvojen lähetys BlackJack komponentille*/}
      <BlackJack change={change} bgColor={props.bgColor}/>
      
      
    </div>
  )

}






function BlackJack(props) {
  const wins = []
  const titleUnder10 = ['Club','Diamond','Spade','Heart']
  const titleOver10 = ['Jack','Queen','King']
  var randomTitleUnder = titleUnder10[(Math.floor(Math.random() * titleUnder10.length))]
  var randomTitleOver = titleOver10[(Math.floor(Math.random()*titleOver10.length))]
  const [add, setAdd] = useState(INITIAL_COUNT)
  const [opponent, setOpponent] = useState(0)
  const [gameClicks,setGameClicks] = useState(0)
  const [movesLeft,setMovesLeft] = useState(3)
  const [disabled,setDisabled] = useState(false)
 // const [playerWins,setPlayerWins] = useState(0)
 // const [computerWins,setComputerWins] = useState(0)
  const [cardTitle,setCardTitle] = useState()
  //edellisen state muuttujan arvon näyttävä muuttuja
  const prevCountRef = useRef(INITIAL_COUNT);
  var result = 21
  //absllä lasketaan vähennyslaskun tuloksena saadun luvun absoluuttinen paikka
  var playerDiff = Math.abs(add - result)
  var opponentDiff = Math.abs(opponent - result)
  //generoidaan satunnaisesti joko true tai false arvo
  var canClick = Math.random() < 0.5;
  const date = new Date()
  const yyyy = date.getFullYear();
  var mm = date.getMonth() + 1; // Months start at 0!
  var dd = date.getDate();
  //jos päivä tai kuukausi on yksinumeroinen lisätään eteen nolla
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  var formatDate = dd + '.' + mm + '.' + yyyy;

  

  if (gameClicks===3)
  {
    Check()
  }

    function Check()
  { 
    
    console.log('Yours:' +add)
    if (playerDiff < opponentDiff && add <= result)
  {
   
    alert('"You win"')
    wins.push(formatDate)
    wins.push('You won')
    
   

    }
    else if 
    (opponentDiff < playerDiff && opponent <=result)
    {
      alert('Opponent win')
      wins.push(formatDate)
      wins.push(' Opponent won')
    }
    else if (add > result || opponent > result)
    {
      alert('Over 21, reset game!')
      wins.push(formatDate)
      wins.push( 'points went over 21')
    }

    else {
      alert('reset game')
    }

  }

  
//useEffect eli komponenti tekee jotain renderöinnin jälkeen
  useEffect(() => {
    /**
     * assign the latest render value of count to the ref
     * However, assigning a value to ref doesn't re-render the app
     * So, prevCountRef.current in the return statement displays the
     * last value in the ref at the time of render i.e., the previous state value.
     */
    prevCountRef.current = add;
  }, [add]); //run this code when the value of count changes

  
  
    
  


 if (disabled === true  )
 {
  /*bgColor saadaan props-parametrina change color funktiolta*/
  
  return <div className="blackJack" style={{background: props.bgColor}} >
    
    {/*kahden state muuttujan päivitys onclickillä*/}
    <h3>BlackJack</h3>
 
    <h3>Moves left:{movesLeft}</h3>
  <button onClick={() => { setAdd(add + Math.random() * (14-2)+2); setOpponent(opponent + Math.random()* (14-2)+2);setGameClicks(gameClicks+1);setMovesLeft(movesLeft-1) }}>+</button>
  <button onClick={() => {setAdd(0);setOpponent(0)}}>reset</button>

  <button onClick={()=>setGameClicks(3)}>Check result</button>
  {/*pass painikkeen disablointi*/}
  <button id="pass" title="You can use pass only one time per game" disabled={disabled} onClick={() => {setOpponent(opponent + Math.random() * (14-2)+2);setGameClicks(gameClicks+1);setDisabled(true)}}>Pass</button>
  {/*ehtolause onclick eventissä jos canclick on false, vähennetään statemuuttujasta 2 jos true lisätään 2*/}
   <button title="You might get +2 or -2 points" onClick={()=>canClick ? setAdd(add+2): setAdd(add-2)}>+/-</button>

  {/*<p>card:{cardTitle}</p><br></br>*/}

  <p>You: {add}</p>
  <p>Opponent: {opponent}</p>
  <p>Latest game: {wins[0]} {wins[1]}</p>
  
  


  </div>

 } else {


  return <div className="blackJack" style={{background: props.bgColor,fontFamily:props.change}}>
   
  
    <h3>BlackJack</h3>
   
    <h3>Moves left:{movesLeft}</h3>
     {/*kahden state muuttujan päivitys onclickillä*/}
  <button onClick={() => {setAdd(add + Math.floor(Math.random() * (14-2)+2));add <=10 && (setCardTitle(randomTitleUnder)); add > 10 &&(setCardTitle(randomTitleOver)); setOpponent(opponent + Math.floor(Math.random() * (14-2)+2));setGameClicks(gameClicks+1);setMovesLeft(movesLeft-1) }}>+</button>
  <button onClick={() => {setAdd(0);setOpponent(0);setMovesLeft(3)}}>reset</button>
  <button onClick={() => setGameClicks(3)}>Check result</button>
  {/*
  <button onClick={Check}>Check result</button>*/}
  <button id="pass" title="You can use pass only one time per game" onClick={() => {setOpponent(opponent + Math.floor(Math.random() * 22));setGameClicks(gameClicks+1);setDisabled(true);setMovesLeft(movesLeft-1)}}>Pass</button>
  {/*ehtolause onclick eventissä jos canclick on false, vähennetään statemuuttujasta 2 jos true lisätään 2*/}
  <button title="You might get +2 or -2 points" onClick={()=>canClick ? setAdd(add+2):setAdd(add-2)}>+/-</button>
  
  {/*<p>card: {cardTitle}</p>*/}
  <p>Previous: {prevCountRef.current}</p>
  <p>You: {add}</p>
  <p>Opponent: {opponent}</p><br></br>
  <p>Latest game {wins[0]} {wins[1]}</p>
  <FillInputs playTime={wins[0]} EndResult={wins[1]}/>
  
 
  
  
  </div>
}
}

/*
function checkGuess(event) {
  var id = event.target.id;
  if (id === "1") {
    alert('you clicked button 1')
  } else {
    alert('you clicked button 2')
  }
} */

//return <button className="stats"onClick={() => stats()}>Statistics</button>;


//Now that the players can take turns, you’ll want to show when the game is won and there are no 
//more turns to make. To do this you’ll add a helper function called calculateWinner that takes 
//an array of 9 squares, checks for a winner and returns 'X', 'O', or null as appropriate. 
//Don’t worry too much about the calculateWinner function; it’s not specific to React:

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }

  }
  return null;

}
