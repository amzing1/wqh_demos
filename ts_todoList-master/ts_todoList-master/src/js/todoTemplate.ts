import { ITodoData } from "./types";

class todoTemplate {
    protected addView(todo: ITodoData): string {
        return `
            <input type="checkbox" ${todo.completed ? "checked" : ''} data-id=${todo.id}>
            <span>${todo.content}</span>
            <button data-id=${todo.id}>删除</button>
        `
    }
}

export default todoTemplate