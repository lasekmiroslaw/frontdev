import { elementWithTextFactory } from './helpers';
import { nestedElementFactory } from './helpers';
import { appendChildren } from './helpers';
import { addDeleteBtn } from './open-weather';

export const cityTemperature = getFromLocalStorage();

export function getFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('cityTemperature') || "[]");

    return items;
}

export function appendFromLocalStorage() {
    const items = getFromLocalStorage()
    
    items.forEach((storageItem) => {
        const id = Object.keys(storageItem)[0];
        const tableBody = document.getElementById('weather-body');
        const tr = document.createElement('tr');

        const tdIndex = elementWithTextFactory('td');
        const tdCity = elementWithTextFactory('td', storageItem[id].city);
        const tdTemperature = elementWithTextFactory('td', storageItem[id].temperature);
        const tdBtn = addDeleteBtn(id);

        appendChildren(tr, tdIndex, tdCity, tdTemperature, tdBtn);

        tableBody.appendChild(tr);
    });
}

export function setToLocalStorage(item) {
    cityTemperature.push(item);

    localStorage.setItem('cityTemperature', JSON.stringify(cityTemperature));
}

export function deleFromLocalStorage(id) {
    const restValues = getFromLocalStorage().filter((storageItem) => {
        if (!(Object.keys(storageItem)[0] == id)) {
            return storageItem
        };
    });
    console.log(restValues)
    localStorage.setItem('cityTemperature', JSON.stringify(restValues));
}