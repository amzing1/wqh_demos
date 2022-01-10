import todoTemplate from "./todoTemplate";
import { ITodoData } from "./types";
import { createItem, findParentNode } from "./util";

class TodoDom extends todoTemplate {
    private listElem: HTMLElement;

    constructor(listElem: HTMLElement) {
        super();
        this.listElem = listElem;
    }

    protected addTodo(todo: ITodoData) {
        const div: HTMLElement = createItem(this.addView(todo));
        this.listElem.appendChild(div);
    }

    protected removeTodo(targetElem: HTMLElement) {
        const parentNode = findParentNode(targetElem, 'todo-item');
        parentNode.remove();
    }

    protected toogleTodo(targetElem: HTMLElement) {

    }

    protected initDom(todos: ITodoData[]) {
        let frag: DocumentFragment = document.createDocumentFragment();
        todos.forEach(todo => {
            frag.appendChild(createItem(this.addView(todo)));
        })
        this.listElem.appendChild(frag);
    }
}

export default TodoDom;