import React from 'react'

const Header = (props) => {
  return(
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Content = (props) => {
  const items = []

  for (const [index, value] of props.parts.entries()){
    items.push(<Part key={index} part={value} />)
  }

  return(
    <>
      {items}
    </>
  )
}

const Part = (props) => {
  return(
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  let total = 0
  props.parts.forEach(item => {
    total += item.exercises
  });

  return(
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
