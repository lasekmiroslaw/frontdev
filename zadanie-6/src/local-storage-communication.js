import { createEletementWithText, appendChildren } from './helpers';
import { addDeleteBtn } from './button';

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

        const tdIndex = createEletementWithText('td');
        const tdCity = createEletementWithText('td', storageItem[id].city);
        const tdTemperature = createEletementWithText('td', storageItem[id].temperature);
        const tdBtn = addDeleteBtn(id);

        appendChildren(tr, tdIndex, tdCity, tdTemperature, tdBtn);

        tableBody.appendChild(tr);
    });
}

export function setToLocalStorage(item) {
    const cityTemperature = getFromLocalStorage()
    cityTemperature.push(item);

    localStorage.setItem('cityTemperature', JSON.stringify(cityTemperature));
}

export function deleFromLocalStorage(id) {
    const restValues = getFromLocalStorage().filter((storageItem) => {
        if (!(Object.keys(storageItem)[0] == id)) {
            return storageItem
        };
    });

    localStorage.setItem('cityTemperature', JSON.stringify(restValues));
}