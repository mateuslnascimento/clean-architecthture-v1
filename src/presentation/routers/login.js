'use strict';

class HttpResponse {
    static badRequest(paramName) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    };
    static serverError() {
        return {
            statusCode: 500
        }
    };
}

class MissingParamError extends Error {
    constructor(paramName) {
        super(`Missing param: ${paramName}`);
        this.name = 'MissingParamError'
    }
}

module.exports = class LoginRouter {
    route(httpRequest) {
        if (!httpRequest || !httpRequest.body) return HttpResponse.serverError();

        const { body: { email, password } } = httpRequest;

        if (!email) return HttpResponse.badRequest('email');
        if (!password) return HttpResponse.badRequest('password');
    }
}