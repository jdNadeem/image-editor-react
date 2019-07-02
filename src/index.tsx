import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from "redux";
import { mainReducer } from './reducers';
import thunk from 'redux-thunk';

import Root from './views/index';

import createHistory from 'history/createBrowserHistory';

import { ROOT_NODE } from './constants';
const history = createHistory();
// const createStoreWithMiddleware = createStore(
//   mainReducer,
//   {},
//   applyMiddleware(thunk)
// );
const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore)(mainReducer);
const render = () => {
  ReactDOM.render(
    (
      <Provider store={createStoreWithMiddleware}>
        <Router history={history}>
          <Root />
        </Router>
      </Provider>
    ),
    ROOT_NODE as HTMLElement,
  );
};

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.unmountComponentAtNode(ROOT_NODE as HTMLElement);
    render();
  });
}

render();
