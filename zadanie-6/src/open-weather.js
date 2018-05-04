import axios from 'axios';
import { API_KEY } from './config';
import { averageTemperature } from './average-temperature';
import { elementWithTextFactory } from './helpers';
import { nestedElementFactory } from './helpers';
import { appendChildren } from './helpers';
import { cityTemperature } from './local-storage-communication';
import { setToLocalStorage } from './local-storage-communication';
import { deleFromLocalStorage } from './local-storage-communication';


export function getCityWeather(cityId, apiKey = API_KEY) {
    return axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&lang=pl&APPID=${apiKey}`)
        .then(result =>  {
            const weatherList = result.data.list;
            const temperatureSum = weatherList.map(item => item.main.temp).reduce((a, b) => a + b, 0)

            const tableBody = document.getElementById('weather-body');
            const tr = document.createElement('tr');

            const cityId = result.data.city.id;
            const cityName = result.data.city.name;
            const cityTemperature = `${averageTemperature(temperatureSum, weatherList.length)}  \u00B0C`;

            const tdIndex = elementWithTextFactory('td');
            const tdCity = elementWithTextFactory('td', cityName);
            const tdTemperature = elementWithTextFactory('td', cityTemperature);           
            const tdBtn = addDeleteBtn(cityId);

            const item = { [cityId]: { city: cityName, temperature: cityTemperature } };
            setToLocalStorage(item);

            appendChildren(tr, tdIndex, tdCity, tdTemperature, tdBtn);

            tableBody.appendChild(tr);
        }).catch((error) => {
            console.log(error);
            document.getElementById('message').innerHTML = 'Nie udało się wczytać danych, przepraszamy';
        });
} 

export function addDeleteBtn(id) {
    const deleteBtn = elementWithTextFactory('button', 'usuń')
    const tdBtn = nestedElementFactory('td', deleteBtn);  

    deleteBtn.setAttribute('id', id);
    deleteBtn.addEventListener('click', () => {
        deleteBtn.parentNode.parentNode.remove();
        deleFromLocalStorage(id);
    });

    return tdBtn;
}


