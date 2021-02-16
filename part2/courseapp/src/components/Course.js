import React from 'react';

const Course = (props) => {
  return (
    <div>
      <Header name = {props.course.name} />
      <Content parts = {props.course.parts}/>
      {/* <Total course = {course} /> */}
    </div>
  );
}

const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => {
  // console.log('content', parts);
  const total = parts.reduce((acc, p) => acc + p.exercises, 0);
  return (
    <div>
      {parts.map((part) => 
        <Part key={part.id} part={part} />
      )}
      <p><strong>total of {total} exercises</strong></p>
    </div>
  );
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

// const Total = (course) => {
//   return (
//     <p>
//       Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}
//     </p>
//   );
// };


export default Course
