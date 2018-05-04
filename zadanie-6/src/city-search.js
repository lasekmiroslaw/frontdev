import cityList from './city-list.json';
import { getCityWeather } from './open-weather.js';
import { elementWithTextFactory } from './helpers';
import { nestedElementFactory } from './helpers';
import { getFromLocalStorage } from './local-storage-communication';
import { setToLocalStorage } from './local-storage-communication';

document.getElementById('search-form').addEventListener('submit', search)

function search(e) {
    e.preventDefault();
    const val = document.getElementById('search-city').value.toLowerCase();
    if (val === '') return;

    const results = cityList.filter((city) => {
        return city.name.toLowerCase() === val;
    })

    if (results == false) {
        document.getElementById('message').innerHTML = 'Nie znaleziono tego miasta'
    } else {
        document.getElementById('message').innerHTML = ''
        appendResults(results)
    }
}

function clearList() {
    const searchList = document.getElementById('search-list');

    while (searchList.firstChild) {
        searchList.removeChild(searchList.firstChild);
    }
}

function appendResults(results) {
    results.forEach(element => {
        const searchText = `${element.name} ${element.country} długość geograficzna: ${element.coord.lon} szerokość geograficzna ${element.coord.lat}`;

        const searchLink = elementWithTextFactory('a', searchText)
        const searchItem = nestedElementFactory('li', searchLink)

        searchItem.addEventListener('click', function () {
            clearList();
            const isInArray = getFromLocalStorage().some(storageItem => Object.keys(storageItem)[0] == element.id);
            if(isInArray) {
                document.getElementById('message').innerHTML = 'Wybrane miasto już jest na liście' 
                return;
            }

            getCityWeather(element.id)
        })

        document.getElementById('search-list').appendChild(searchItem);
    });
}