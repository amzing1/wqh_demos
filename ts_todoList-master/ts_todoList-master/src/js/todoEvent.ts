import TodoDom from "./todoDom";
import { addTodoList, getTodoList, removeTodoList, toogleTodoList } from "./todoService";
import { ITodoData } from "./types";

class TodoEvent extends TodoDom {
    private todoData: ITodoData[]

    constructor(todoData: ITodoData[], listElem: HTMLElement) {
        super(listElem);
        this.todoData = todoData;
        this.initTodos(this.todoData);
    }

    @getTodoList
    private initTodos(todos: ITodoData[]) {
        this.todoData = todos
        this.initDom(this.todoData);
    }

    @addTodoList
    public addToDo(todo: ITodoData): number | undefined {
        const _todo = this.todoData.find(item => item.content === todo.content);

        if(_todo){
            console.log('has been');
            return 1000;
        }

        this.todoData.push(todo);
        super.addTodo(todo);
        return undefined;
    }

    @removeTodoList
    public removeTodo(targetElem: HTMLElement) {
        this.todoData = this.todoData.filter(item => item.id !== targetElem.dataset.id);
        super.removeTodo(targetElem);
    }

    @toogleTodoList
    public toogleTodo(targetElem: HTMLElement) {
        this.todoData = this.todoData.map(item => {
            if(item.id === targetElem.dataset.id) {
                item.completed = !item.completed;
            }
            return item;
        })
    }
}

export default TodoEvent;