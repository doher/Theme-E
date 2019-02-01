let table = document.createElement('table'),
    tbody = document.createElement('tbody'),
    tr = document.createElement('tr'),
    td1 = document.createElement('td'),
    td2 = document.createElement('td'),
    divStorage = document.createElement('div'),
    divTempStorage = document.createElement('div'),
    input = document.createElement('input'),
    buttonAdd = document.createElement('button'),
    buttonReset = document.createElement('button');

divStorage.setAttribute('id', 'storage');
divTempStorage.setAttribute('id', 'tempStorage');
input.setAttribute('type', 'text');
input.setAttribute('id', 'inputItem');
input.setAttribute('value', '');
buttonAdd.setAttribute('class', 'addButton');
buttonReset.setAttribute('class', 'resetItem');
buttonAdd.innerHTML = 'Add Item';
buttonReset.innerHTML = 'Reset';

table.appendChild(tbody);
tbody.appendChild(tr);
td1.appendChild(divStorage);
td2.appendChild(divTempStorage);
tr.appendChild(td1);
tr.appendChild(td2);
document.body.appendChild(table);
document.body.appendChild(input);
document.body.appendChild(buttonAdd);
document.body.appendChild(buttonReset);

let draggedItem = null;

buttonAdd.addEventListener('click', function createItem() {
    let div = document.createElement('div'),
        span = document.createElement('span'),
        tempStorage = document.getElementById('storage'),
        item = document.getElementById('inputItem').value.trim(),
        spanArray = document.getElementsByTagName('span');

    if (item) {
        div.setAttribute('class', 'item');
        div.setAttribute('draggable', 'true');
        span.innerHTML = item;
        div.appendChild(span);

        if (spanArray.length) {
            let isExist = false;

            for (let i = 0; i < spanArray.length; ++i) {
                if (spanArray[i].textContent === item) {
                    isExist = true;
                }
            }

            if (!isExist) {
                tempStorage.appendChild(div);
            }

        } else {
            tempStorage.appendChild(div);
        }
    }
    document.getElementById('inputItem').value = '';
}, false);

buttonReset.addEventListener('click', function reset() {
    let items = document.querySelectorAll('#tempStorage>.item'),
        itemsLength = items.length;

    if (itemsLength) {

        for (let i = 0; i < itemsLength; ++i) {
            divStorage.appendChild(items[i].cloneNode(true));
            items[i].remove();
        }
    }
}, false);

divStorage.addEventListener('dragstart', function itemDragStart(e) {
    e = e || window.event;

    let item = e.target;

    if (item.className !== 'item') {
        return;
    }

    draggedItem = item;
}, false);

divStorage.addEventListener('dragend', function itemDragEnd(e) {
    e = e || window.event;
    draggedItem = null;
}, false);

divTempStorage.addEventListener('dragover', function divDragOver(e) {
    e = e || window.event;
    e.preventDefault();
}, false);

divTempStorage.addEventListener('drop', function divDrop(e) {
    e = e || window.event;
    e.preventDefault();

    if (draggedItem) {
        e.currentTarget.appendChild(draggedItem);
    }

}, false);
