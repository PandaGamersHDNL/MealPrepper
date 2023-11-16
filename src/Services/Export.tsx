import { IUserData } from "../Interfaces/UserData";

export class ExportService{
    static ExportJSON(data: IUserData) {
        const aClick = document.createElement("a", {});
        aClick.href="data:text/json;charset=utf-8," +JSON.stringify(data);
        aClick.download = "scene.json"
        aClick.click();
        aClick.remove();
    } 
}