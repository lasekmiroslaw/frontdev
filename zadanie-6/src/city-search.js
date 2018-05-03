import cityList from './city-list.json';
import { getCityWeather } from './open-weather.js';
import { elementWithTextFactory } from './helpers';
import { nestedElementFactory } from './helpers';

document.getElementById('search-city').addEventListener('change', search)

function search() {
    const val = document.getElementById('search-city').value.toLowerCase();
    if (val === '') return;
    clearList();

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
            getCityWeather(element.id);
        })
        document.getElementById('search-list').appendChild(searchItem);
    });
}