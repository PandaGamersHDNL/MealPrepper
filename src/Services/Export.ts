import { IImpexList } from "../Interfaces/ImpexList";
import { IUserData } from "../Interfaces/UserData";
import { DataManager } from "../main";

export class ExportService{
    static ExportJSON(data: IUserData) {
        const aClick = document.createElement("a", {});
        aClick.href="data:text/json;charset=utf-8," +JSON.stringify(data);
        aClick.download = "mealPrepperData.json"
        aClick.click();
        aClick.remove();
    } 

    static ExportListJSON(list: IImpexList){
        const data = DataManager.GetUserData(list);
        console.log(data);
        
        this.ExportJSON(data);
    }
}