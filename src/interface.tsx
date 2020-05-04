export interface IWeather {
    "coord": ICoor,
    "weather": IWeatherDetails[],
    "base": string,
    "main": IWeatherMain,
    "visibility": number,
    "wind"?: IWeatherWind,
    "rain"?: any,
    "clouds"?: any,
    "dt": number,
    "sys": IWeatherSys,
    "timezone": number,
    "id": number,
    "name": string,
    "cod": number,
    "message"?: string
}

export interface IWeatherMain {
    "temp": number,
    "feels_like": number,
    "temp_min": number,
    "temp_max": number,
    "pressure": number,
    "humidity": number
}

export interface IWeatherSys {
    "type": number,
    "id": number,
    "country": string,
    "sunrise": number,
    "sunset": number
}

export interface IWeatherWind {
    "speed": number,
    "deg": number
}

export interface IWeatherDetails {
    "id": number,
    "main": string,
    "description": string,
    "icon": string
}

export interface ICoor {
    "lon": number,
    "lat": number
}