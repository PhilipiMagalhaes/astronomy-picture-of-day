import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CardsContainer from '../../components/CardsContainer';
import saveUserInStorage from '../../utils/saveUserInStorage';
import maxCharactersVerification from '../../utils/maxCharactersVerification';
import './styles.css';

export default function Profile() {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [apods, setApods] = useState([]);
  const [changeButtonText, setChangeButtonText] = useState('Change my name');
  const history = useHistory();

  useEffect(() => {
    getUser()
  },[])

  function getUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    try {
      setUser(user);
      setName(user.name);
      setApods(user.APODS);
    } catch{
      history.push('/');
    }
  }
  function renderName(editing) {
    if (editing)
      return (
        <input type='text' placeholder='Your name' onChange={(e) => {
          if (maxCharactersVerification(e.target.value)) {
            alert('Max-characters limit reached');
            return;
          }
          setName(e.target.value);
        }
        } />
      );
    else
      return (
        <h1>{name}</h1>
      );
  }
  function apodsText() {
    if (apods.length > 0)
      return 'Your APODs'
    else
      return 'Woow such empty! Try to add some APODs from the main page'
  }
  function endNameEditing() {
    if (editing === true) {
      let currentUser = user;
      currentUser.name = name;
      setUser(currentUser);
      saveUserInStorage(user);
      setEditing(false);
      window.location.reload();
    }
    if (editing === false) {
      setEditing(true);
      setChangeButtonText('Confirm');

    }
  }
  return (
    <>
      <div className='userInformation'>
        <div className='userName'>
          {renderName(editing)}
        </div>
        <button onClick={() => { endNameEditing() }}>{changeButtonText}</button>
        <div className='logOut'>
          <button className='logOutButton' onClick={() => {
            localStorage.removeItem('currentUser');
            history.push('/');
            window.location.reload();
          }}>Log out</button>
        </div>

      </div>

      <div className='apodsContainer'>
        <h1 className='centerMessage'>{apodsText()}</h1>
        <CardsContainer APODs={apods} />
      </div>
    </>
  );
}