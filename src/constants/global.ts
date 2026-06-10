'use strict';

export const LOCAL = "LOCAL";


export var ENVIRONMENT = LOCAL;  
export var base_url = '';
export var socket_io_base_url = '';
export var app_base_url = '';
export var url = '';


if (ENVIRONMENT === LOCAL) {
    base_url = 'http://localhost:4200';
    socket_io_base_url = 'http://localhost:8086';
    app_base_url = 'http://localhost:8086/api';
    url = 'http://localhost:8086/api';
}

export const USER_TYPE = Object.freeze({
    ADMIN: "admin",
    USER: "user"
});