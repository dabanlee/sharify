// utils/index.js

export function getMeta(name) {
    let metas = document.querySelectorAll('meta'),
        content,
        metaArray = Array.prototype.slice.call(metas);
    metaArray.map(item => {
        if (item.name == name) {
            content = item.content;
        }
    });
    return content;
}

export function getImage() {
    let body = document.querySelector('body'),
        image = document.querySelector('img'),
        src = image.src || image.getAttribute('src');
    return src || '';
}

export function query(selector) {
    return document.querySelector(selector);
}

export function extend() {
    var i,
        len = arguments.length,
        property;
    for(i = len - 1; i > 0; i --) {
        if(typeof arguments[i] !== 'object') {
            throw Error('The parameter of the method extend() must be an object.');
        }
        for(property in arguments[i]) {
            arguments[i - 1][property] = arguments[i][property];
        }
    }
    return arguments[0];
}
