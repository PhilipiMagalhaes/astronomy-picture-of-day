import React, {useState, useEffect} from 'react';
import Card from '../Card';
import dateToday from '../../utils/dateToday';

import './styles.css';

export default function CardsContainer({ APODs, main }) {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [currentUserApods, setCurrentApods] = useState([]);

  useEffect(()=>{
    if(currentUser)
    setCurrentApods(currentUser.APODS);
  },[]);
  
  function renderAPODs() {
    if (main === true)
      return (renderMainApods());
    else
      return renderApodsNormally();
  }
  function renderMainApods() {
    const today = dateToday();
    const todayAPOD = APODs.filter(APOD => APOD.date === today);
    APODs = APODs.filter(APOD => APOD.date !== today);  

    return (
      <div>
        <aside className='todayContainer'>
          <h1>From Today</h1>
          {todayAPOD.map(todayAPOD => {
            return (<Card APOD={todayAPOD} main={true} key={todayAPOD.title}/>);
          })}
        </aside>
        <div className='gridContainer main'>
          {APODs.map(APOD => {
            return (<Card APOD={APOD} main={true} key={APOD.title}/>)
          })}
        </div>
      </div>
    );
  }
  function renderApodsNormally() {
    return (
      <div className='gridContainer'>
        {currentUserApods.map(APOD => {
          return (<Card APOD={APOD} key={APOD.title} removeFunc={()=>{
            const user = JSON.parse(localStorage.getItem('currentUser'));
            setCurrentApods(user.APODS);
            setCurrentUser(user);
          }}/>)
        })}
      </div>);
  }

  return (
    <>
      {
        renderAPODs()
      }
    </>
  )

}