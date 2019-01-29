let divField = document.createElement('div'),
    divButton = document.createElement('div'),
    buttonAddRect = document.createElement('button'),
    buttonReset = document.createElement('button');

divField.id = 'field';
divButton.className = 'btn';
buttonAddRect.setAttribute('name', 'addRect');
buttonAddRect.innerHTML = 'Add Rectangles';
buttonReset.setAttribute('name', 'reset');
buttonReset.innerHTML = 'Reset';

divButton.appendChild(buttonAddRect);
divButton.appendChild(buttonReset);
document.body.appendChild(divField);
document.body.appendChild(divButton);

divField.addEventListener('click', removeRect, false);

buttonAddRect.addEventListener('click', function () {
    let rect = document.createElement('div'),
        borderColor = 'rgb(' + randomFunc(0, 255) + ',' + randomFunc(0, 255) + ',' + randomFunc(0, 255) + ')',
        bgColor = 'rgb(' + randomFunc(0, 255) + ',' + randomFunc(0, 255) + ',' + randomFunc(0, 255) + ')';

    rect.style.border = '2px solid ' + borderColor;
    rect.style.backgroundColor = bgColor;

    rect.className = 'rect';
    divField.appendChild(rect);
    moveRect(rect);
}, false);

buttonReset.addEventListener('click', function () {
    let rect = document.getElementsByClassName('rect'),
        length = rect.length;

    while (length > 0) {
        let element = rect[length - 1];

        element.remove();
        length--;
    }

}, false);

function removeRect(event) {
    event = event || window.event;

    let rect = event.target || event.srcElement;

    if (rect.className == 'rect') {
        rect.parentNode.removeChild(rect);
    }
    
}

function randomFunc(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function getRectCoor() {
    let rect = document.querySelector('div.rect'),
        div = document.querySelector('div#field'),
        coorX = div.offsetWidth - 2 * div.clientLeft - rect.offsetWidth,
        coorY = div.offsetHeight - 2 * div.clientTop - rect.offsetHeight;

    return [coorX, coorY];
}

function moveRect(rect) {
    let coorX = getRectCoor()[0],
        coorY = getRectCoor()[1];

    rect.style.left = randomFunc(0, coorX) + 'px';
    rect.style.top = randomFunc(0, coorY) + 'px';
}