import { IDataService } from "../Interfaces/DataService";
import { IUserData } from "../Interfaces/UserData"

export class ImportService {
    static ImportJSON(DataManager: IDataService ,jsonStr: string) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const jsonData = JSON.parse(jsonStr) as IUserData;
        DataManager.setUserData(jsonData);
    }
}