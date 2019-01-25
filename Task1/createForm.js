'use strict';

const formDef1 = [
    { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
    { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
    { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
    { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
    {
        label: 'Рубрика каталога:', kind: 'combo', name: 'division',
        variants: [
            { text: 'здоровье', value: 1 },
            { text: 'домашний уют', value: 2 },
            { text: 'бытовая техника', value: 3 }
        ]
    },
    {
        label: 'Размещение:', kind: 'radio', name: 'payment',
        variants: [
            { text: 'бесплатное', value: 1 },
            { text: 'платное', value: 2 },
            { text: 'VIP', value: 3 }
        ]
    },
    { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
    { label: 'Описание сайта:', kind: 'memo', name: 'description' },
    { label: 'Опубликовать:', kind: 'submit' },
];

function createForm(data) {
    let form = document.createElement('form'),
        srcAction = 'http://fe.it-academy.by/TestForm.php',
        table = document.createElement('table'),
        tbody = document.createElement('tbody');

    form.setAttribute('action', srcAction);
    form.setAttribute('name', 'formDef1');
    form.setAttribute('method', 'POST');
    form.setAttribute('target', '_blank');

    data.forEach(element => {
        let td1 = document.createElement('td'),
            td2 = document.createElement('td'),
            td3 = document.createElement('td'),
            tr = document.createElement('tr'),
            name = element.label,
            kind = element.kind,
            input = document.createElement('input'),
            variants = element.variants,
            div = document.createElement('div');

        switch (kind) {
            case 'longtext':
            case 'number':
            case 'shorttext':
                input.setAttribute('type', 'text');
                input.setAttribute('name', element.name);
                input.setAttribute('style', kind === 'longtext' ? 'width: 250px' : 'width: 80px');
                td2.appendChild(input);
                break;

            case 'radio':
                variants.forEach(element => {
                    let span = document.createElement('span'),
                        input = document.createElement('input');

                    input.setAttribute('type', 'radio');
                    input.setAttribute('name', name);
                    input.setAttribute('value', element.value);
                    span.innerHTML = element.text;
                    td2.appendChild(input);
                    td2.appendChild(span);
                });
                break;

            case 'check':
                input.setAttribute('type', 'checkbox');
                input.setAttribute('name', element.name);
                td2.appendChild(input);
                break;

            case 'submit':
                input.setAttribute('type', element.kind);
                input.setAttribute('value', element.label);
                td1.appendChild(input);
                break;

            case 'combo':
                let select = document.createElement('select');

                variants.forEach(element => {
                    let option = document.createElement('option');

                    option.setAttribute('value', element.value);
                    option.innerHTML = element.text;
                    select.appendChild(option);
                });

                td2.appendChild(select);
                break;

            case 'memo':
                let textarea = document.createElement('textarea');

                textarea.setAttribute('name', element.name);
                td2.appendChild(textarea);
                break;
        }

        (element.kind === 'submit') || (td1.innerHTML = name);

        td3.appendChild(div);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    form.appendChild(table);

    return form;
}

let form = createForm(formDef1);

document.body.appendChild(form);

let formTag = document.forms['formDef1'],
    siteName = formTag.elements['sitename'],
    siteUrl = formTag.elements['siteurl'],
    visitors = formTag.elements['visitors'],
    email = formTag.elements['email'],
    votes = formTag.elements['votes'];

validationText(siteName);
validationText(siteUrl);
validationText(visitors);
validationText(email);
validationForm(votes);

function validationForm(item) {
    let input = document.getElementsByTagName('input');

    item.addEventListener('change', function () {

        for (let i = 0; i < input.length; ++i) {
            if (input[i].type === 'text' && !(input[i].value)) {
                let divError = input[i].parentNode.nextSibling.children[0];
                divError.className = 'error';
                divError.innerHTML = 'Поля должны быть заполнены!';
            }
        }
    }, false);
}

function validationText(item) {
    let name = item.name;

    item.addEventListener('blur', function () {
        let divError = this.parentNode.nextSibling.children[0];

        if (!(this.value)) {
            divError.className = 'error';
            divError.innerHTML = 'Введите значение!';
        }
    }, false);

    if (name === 'visitors') {
        item.addEventListener('blur', function () {
            let divError = this.parentNode.nextSibling.children[0];

            if (isNaN(this.value) || !(this.value)) {
                divError.className = 'error';
                divError.innerHTML = 'Введите число!';
            }
        }, false);
    }

    item.addEventListener('focus', function () {
        let divError = this.parentNode.nextSibling.children[0];

        if (divError.className == 'error') {
            divError.className = '';
            divError.innerHTML = '';
        }
    }, false);
}
