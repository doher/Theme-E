const MenuA = [{
    name: 'Пункт 1',
    submenu: [{
        name: 'Пункт 1.1',
        submenu: [{
            name: 'Пункт 1.1.1',
            url: 'http://www.tut.by'
        }, {
            name: 'Пункт 1.1.2 длинный',
            url: 'http://www.tut.by'
        }]
    }, {
        name: 'Пункт 1.2',
        url: 'http://www.tut.by'
    }, {
        name: 'Пункт 1.3 длинный',
        submenu: [{
            name: 'Пункт 1.3.1',
            url: 'http://www.tut.by'
        }, {
            name: 'Пункт 1.3.2',
            url: 'http://www.tut.by'
        }, {
            name: 'Пункт 1.3.3',
            url: 'http://www.tut.by'
        }, {
            name: 'Пункт 1.3.4 длинный',
            url: 'http://www.tut.by'
        }]
    }]
}, {
    name: 'Пункт 2 длинный',
    url: 'http://www.tut.by'
}, {
    name: 'Пункт 3',
    submenu: [{
        name: 'Пункт 3.1 длинный',
        url: 'http://www.tut.by'
    }, {
        name: 'Пункт 3.2',
        url: 'http://www.tut.by'
    }]
}];

function createList(item) {
    let ul = document.createElement('ul');

    item.forEach(element => {
        let li = document.createElement('li'),
            a = document.createElement('a');

        a.setAttribute('href', element.url || '');
        a.innerHTML = element.name;
        li.appendChild(a);

        if ('submenu' in element) {
            li.appendChild(createList(element.submenu));
        }

        ul.appendChild(li);
    });

    return ul;
}

let div = document.createElement('div');

div.appendChild(createList(MenuA));
document.body.appendChild(div);
