import React from 'react'

const QuizAnswer = (props) => {


    const handleClick=(index)=>{
    let ans = document.getElementsByClassName("ans");
       props.sel({ selAnswer:props.item, isSelected: true });
       Array.from(ans).forEach((element,i) => {
        element.classList.remove('selected');
        if(index === i){
            element.classList.add('selected');
        }
       });
    }
  return (
    <>
      <p className='ans' onClick={()=>handleClick(props.index)}>{props.index+1} {". "}{props.item}</p>
    </>
  )
}

export default QuizAnswer
