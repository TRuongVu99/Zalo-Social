import Aplication from '@navigation';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {MenuProvider} from 'react-native-popup-menu';
function App() {
  return (
    <MenuProvider>
      <Provider store={store}>
        <Aplication />
      </Provider>
    </MenuProvider>
  );
}

export default App;
