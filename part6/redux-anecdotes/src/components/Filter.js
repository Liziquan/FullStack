import React from 'react'
import { filter } from '../reducers/filterReducer'
import { connect } from 'react-redux'
const Filter = (props) => {
    const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filterValue = event.target.value
    props.filter({filter:filterValue})
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}


const mapDispatchToProps = {
  filter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter