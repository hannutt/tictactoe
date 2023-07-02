import { event } from 'jquery';
import { useState,useRef,useEffect } from "react";
import './index.css';
import './styles.css'
const Puzzle = () => {
  
  
    
    const [puzzle1,setPuzzle1]  =  useState(['A','N',' D'])
   
   
  
   
    return (
      <>
      {
      puzzle1.map((item) => (  
    

        <button className='square'>{item}</button>  
        

        
        
        ))}
        <br/><br/>
        <Letters />
   
      </>
    );
  };

  const Letters = () => {
    const dragItem = useRef();
    const dragOverItem = useRef();
    
    const [list, setList] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'
    , 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);

   
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
   
    return (
      <>
      {
        
      //listan sisältö käänteisessä järjestyksessä
      list.reverse()&&
      list.map((item, index) => (  

        <button className='square'
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={drop}
          key={index}
          draggable>
            {item}
              
        </button>
        
        ))}
        
      
      </>
    );
  };

  const DropZone = (props) => {
    const dragItem2 = useRef()
    const dragOverItem2 = useRef()
    const [dragged,setDragged] = useState(['Ö','Ä','Å'])

    const dragStart = (e, position) => {
      dragItem2.current = position;
      
      console.log(e.target.innerHTML);
    };
   
    const dragEnter = (e, position) => {
      dragOverItem2.current = position;
     
      console.log(e.target.innerHTML);
      
    };
   

    const drop = (e) => {
      
     
      const copyDragged = [...dragged]
      const dragItemContent2 = copyDragged[dragItem2.current];
     
      copyDragged.splice(dragItem2.current, 1);
      copyDragged.splice(dragOverItem2.current, 0, dragItemContent2);
    
      dragItem2.current = null;
      dragOverItem2.current = null;
      setDragged(copyDragged)
      console.log(copyDragged)
    };


    
    
    return (
      <>
      {
        
      //listan sisältö käänteisessä järjestyksessä
      
    dragged.map((item, index) => (  
    <button className='square' onDragStart={(e) => dragStart(e, index)}
    onDragEnter={(e) => dragEnter(e, index)} onDragEnd={drop} key={index} draggable>
      {item}
    </button>
   ))}
    </>
    )
  

 

  } 
    
  
  export default Puzzle