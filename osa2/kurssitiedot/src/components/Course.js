const Part = ({part}) => (
    <p>{part.name} {part.exercises}</p>
  )
  
  const Header = (props) => (
    <h2>{props.course}</h2>
  )
  
  const Content = ({parts}) => (
    <>
    {parts.map(p => <Part key={p.id} part={p} />)}
    </>
  )
  
  const Total = ({parts}) => (
    <p><b>Number of exercises {parts.reduce((count, part) => count + part.exercises, 0)}</b></p>
  )
  
  const Course = ({courses}) => {
    return courses.map(course => (
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))
  }

  export default Course