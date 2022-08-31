import React from 'react'
import Confetti from 'react-confetti'
// import useWindowSize from 'react-use/lib/useWindowSize'
import './App.css';
import Die from './Die.js'
import {nanoid} from 'nanoid'


function App() {

 // const { width, height } = useWindowSize()

  function allNewDice(){
    const newArr= []
      for(let i = 0; i<10; i++){
        const randomNo =  Math.floor(Math.random()* 6 + 1)
        newArr.push({ value : randomNo , isHeld : false, id : nanoid() })                             
      }
      return newArr
      
  }

 
  const [tenzies, setTenzies] = React.useState(false)

  const [numbers, setNumbers] = React.useState(allNewDice())

  const [count, setCount] = React.useState(0)

  React.useEffect(()=> {
    const allEqual = numbers.every(element => element.value === numbers[0].value)
    const allHeld = numbers.every(obj => obj.isHeld === true)
    

      if(allHeld && allEqual){   
        setTenzies(true)
        
      }
      
    
  },[numbers])

  {/* 
  * to track the amount of time it took to win the game check the amount of time it took for tenzies to be tru
 * //// 
  */ }

  React.useEffect(()=>{
     
     setCount(count + 1)
     console.log(count)

  },[tenzies])

  const newNumbers = numbers.map((num)=>{
    return <Die 
    key = {num.id} 
    value = {num.value} 
    isHeld = {num.isHeld}
    holdDice = {()=> holdDice(num.id)}                                                
    />  
  })

  function holdDice(id){
    setNumbers(prevDice => {
      return(
        prevDice.map(dice => {
          if(dice.id === id){
            return {...dice, isHeld: !dice.isHeld} 
          }
           else{
            return dice  
          }
        })
      )
    })
  }
  

  function rollDice(){
  console.log("rollDice function run")
   setNumbers(
      
      numbers.map(dice =>{
        if(dice.isHeld ===true){
            return {...dice, isHeld: true}
        }
        else{
          return {...dice, id: nanoid(), value : Math.floor(Math.random()* 6 + 1)}
        }
      })
    
    )
  }

 function newGame(){
  setNumbers(allNewDice())
  setTenzies(false)
 }  

  return (
    <main>
    {tenzies && <Confetti 
    // width={width}
    // height={height}
    />}

    
    <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

 

<div className='die-container'> 
    {newNumbers}
    
</div>
     { !tenzies ? 
     <button onClick={rollDice} className='dice-btn'>Roll Dice</button>    :
     <button onClick ={newGame}  className = 'dice-btn'>New Game</button>    
     }
    </main>
    

  );
}

export default App;





