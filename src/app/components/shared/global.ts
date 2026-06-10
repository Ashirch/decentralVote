'use strict';

export const LOCAL = "LOCAL";
export var ENVIRONMENT = LOCAL;

export var socket_io_base_url = '';
export var app_base_url = '';
export var url = '';
export let base_url = '';


if (ENVIRONMENT === LOCAL) {
    base_url = 'http://localhost:4200';
    socket_io_base_url = 'http://localhost:8086';
    app_base_url = 'http://localhost:8086/api';
    url = 'http://localhost:8086/api';
}

export const ADMIN_TYPE = Object.freeze({
    NONE: "none",
    FULL_ADMIN: "full_admin",
    SYSTEM_ADMIN: "system_admin",
    TRANSCRIBER_ADMIN: "transcriber_admin",
    WOUND_NURSE_ADMIN: "wound_nurse_admin"
});