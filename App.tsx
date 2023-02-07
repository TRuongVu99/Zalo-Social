import Aplication from '@navigation';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';

function App() {
  return (
    <Provider store={store}>
      <Aplication />
    </Provider>
  );
}

export default App;
