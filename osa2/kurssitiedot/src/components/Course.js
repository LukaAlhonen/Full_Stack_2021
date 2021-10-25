import React from 'react'

const Header = ({ name }) => (
  <h2>{name}</h2>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => (
  <h4>Total of {parts.reduce((total, part) => part.exercises + total, 0)} exercises</h4>
)

const Course = ({ course }) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
)

export default Course
