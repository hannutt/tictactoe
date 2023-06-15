import React ,{Component} from 'react'
import {variables} from './Variables.js'

export class GameHistory extends Component {

    constructor(props) {
        super(props);

        this.state={
            itemsList : []
           
        };
    }

   
    refreshList() {
        //variables on variables.js tiedostossa oleva muuttuja johon on tallennettu
        // API-backendin url, joita käytetään fetch metodin parametreina*/}
        fetch(variables.ApiUrl)
        //haettu data muutetaan jsoniksi
        .then(response=>response.json())
        //item muuttujan sisältö lisätään itemslist listaan.
        .then (item=>{
            this.setState({itemsList:item})
        })
    }

    componentDidMount() {
        //funktion kutsu
        this.refreshList()

    }

    
    render() {
        const {
            itemsList
        }=this.state
    return(

        <div className = "res">
        <h2> See game results </h2>  {
            //map metodilla käydään tulosjoukko läpi ja näytetään se sivulla
            itemsList.map((item) => ( 
            <ol key = { item.ResultId } >
                Result time: { item.ResultTime }, 
                Result: { item.Result }, 
                </ol>
            ))
        }
    </div>
);
}
}