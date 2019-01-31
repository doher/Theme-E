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
        coorXMin = coords.left + div.clientLeft,
        coorYMin = coords.top + div.clientTop,
        coorXMax = coords.left + div.offsetWidth - div.clientLeft - rect.offsetWidth,
        coorYMax = coords.top + div.offsetHeight - div.clientTop - rect.offsetHeight;

    return {
        leftMin: coorXMin,
        leftMax: coorXMax,
        topMin: coorYMin,
        topMax: coorYMax
    };
}

divField.onmousedown = function (e) {
    e = e || window.event;

    let rect = e.target || e.srcElement;

    if (rect.className !== 'rect') {
        return;
    }

    let div = document.querySelector('div#field'),
        divCoords = getCoords(div),
        coords = getCoords(rect),
        shiftX = e.pageX - coords.left,
        shiftY = e.pageY - coords.top;

    rect.style.zIndex = 1000;
    rect.style.cursor = 'pointer';

    moveAt(e);

    function moveAt(e) {
        rect.style.left = e.pageX - shiftX + 'px';
        rect.style.top = e.pageY - shiftY + 'px';

        if ((e.pageX - shiftX) < (divCoords.left + div.clientLeft)) {
            rect.style.left = div.clientLeft + divCoords.left + 'px';
        }

        if ((e.pageX - shiftX + rect.clientWidth) > (divCoords.left + div.clientWidth)) {
            rect.style.left = divCoords.left + div.clientWidth - rect.clientWidth + 'px';
        }

        if ((e.pageY - shiftY) < (divCoords.top + div.clientTop)) {
            rect.style.top = div.clientTop + divCoords.top + 'px';
        }

        if ((e.pageY - shiftY + rect.clientHeight) > (divCoords.top + div.clientHeight)) {
            rect.style.top = divCoords.top + div.clientHeight - rect.clientHeight + 'px';
        }
    }

    document.onmousemove = function (e) {
        moveAt(e);
    };

    rect.onmouseup = function () {
        document.onmousemove = null;
        rect.onmouseup = null;
        rect.style.zIndex = null;
        rect.style.cursor = 'auto';
    };
}

divField.ondragstart = function () {
    return false;
};
