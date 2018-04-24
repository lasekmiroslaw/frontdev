var form = document.getElementById('todo-form');
var input = document.getElementById('todo-text');
var list = document.querySelector('.todo-list');
var items = loadItems();

form.addEventListener('submit', addNewItem);

function loadItems() {
    var items = localStorage.getItem('items');

    if (items !== null) {
        items = items.split(",");

        createLiItems(items);
    } else {
        var items = [
            'Retrieving from localStorage on start',
            'Saving in localStorage',
            'Removing existing items',
            'Adding new todo item'
        ];
        createLiItems(items);
    }

    return items;
}

function createLiItems(items) {
    for (i = 0; i < items.length; i++) {
        var li = document.createElement('li');
        var textNode = document.createTextNode(items[i]);

        li.appendChild(textNode);
        list.appendChild(li);

        addRemoveBtn(li);
    }
}

function addNewItem(event) {
    event.preventDefault();
    if (input.value === '') return

    var li = document.createElement('li');
    var textNode = document.createTextNode(input.value);

    li.appendChild(textNode);
    items.push(li.innerText)
    localStorage.setItem('items', items);

    list.appendChild(li);
    addRemoveBtn(li);

    input.value = '';
}

function addRemoveBtn(li) {
    var btn = document.createElement('button');
    var btnText = document.createTextNode('Remove');

    btn.appendChild(btnText)
    btn.addEventListener('click', function () {
        var itemText = li.childNodes[0].textContent;
        if (confirm('Czy napewno usunąć: ' + itemText)) {
            items.splice((items.indexOf(itemText)), 1)
            li.remove();
            localStorage.setItem('items', items);

            if (items.length === 0) localStorage.removeItem('items')
        }
    });

    li.appendChild(btn);
}