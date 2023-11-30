import { IUserData } from "../Interfaces/UserData"
import { DataManager } from "../main";

export class ImportService {
    static ImportJSON(jsonStr: string) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const jsonData = JSON.parse(jsonStr) as IUserData;
        DataManager.setUserData(jsonData);
    }
}