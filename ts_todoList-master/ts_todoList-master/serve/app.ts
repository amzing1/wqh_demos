import express, { Application, json } from 'express'
import { ITodoData } from '../src/js/types';
import { fileOperation, readFile, writeFile } from './util';


const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.all('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,PUT,OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/todo', (req, res) => {
    const todo = fileOperation('todo.json', undefined);
    res.send(todo);
})

app.post('/add', (req, res) => {
    const data: ITodoData = req.body;

    fileOperation('todo.json', function (todos: ITodoData[]) {
        let _todos = todos.filter(item => item.content === data.content);

        if (_todos.length) {
            console.log('has this content');
            return;
        }

        todos.push(data);
        writeFile('todo.json', JSON.stringify(todos));
    })

    res.send({
        msg: 'ok',
        statusCode: 200
    })
})

app.post('/remove', (req, res) => {
    const id = req.body.id;

    fileOperation('todo.json', function (todos: ITodoData[]) {
        todos = todos.filter(item => item.id != id);
        writeFile('todo.json', JSON.stringify(todos));
    })

    res.send({
        msg: 'ok',
        statusCode: 200
    });
})

app.post('/toggle', (req, res) => {
    const id = req.body.id;

    fileOperation('todo.json', function(todos: ITodoData[]) {
        todos = todos.map(item => {
            if (item.id === id) {
                item.completed = !item.completed;
            }
    
            return item;
        });
    
        writeFile('todo.json', JSON.stringify(todos));
    })
    
    res.send({
        msg: 'ok',
        statusCode: 200
    })
})

app.listen(8080, () => {
    console.log('welcome to express!');
    console.log('app is listen port 8080 ...')
})