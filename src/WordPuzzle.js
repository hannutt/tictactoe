import { event } from 'jquery';
import { useState,useRef,useEffect } from "react";
import './index.css';
import './styles.css'
const Puzzle = () => {

    var num = Math.floor(Math.random()*2)+1
    const [puzzle1,setPuzzle1]  =  useState(['-','-','-'])
    const [puzzle2,setPuzzle2]  =  useState(['/','/','/'])
    const [puzzle3,setPuzzle3] = useState(['?','?','?'])
    const [puzzle4,setPuzzle4] = useState(['*','*','*'])
    const puzzles=[puzzle1,puzzle2,puzzle3,puzzle4]
    
    //muuttujaan tallennetaan satunnainen numero väliltä 0-3
    var wichPuzzle = Math.floor(Math.random()*3)
    
    return (
      
      <>
      {
      //puzzles taulukosta mapataan alkio eli wichpuzzle väliltä 0-3
      puzzles[wichPuzzle].map((item) => (  
    

        <button className='square' draggable>{item}</button>       
        ))}
        <br/><br/>
        {/*Puzzle komponentti lähettää letters komponentille puzzles taulukon
        eli satunnaisesti valitun taulukossa olevan state muuttuja*/}
        <Letters puzzles={puzzles[wichPuzzle]}/>
        
        
        
   
      </>
    );

   

  
   
   
  };

  const Letters = (props) => {
    const dragItem = useRef();
    const dragOverItem = useRef();
    var [gameMsg,setGameMsg] = useState("Keep going")
    const [list, setList] = useState(['?','?','?','?','?','?','?','?','?','?','?','?']);

   
    const dragStart = (e, position) => {
      dragItem.current = position;
      
      console.log(e.target.innerHTML);
    };
   
    const dragEnter = (e, position) => {
      dragOverItem.current = position;
     
      console.log(e.target.innerHTML);
      
    };
   
   
    const drop = (e) => {
      const copyListItems = [...list];
     
      const dragItemContent = copyListItems[dragItem.current];
     
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    
      dragItem.current = null;
      dragOverItem.current = null;
      setList(copyListItems);
      
    };
    
    const handleClick = (index) => {
      const marks = ["/","-","|","?","X","!"]
     
      var randomSelect = marks[(Math.floor(Math.random() * marks.length))];
      const newList = [...list]
      //index on button elementissä näytettävä merkki
      newList[index] = randomSelect
      if (newList[index] === "X")
      {
        setGameMsg(gameMsg="try again")
        setList(newList)
        

      }
      else
      {
      setGameMsg(gameMsg)
      setList(newList)
      console.log(props.puzzles[0],props.puzzles[1],props.puzzles[2])
      console.log(newList[0],newList[1],newList[2])

      }
      
      
      
      
      if (newList[0]===props.puzzles[0] && newList[1]===props.puzzles[1] && newList[2]===props.puzzles[2])
      {
        setGameMsg(gameMsg="Good")
       
      }
    
    
    }
   
    return (
      <>
      <div>
        {/*status komponentti saa gamemsg ominaisuuden, eli samannimisen statemuuttuja
        komponentti näyttää state muuttuja sisältämän merkkijonon*/}
        <ShowStatus gameMsg={gameMsg}/>
      </div>
      
      {
        
      //listan sisältö käänteisessä järjestyksessä
      list.reverse()&&
      list.map((item, index) => (  

        <button className='square'
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={drop}
          key={index}
          draggable
          onClick={()=>handleClick(index)}>
            {item}
          
              
        </button>
        
        ))}
        
      
      </>
      
    );
  };

  const ShowStatus = (props) => {
    return(
      <div>
      <p>Status:</p>
      <div>{props.gameMsg}</div>
      </div>
    )
  }

  
    
  
  export default Puzzle