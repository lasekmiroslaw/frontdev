export function elementWithTextFactory(element, text = '') {
    const elementBody = document.createElement(element);
    const elementText = document.createTextNode(text);
    elementBody.appendChild(elementText)

    return elementBody;
}

export function nestedElementFactory(...elements) {
    const nestedElements = elements.reduce((a, b) => {
        let elementA;
        if(typeof a === 'string') {
             a = document.createElement(a);
        } 
        if (typeof b === 'string') {
            b = document.createElement(b);
        } 
        
        a.appendChild(b);
        
        return a;
    });
    
    return nestedElements;
}

export function appendChildren(element, ...children) {
    children.forEach(child => {
        element.appendChild(child);
    });
}