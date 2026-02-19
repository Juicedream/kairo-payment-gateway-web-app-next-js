import {io} from "socket.io-client";

export function socketClientConnection() {
    let socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
    return socket;
}