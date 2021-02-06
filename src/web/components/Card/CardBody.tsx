import React, { useState, useEffect, useRef } from 'react';

const CardBody = (props) => {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const countRef = useRef(null)
  //const elementsRef = useRef((props.data) ? props.data.map(() => createRef()) : null);
  
  useEffect(() => {
    if(props.parentType === 'In-Progress' ) {
      handleStart();
    }
  }, [])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }


  const handleReset = () => {
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
  }

  const handleAction = (obj, type) => {
    if(type === 'In-Progress' ) {
      obj.time = timer;
      handleReset();
      props.onChildClick(obj)
    } else {
      props.onChildClick(obj)
    }
  }

  const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }
  return (
    <React.Fragment>     
      <div className="card draggable shadow-sm" >
        <div className="card-body p-2">
          <div className="card-title">
            <img src="//placehold.it/30" className="rounded-circle float-right" />
            <a className="lead font-weight-light">{props.bodyObj.cardNumber}</a>
            {props.bodyObj.type === 'inprogress' && <p>{formatTime(timer)}</p> }
            {props.bodyObj.type === 'complete' && <p>${`${props.bodyObj.price}`}</p> }
          </div>
          <p>
            {props.bodyObj.cardDescription}
          </p>
          {(props.bodyObj.type !== 'complete') && 
            <button 
              onClick={() => handleAction(props.bodyObj, props.parentType)} 
              className="btn btn-primary btn-sm">{(props.bodyObj.type === 'todo') ? 'Start' : (props.bodyObj.type === 'inprogress') ? 'Resolve' : ''}
            </button>
          }
        </div>
      </div>        

    </React.Fragment>
  );
};
export default CardBody;
