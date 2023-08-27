import React from 'react'

const Tags = (props) => {
    const{key,value} =props.data;
  return (
    <div>
      <div className="box" >
        <h5>{value}</h5>
        <h3>{key}</h3>
      </div>
    </div>
  )
}

export default Tags
