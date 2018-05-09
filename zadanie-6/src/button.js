import { createEletementWithText, createNestedElements } from './helpers';
import { cityTemperature, setToLocalStorage, deleFromLocalStorage } from './local-storage-communication';

export function addDeleteBtn(id) {
    const deleteBtn = createEletementWithText('button', 'usuń')
    const tdBtn = createNestedElements('td', deleteBtn);

    deleteBtn.setAttribute('id', id);
    deleteBtn.classList.add('btn-outline-red');
    deleteBtn.addEventListener('click', () => {
        deleteBtn.parentNode.parentNode.remove();
        deleFromLocalStorage(id);
    });

    return tdBtn;
}

export function disableButton() {
    const buttons = document.getElementsByTagName('BUTTON');

    Array.from(buttons).forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
    });
}

export function enableButton() {
    const buttons = document.getElementsByTagName('BUTTON');

    Array.from(buttons).forEach(button => {
        button.disabled = false;
        button.classList.remove('disabled');
    });
}