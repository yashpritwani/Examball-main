import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const UrgeWithPleasureComponent = () => {

    const testObj =JSON.parse(localStorage.getItem('testObj'))

  
  // console.log(testObj)
  // console.log("🚀 ~ file: timer.js ~ line 4 ~ testObj", testObj)
  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;
  //const startTime = Date.now(); // use UNIX timestamp in seconds
  //const endTime =  Date.now(); // use UNIX timestamp in seconds
  
  const startTime = Date.parse(testObj.testStartTime); // use UNIX timestamp in seconds
  // console.log("🚀 ~ file: timer.js ~ line 8 ~ startTime ", startTime)
  
  const endTime =startTime+(parseInt(testObj.testTotalTime)*60000); // use UNIX timestamp in seconds
  // console.log("🚀 ~ file: timer.js ~ line 10 ~ endTime",endTime)
  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;
  
  const remainingTime = endTime - startTime;
  const timerProps = {
    isPlaying: true,
    size: 90,
    strokeWidth: 6
  };
  return (
  <CountdownCircleTimer
  {...timerProps}
  colors={[["#208A2B"]]}
  duration={hourSeconds}
  initialRemainingTime={remainingTime % hourSeconds}
  onComplete={(totalElapsedTime) => [
    remainingTime - totalElapsedTime > minuteSeconds
  ]}
>
  {({ elapsedTime }) =>
    renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
  }
</CountdownCircleTimer>)
}
const renderTime = (dimension, time) => {
 
  return (
    <div className="time-wrapper" style={{textAlign:'center'}}>
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

export default UrgeWithPleasureComponent;