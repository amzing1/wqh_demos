import TodoEvent from "./js/todoEvent";
import { ITodoData } from "./js/types";
import { nanoid } from 'nanoid'

const oInput: HTMLInputElement = document.querySelector('input') as HTMLInputElement;
const oBtn: HTMLElement = document.querySelector('button') as HTMLElement;
const oList: HTMLElement = document.querySelector('.list') as HTMLElement;

const init = () => {
    bindEvent();
}

const bindEvent = () => {
    oBtn.addEventListener('click', handleAddBtnClick, false);
    oList.addEventListener('click', handleListClick, false);
}

const handleAddBtnClick = () => {
    const data = {
        id: nanoid(),
        content: oInput.value,
        completed: false,
    }

    const ret = todoEvent.addToDo(data);

    if(ret && ret === 1000) {
        alert('内容已存在！');
        return;
    }

    oInput.value = '';


}

const handleListClick = (event: MouseEvent) => {
    const targetElem: HTMLElement = event.target as HTMLElement;
    const targetName: string = targetElem.tagName.toLocaleLowerCase();
    switch(targetName) {
        case 'input':
            todoEvent.toogleTodo(targetElem);
            break;
        case 'button':
            todoEvent.removeTodo(targetElem);
            break;
        default: 
            break;
    }
}

let todoData: ITodoData[] = [];

const todoEvent = new TodoEvent(todoData, oList);

init();
