
import { useState } from "react"
import React from 'react'

export default function CheckBoxes(props) {

  const [fiveMoves, setFiveMoves] = useState(false)
  const [eightMoves, setEightMoves] = useState(false)
  const [defaultMoves, setDefaultMoves] = useState(3)
 

  //statemuuttujan arvon päivitys valitun checkboxin perusteella
  const handleOnChange = (event,fiveMoves,eightMoves,defaultMoves) => {
    //id-muuttujan määritys, arvo on joko cb5 tai cb8 eli checkboxin id
    //sen perusteella päivitetään state joko arvoon 5 tai 8
    var id = event.target.id
    if (id === 'cb5') {
      setFiveMoves(fiveMoves=5)
      
      
      //set movesLeft saa arvoksi joko fivemoves tai eightmoves statemuuttujan
      //arvoa ei muuten voi asettaa.
      props.setMovesLeft(fiveMoves)

    }

    else if (id === 'cb8') {
      setEightMoves(eightMoves=8)

      
      props.setMovesLeft(eightMoves)
    }

    else if (id===null) {
      setDefaultMoves(3)
      props.setMovesLeft(defaultMoves)
     
    }



  }



  return (
    <div>
      <h3>Moves Left: {props.movesLeft}</h3>

      <label htmlFor="cb5">5 moves</label>
      <input type="checkbox" id="cb5" onChange={handleOnChange} ></input>
      <label htmlFor="cb8">8 moves</label>
      <input type="checkbox" id="cb8" onChange={handleOnChange} ></input>
    </div>

  )
}



