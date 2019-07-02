import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { Switch, Route } from 'react-router-dom';

import routes from '../routes';

import HomeView from './home';

const RootView: React.StatelessComponent<{}> = () => (
  <Fragment>
    <Helmet
      titleTemplate='Image Editor - %s'
      defaultTitle='Image Editor'
    />

    <main>
      <Switch>
        <Route path={routes.ROOT} component={HomeView}/>
      </Switch>
    </main>
  </Fragment>
);

export default RootView;
