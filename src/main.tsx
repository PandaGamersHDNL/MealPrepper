import App from './App';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core';

import './index.css'
import { LocalDataService } from './Services/LocalData';
import { IDataService } from './Interfaces/DataService';

//LATER TODO create factory to decide which service to use
export const DataManager: IDataService = new LocalDataService();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider >
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
