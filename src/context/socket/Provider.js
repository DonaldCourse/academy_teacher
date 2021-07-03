import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'
import Context from './Context';
import { SOCKET_URL } from "../../contants";
import socketio from "socket.io-client";

const SocketProvider = ({ children }) => {

    const getSocketChat = () => {
        const token = localStorage.getItem('token');
        const url = SOCKET_URL + "/chat";
        if (token) {
            return socketio.connect(url, {
                transports: ["websocket", "polling", "flashsocket"],
                query: { token: token }
            });
        }
        return socketio.connect(url);
    };

    const getSocketTutor = () => {
        const token = localStorage.getItem('token');
        const url = SOCKET_URL + "/tutor";
        if (token) {
            return socketio.connect(url, {
                transports: ["websocket", "polling", "flashsocket"],
                query: { token: token }
            });
        }
        return socketio.connect(url);
    };

    const getSocketVideoCall = () => {
        const token = localStorage.getItem('token');
        const url = SOCKET_URL + "/video-call";
        if (token) {
            return socketio.connect(url, {
                transports: ["websocket", "polling", "flashsocket"],
                query: { token: token }
            });
        }
        return socketio.connect(url);
    };

    return (
        <Context.Provider value={{ getSocketChat, getSocketTutor, getSocketVideoCall }}>
            {children}
        </Context.Provider>
    )
}

SocketProvider.propTypes = {
    children: PropTypes.any,
}

export default SocketProvider