import axios from 'axios'
import { ITodoData } from './types';

axios.defaults.timeout = 500;

export function getTodoList(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const _origin = descriptor.value;
    descriptor.value = function (todos: ITodoData[]) {
        axios.get('http://192.168.1.21:8080/todo').then((data) => {
            const value: ITodoData[] = data.data;
            if (!value) {
                return;
            }
            todos = value;
        }).then(() => {
            _origin.call(this, todos);
        })
    }
}

export function removeTodoList(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const _origin = descriptor.value;

    descriptor.value = function (targetElem: HTMLElement) {
        console.log(targetElem.dataset.id);
        axios({
            url: 'http://192.168.1.21:8080/remove',
            method: 'post',
            data: {id: targetElem.dataset.id}
        }).then(() => {
            _origin.call(this, targetElem);
        })
    }
}

export function addTodoList(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const _orign = descriptor.value;

    descriptor.value = function(todo: ITodoData) {
        axios({
            url: 'http://192.168.1.21:8080/add',
            method: 'post',
            data: todo
        }).then(() => {
            _orign.call(this, todo);
        })
    }
}

export function toogleTodoList(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const _origin = descriptor.value;

    descriptor.value = function(targetElem: HTMLElement) {
        axios({
            url: 'http://192.168.1.21:8080/toggle',
            method: 'post',
            data: {id: targetElem.dataset.id}
        }).then(() => {
            _origin.call(this, targetElem);
        })
    }
}