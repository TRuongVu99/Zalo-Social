import Aplication from '@navigation';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {MenuProvider} from 'react-native-popup-menu';
import ErrorBoundary from 'react-native-error-boundary';

function App() {
  return (
    <ErrorBoundary>
      <MenuProvider>
        <Provider store={store}>
          <Aplication />
        </Provider>
      </MenuProvider>
    </ErrorBoundary>
  );
}

export default App;
