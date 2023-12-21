import './App.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Dashboard } from './Components/Dashboard/Dashboard'
import { createContext, useCallback, useState } from 'react';
import { IUserData } from './Interfaces/UserData';
import { IDataService } from './Interfaces/DataService';
import { LocalDataService } from './Services/LocalData';

export const UserDataCTX = createContext<{ 
    userData?: IUserData, 
    dataManager: IDataService 
 } | null>(null);
//LATER TODO create factory to decide which service to use

function App() {
    const [userData, setUserData] = useState<IUserData>({Ingredients: [], Meals: [] ,Recipes: []});
    const setUserDataM = useCallback(setUserData, []);
    const DataManager: IDataService = new LocalDataService(userData, setUserDataM);
    console.log("app update, ", userData);
    
        return ( 
        <UserDataCTX.Provider value={{ userData, dataManager: DataManager }}>
            <Dashboard />
        </UserDataCTX.Provider>
    )
}

export default App
