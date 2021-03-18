import React, { useState } from 'react'

const getRandomInt= (max)=>(Math.floor(Math.random() * Math.floor(max)))
const DisplayVoted = props => <div>has {props.value} votes</div>
const Anecdotes = props => <div>{props.text}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voted,setVoted]= useState(new Array(anecdotes.length).fill(0))
  const [most,setMost]=useState(selected)
  
  const voteClick = () =>{
    let newVoted = [...voted]
    newVoted[selected]+=1
    setVoted(newVoted)
    if(newVoted[selected]>newVoted[most])
      setMost(selected)
  }
  
  return (
    <div>
      <Anecdotes text={anecdotes[selected]}/>
      <DisplayVoted value={voted[selected]}/>
      <Button handleClick={voteClick} text="vote"/>
      <Button handleClick={()=>setSelected(getRandomInt(anecdotes.length))} text="next anecdote"/>
      <Anecdotes text={anecdotes[most]}/>
      <DisplayVoted value={voted[most]}/>
    </div>
  )
}


export default App