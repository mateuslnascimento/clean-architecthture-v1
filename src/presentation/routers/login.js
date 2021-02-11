'use strict';

const HttpResponse = require('../helpers/http-response');
module.exports = class LoginRouter {
    route(httpRequest) {
        if (!httpRequest || !httpRequest.body) return HttpResponse.serverError();

        const { body: { email, password } } = httpRequest;

        if (!email) return HttpResponse.badRequest('email');
        if (!password) return HttpResponse.badRequest('password');
    }
}