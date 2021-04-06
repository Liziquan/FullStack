import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course}</h1>
    )
}
  
const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>    
    )
}
  
const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part=><Part name={part.name} exercises={part.exercises} />)}
      </div>
    )
}

const Total = ({ parts }) => {
    const sum = parts.reduce((accumulator,part)=>accumulator+part.exercises,0 )
    return(
      <p>total of {sum} exercises</p>
    ) 
}
  
  const Course = ({courses}) =>{
    return(
      <div>
      {courses.map(course=>(
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
      ))}
      </div>    
    )
  }

  export default Course