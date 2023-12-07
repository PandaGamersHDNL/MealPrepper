import './App.css'
import '@mantine/core/styles.css';
import { Dashboard } from './Components/Dashboard/Dashboard'
import { createContext, useState } from 'react';
import { IUserData } from './Interfaces/UserData';
import { IDataService } from './Interfaces/DataService';
import { LocalDataService } from './Services/LocalData';

export const UserDataCTX = createContext<{ 
    userData?: IUserData, 
    dataManager: IDataService 
 }>(null);

function App() {
    const [userData, setUserData] = useState<IUserData>();
    const DataManager: IDataService = new LocalDataService(userData!, setUserData);
  
        return ( 
        <UserDataCTX.Provider value={{ userData, dataManager: DataManager }}>
            <Dashboard />
        </UserDataCTX.Provider>
    )
}

export default App
