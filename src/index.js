import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/index'
import { Provider } from 'react-redux'
import './index.css';
import CommentsPage from './Pages/CommentsPage';



ReactDOM.render(
  <Provider store={store}>
    <CommentsPage />
  </Provider>,
    

  document.getElementById('root')
);

