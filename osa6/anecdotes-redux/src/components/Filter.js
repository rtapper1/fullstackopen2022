import { useDispatch } from "react-redux"

import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  return (
    <div>filter <input name='filter' onChange={(event) => dispatch(setFilter(event.target.value))}/></div>
  )
}

export default Filter