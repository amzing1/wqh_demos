import { createChatMessage } from './chatMessageTemplate.js'



const oInput = document.querySelector('.inputContent');
const oList = document.querySelector('.list');

const ws = new WebSocket('ws://localhost:8000/test');

function init() {
    bindEvent();
}

function bindEvent() {
    oInput.addEventListener('keyup', handleEnterKeyEvent, false);
    ws.onopen = handleWsOpen;
    ws.onerror = handleWsError;
    ws.onclose = handleWsClose;
    ws.onmessage = handleWsMessage;
}

// function handleBtnClick() {
//     const value = oInput.value;
//     ws.send(value);
//     oInput.value = '';
// }

function handleEnterKeyEvent(event) {
    if (event.key == 'Enter') {
        const value = oInput.value;
        if (!value) return;
        ws.send(value);
        oInput.value = '';
    }

}

function handleWsOpen() {
    console.log('ws open');
}

function handleWsClose() {
    console.log('ws close')
}

function handleWsError() {
    console.log('ws error')
}

function handleWsMessage(event) {
    console.log(event.data);
    const userTest = {
        name: 'wqh',
        profile: './assets/pika.jpg',
        sentence: event.data
    }
    oList.appendChild(createChatMessage(userTest));
}

init();
