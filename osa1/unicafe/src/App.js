import React, { useState } from 'react'

const Statistics = ({ feedback }) => {
  if(feedback.all === 0){
    return(
      <>
        <div>No feedback given</div>
      </>
    )
  }

  return(
    <table>
      <tbody>
        <StatisticLine text="Good" value={feedback.good}/>
        <StatisticLine text="Neutral" value={feedback.neutral}/>
        <StatisticLine text="Bad" value={feedback.bad}/>
        <StatisticLine text="All" value={feedback.all}/>
        <StatisticLine text="Average" value={feedback.average}/>
        <StatisticLine text="Positive" value={feedback.positive}/>
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value}) => {
  if(text === "Positive"){
    return(
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ handleFeedback, text }) => (
  <button onClick={handleFeedback}>{text}</button>
)

const App = () => {
  const [feedback, setFeedback] = useState({good: 0, neutral: 0, bad: 0, all: 0, average: 0, positive: 0})

  const handleGood = () => {
    const newFeedback = {
      ...feedback,
      good: feedback.good + 1,
      all: feedback.all + 1,
      average: ((feedback.good + 1) - feedback.bad)/(feedback.all + 1),
      positive: ((feedback.good + 1)/(feedback.all + 1))*100
    }
    setFeedback(newFeedback)
  }

  const handleNeutral = () => {
    const newFeedback = {
      ...feedback,
      neutral: feedback.neutral + 1,
      all: feedback.all + 1,
      average: (feedback.good - feedback.bad)/(feedback.all + 1),
      positive: ((feedback.good)/(feedback.all + 1))*100
    }
    setFeedback(newFeedback)
  }

  const handleBad = () => {
    const newFeedback = {
      ...feedback,
      bad: feedback.bad + 1,
      all: feedback.all + 1,
      average: (feedback.good - (feedback.bad + 1))/(feedback.all + 1),
      positive: ((feedback.good)/(feedback.all + 1))*100
    }
    setFeedback(newFeedback)

  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleFeedback={handleGood} text="Good"/>
      <Button handleFeedback={handleNeutral} text="Neutral"/>
      <Button handleFeedback={handleBad} text="Bad"/>
      <h2>Statistics</h2>
      <Statistics feedback={feedback}/>
    </div>
  )
}

export default App;
