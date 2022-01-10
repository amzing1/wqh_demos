export function findParentNode(target: HTMLElement, className: string): HTMLElement {
    
    while(target && target.className !== className) {
        target = target.parentNode as HTMLElement;
    }

    return target;
}

export function createItem(inner: string): HTMLElement {
    const div: HTMLElement = document.createElement('div');
    div.className = "todo-item";
    div.innerHTML = inner;
    return div;
}