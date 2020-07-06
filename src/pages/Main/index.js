import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import CardsContainer from '../../components/CardsContainer';
import moment from 'moment';
import dateToday from '../../utils/dateToday';

import './styles.css';

export default function Main() {
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    async function getCards() {
      let date = dateToday();
      let arrayAPODs = [];
      for (let i = 0; i < 7; i++) {
        const response = await api.get('', {
          params: {
            date: `${moment().subtract(i,'days').format('YYYY-MM-DD')}`
          }
        });
        arrayAPODs.push(response.data);
      }
      setCards(arrayAPODs);
      sessionStorage.setItem('sessionApods', JSON.stringify(arrayAPODs));
    }
    if (sessionStorage.getItem('sessionApods') === null) {
      getCards();
    }
    else {
      const apods = JSON.parse(sessionStorage.getItem('sessionApods'));
      let notToday = true;
      apods.map(apod => {
        if(apod.date === dateToday())
        notToday = false;
      })
      if(notToday === true)
      getCards();
      else
      setCards(apods);
    }
  }, [])

  return (
    <div className='content'>
      <h1 className='lastApodsText'>Last APODs</h1>
      <CardsContainer APODs={cards} main={true} />
    </div>
  );
}