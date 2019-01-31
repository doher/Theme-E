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

buttonAddRect.addEventListener('click', function addElement() {
    let rect = document.createElement('div'),
        borderColor = 'rgb(' + randomFunc(0, 255) + ',' + randomFunc(0, 255) + ',' + randomFunc(0, 255) + ')',
        bgColor = 'rgb(' + randomFunc(0, 255) + ',' + randomFunc(0, 255) + ',' + randomFunc(0, 255) + ')';

    rect.style.border = '2px solid ' + borderColor;
    rect.style.backgroundColor = bgColor;

    rect.className = 'rect';
    divField.appendChild(rect);
    locateElement(rect);
}, false);

buttonReset.addEventListener('click', function reset() {
    let rect = document.getElementsByClassName('rect'),
        length = rect.length;

    while (length > 0) {
        let element = rect[length - 1];

        element.remove();
        length--;
    }

}, false);

function randomFunc(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function locateElement(element) {
    let coords = setCoords(),
        coorXMin = coords.leftMin,
        coorXMax = coords.leftMax,
        coorYMin = coords.topMin,
        coorYMax = coords.topMax;

    element.style.left = randomFunc(coorXMin, coorXMax) + 'px';
    element.style.top = randomFunc(coorYMin, coorYMax) + 'px';
}

function getCoords(element) {
    let box = element.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function setCoords() {
    let rect = document.querySelector('div.rect'),
        div = document.querySelector('div#field'),
        coords = getCoords(div),
        coorXMin = coords.left,
        coorYMin = coords.top,
        coorXMax = coords.left + div.offsetWidth - rect.offsetWidth,
        coorYMax = coords.top + div.offsetHeight - rect.offsetHeight;

    return {
        leftMin: coorXMin,
        leftMax: coorXMax,
        topMin: coorYMin,
        topMax: coorYMax
    };
}

function mouseMove(eventObj) {
    eventObj = eventObj || window.event;

    let rect = eventObj.target || eventObj.srcElement;


    rect.style.left = moveAt(eventObj).left;
    rect.style.top = moveAt(eventObj).top;

    console.log(moveAt(eventObj).left);
    console.log(moveAt(eventObj).top);
    console.log('mousemove!');
}

function moveAt(eventObj) {
    eventObj = eventObj || window.event;

    let rect = eventObj.target || eventObj.srcElement,
        coords = getCoords(rect),
        shiftX = eventObj.pageX - coords.left,
        shiftY = eventObj.pageY - coords.top;

    return {
        left: eventObj.pageX - shiftX + 'px',
        top: eventObj.pageY - shiftY + 'px'
    };
}

divField.addEventListener('mousedown', function (eventObj) {
    eventObj = eventObj || window.event;

    let rect = eventObj.target || eventObj.srcElement;

    if (rect.className !== 'rect') {
        return;
    }

    moveAt(eventObj);

    console.log('mousedown!');

    document.addEventListener('mousemove', mouseMove, false);
}, false);

divField.addEventListener('mouseup', function (eventObj) {
    eventObj = eventObj || window.event;

    let rect = eventObj.target || eventObj.srcElement;

    if (rect.className !== 'rect') {
        return;
    }

    document.removeEventListener('mousemove', mouseMove, false);
    console.log('mouseup!');
}, false);
