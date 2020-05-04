import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Table from "react-bootstrap/Table";
import {IWeather} from "../../interface";

const getDirection = (degree: number) => {
    return ['North', 'North-West', 'West', 'South-West', 'South', 'South-East', 'East', 'North-East'][Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8];
}

const getTime = (time: number) => {
    return new Date(time * 1000).toString().split(" ")[4];
}


const WeatherTable: React.FC<{ data: IWeather | null }> = ({data}) => {
    if (!data) {
        return null;
    }

    return (
        <div className="weather-result">
            <div className="result-title">
                Weather in <b>{`${data?.name}, ${data?.sys.country}`}</b>
                <span>{`[${data?.coord.lon}, ${data?.coord.lat}]`}</span>
            </div>
            <div>
                <h3>{data?.main.temp}°C (feels like {data?.main.feels_like}°C)</h3>
            </div>
            <Table borderless size="sm" style={{width: '25%'}}>
                <tbody>
                <tr>
                    <td>Humidity</td>
                    <td>{data?.main.humidity}%</td>
                </tr>
                <tr>
                    <td>Pressure</td>
                    <td>{data?.main.pressure}</td>
                </tr>
                <tr>
                    <td>Wind</td>
                    <td>{data?.wind?.speed} m/s {data?.wind?.deg ? `, ${getDirection(data?.wind?.deg)}` : ''}</td>
                </tr>
                <tr>
                    <td>Cloudiness</td>
                    <td>{data?.clouds.all}%</td>
                </tr>
                <tr>
                    <td>Sunrise</td>
                    <td>{data?.sys.sunrise ? getTime(data?.sys.sunrise) : ''}</td>
                </tr>
                <tr>
                    <td>Sunset</td>
                    <td>{data?.sys.sunset ? getTime(data?.sys.sunset) : ''}</td>
                </tr>

                </tbody>
            </Table>
        </div>
    )
}

export default WeatherTable;