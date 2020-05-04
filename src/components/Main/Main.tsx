import React, {useEffect, useState} from "react";
import {IWeather} from "../../interface";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Cookies from "js-cookie";
import WeatherTable from "../WeatherTable";
import Form from "react-bootstrap/Form";


const KEY = '84da04d13229ee7a290560e3b7a7f40d';

const getSearchedCities = () => {
    const cities = Cookies.get('searchedCities');
    if (cities) {
        return JSON.parse(cities);
    }
    return [];
}


const Main: React.FC<{}> = ({}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isSearch, setSearch] = useState<boolean>(true);
    const [data, setData] = useState<IWeather | null>(null);
    const [cityName, setCityName] = useState<string>('');
    const [searchedCities, setSearchedCities] = useState<string[]>(getSearchedCities());
    const [lat, setLat] = useState<string>('');
    const [lng, setLng] = useState<string>('');
    let timeout: NodeJS.Timeout | null = null;

    useEffect(() => {
        setLoading(true);
        setData(null);
        let query = '';
        if (cityName !== '') {
            query = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${KEY}&units=metric`;
        }

        if (lat !== '' && lng !== '') {
            query = `http://api.openweathermap.org/data/2.5/weather?lon=${lng}&lat=${lat}&appid=${KEY}&units=metric`
        }
        if (query !== '') {
            fetch(query)
                .then(resp => resp)
                .then(resp => resp.json())
                .then(response => {
                    setData(response);
                    if (response.cod === 200) {
                        if (cityName) {
                            const uniqueList = Array.from(new Set([...searchedCities, cityName]))
                            setSearchedCities(uniqueList);
                            Cookies.set('searchedCities', uniqueList)
                        } else if (response.name) {
                            const uniqueList = Array.from(new Set([...searchedCities, response.name]))
                            setSearchedCities(uniqueList);
                            Cookies.set('searchedCities', uniqueList)
                        }
                    }
                    setLoading(false);
                })
                .catch(({message}) => {
                    alert(message);
                    setLoading(false);
                    setData(null);
                })
        }
    }, [cityName, lat, lng]);

    const successGeo = (position: any) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
    }

    const errorGeo = () => {
        alert('error')
    }

    const getWeatherByLocation = () => {
        navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
    }

    const changeSearch = () => {
        setSearch(!isSearch);
    }

    const onSelect = (event: any) => {
        setCityName(event.target.value);
    }

    const onSearch = (event: any) => {
        event.persist();
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            setCityName(event.target.value);
        }, 1000)
    }

    return (
        <Container>
            <div className="root">
                <h1>Is It raining?</h1>
                <Row>
                    <Col xs={8}>
                        {isSearch ? (
                            <InputGroup className="mb-3">
                                <FormControl placeholder="Search" onChange={onSearch} />
                            </InputGroup>
                        ) : (
                            <Form>
                                <Form.Group controlId="select">
                                    <Form.Control as="select" custom onChange={onSelect}>
                                        {searchedCities.map((item) => (
                                            <option key={item}>{item}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        )}
                    </Col>
                    <Col xs={4}>
                        <Button variant={isSearch ? 'info' : 'primary'} onClick={changeSearch}>
                            {isSearch ? 'Saved Mode' : 'Search Mode'}
                        </Button>
                        <Button variant="warning" className="by-loc-btn" onClick={getWeatherByLocation}>
                            By location
                        </Button>
                    </Col>
                </Row>
                {!loading && (
                    data && data.cod === 200 ? (
                        <WeatherTable data={data}/>
                    ) : data?.message
                )}
            </div>
        </Container>
    )
}

export default Main;