import React from 'react';
import { Route, Switch } from 'react-router-dom';
import APOD from './pages/APOD';
import Main from './pages/Main';
import Profile from './pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path='/apod' component={APOD} />
      <Route path='/profile' component={Profile} />
    </Switch>
  )
}