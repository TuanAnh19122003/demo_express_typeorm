import axios from "axios";

class WeatherService {
    static async getCurrent(cityName: string){
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather",{
            params: {
                q: cityName,
                appid: "5285c729c594a6af30c66ffeeb2b9f21",
            }
        });
        return response;
    }   
}

export default WeatherService;