import React, { useState } from 'react'
const Display = props => <div>{props.value}</div>
const Statistic = (props)=>(
  <tr>
    <td>{props.text}</td><td>{props.number}</td>
  </tr>
)
const Statistics = (props) => {
  const good=props.good
  const neutral=props.neutral
  const bad=props.bad

  if(good+neutral+bad === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" number={good}/>
        <Statistic text="neutral" number={neutral}/>
        <Statistic text="bad" number={bad}/>
        <Statistic text="all" number={good+neutral+bad}/>
        <Statistic text="average" number={(good-bad)/(good+neutral+bad)}/>
        <Statistic text="positive" number={good/(good+neutral+bad)}/>
      </tbody>
    </table>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Display value="give feedback"/>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Display value="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App