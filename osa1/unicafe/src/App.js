import { useState } from "react";

const Button = ({text, value, handleClick}) => (
  <button onClick={() => handleClick(value + 1)}>{text}</button>
)

const StatisticsLine = ({text, value}) => (
  <tbody><tr><td>{text}</td><td>{value}</td></tr></tbody>
)

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (<p>No feedback given</p>)
  }

  return  (
    <table>
      <StatisticsLine text={'good'} value={good} />
      <StatisticsLine text={'neutral'} value={neutral} />
      <StatisticsLine text={'bad'} value={bad} />
      <StatisticsLine text={'all'} value={good + neutral + bad} />
      <StatisticsLine text={'average'} value={(good - bad) / (good + neutral + bad)} />
      <StatisticsLine text={'positive'} value={''.concat(good / (good + neutral + bad) * 100, ' %')} />
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} value={good} handleClick={setGood} />
      <Button text={'neutral'} value={neutral} handleClick={setNeutral} />
      <Button text={'bad'} value={bad} handleClick={setBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
