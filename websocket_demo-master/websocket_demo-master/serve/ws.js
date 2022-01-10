import WebSocket, {WebSocketServer } from 'ws'

const wss = new WebSocketServer({
    port: 8000
})


export function initWebSocket() {
    bindEvent();
}

function bindEvent() {
    wss.on('open', handleWsOpenEvent);
    wss.on('close', handleWsCloseEvent);
    wss.on('error', handleWsErrorEvent);
    wss.on('connection', handleWsConnectionEvent);
}

function handleWsOpenEvent() {
    console.log('WebSocket open');
}

function handleWsCloseEvent() {
    console.log('WebSocket close');
}

function handleWsErrorEvent() {
    console.log('WebSocket error');
}

function handleWsConnectionEvent(ws) {
    console.log('WebSocket connection');
    ws.on('message', handleWsMessageEvent(ws));
}

function handleWsMessageEvent(ws) {
    return (msg) => {
        wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        })
    }
}
