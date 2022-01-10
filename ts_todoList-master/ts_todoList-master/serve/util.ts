import {readFileSync, writeFileSync} from 'fs'
import {resolve} from 'path'
import { ITodoData } from '../src/js/types';

export function readFile(path: string): string {
    const todo = readFileSync(resolve(__dirname, path), 'utf-8');
    return todo;
}

export function writeFile(path: string, content: string): void {
    writeFileSync(resolve(__dirname, path), content);
}

export function fileOperation(path: string, fn: Function | undefined): ITodoData[] | void {
    let todos: ITodoData[] = JSON.parse(readFile(path));
    if(!fn) {
        return todos;
    }
    fn(todos);
}
