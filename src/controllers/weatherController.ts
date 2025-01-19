import WeatherService from "@services/weatherService";
import { Response, Request } from "express";

class WeatherController{
    static async index(req: Request, res: Response){
        const result = await WeatherService.getCurrent("HaNoi");
        const data = result.data;
        const {main} = data;
        const {temp} = main;
        const currentTemp = Math.floor(temp - 273);
        res.render('weather', {temp: currentTemp});
    }
}

export default WeatherController;