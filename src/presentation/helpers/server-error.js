'use strict';

module.exports = class ServerError extends Error {
    constructor() {
        super('Internal Error');
        this.name = 'OPS, something went wrong!'
    }
}