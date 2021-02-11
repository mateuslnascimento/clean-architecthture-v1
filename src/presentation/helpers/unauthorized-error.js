'use strict';

module.exports = class UnauthorizedError extends Error {
    constructor(paramName) {
        super('Unauthorized');
        this.name = 'MissingParamError'
    }
}