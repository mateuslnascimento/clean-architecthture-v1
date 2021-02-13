'use strict';

const HttpResponse = require('../helpers/http-response');
module.exports = class LoginRouter {
    constructor(authUseCase) {
        this.authUseCase = authUseCase;
    };

    route(httpRequest) {
        try {
            const { body: { email, password } } = httpRequest;

            if (!email) return HttpResponse.badRequest('email');
            if (!password) return HttpResponse.badRequest('password');

            const accessToken = this.authUseCase.auth(email, password);
            if (!accessToken) return HttpResponse.unauthorized();
        
            return HttpResponse.ok({ accessToken });

        } catch (error) {
            return HttpResponse.serverError();
        }
        
    }
}