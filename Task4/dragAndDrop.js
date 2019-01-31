let table = document.createElement('table'),
    tbody = document.createElement('tbody'),
    tr = document.createElement('tr'),
    td1 = document.createElement('td'),
    td2 = document.createElement('td'),
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    input = document.createElement('input'),
    button = document.createElement('button');

div1.setAttribute('id', 'div1');
div2.setAttribute('id', 'div2');
button.innerHTML = 'Add Item';

table.appendChild(tbody);
tbody.appendChild(tr);
td1.appendChild(div1);
td2.appendChild(div2);
tr.appendChild(td1);
tr.appendChild(td2);
document.body.appendChild(table);
document.body.appendChild(input);
document.body.appendChild(button);