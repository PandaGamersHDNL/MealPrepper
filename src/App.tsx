import './App.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Dashboard } from './Components/Dashboard/Dashboard'
import { createContext, useState } from 'react';
import { IUserData } from './Interfaces/UserData';
import { IDataService } from './Interfaces/DataService';
import { LocalDataService } from './Services/LocalData';

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataCTX = createContext<{ 
    userData: IUserData; 
    dataManager: IDataService; 
    setUserData: React.Dispatch<React.SetStateAction<IUserData>>; 
}| null>(null);
//LATER TODO create factory to decide which service to use

function App() {
    const [userData, setUserData] = useState<IUserData>({Ingredients: [], Meals: [] ,Recipes: []});
    //TODO Make sure this is only created once, Maybe userdata refference will change?
    const DataManager: IDataService = new LocalDataService(userData);
    
        return ( 
        <UserDataCTX.Provider value={{ userData, dataManager: DataManager, setUserData }}>
            <Dashboard />
        </UserDataCTX.Provider>
    )
}

export default App
