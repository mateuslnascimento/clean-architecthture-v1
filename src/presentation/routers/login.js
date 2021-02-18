'use strict';

const HttpResponse = require('../helpers/http-response');
const MissingParamError = require('../helpers/missing-param-error');
module.exports = class LoginRouter {
    constructor(authUseCase) {
        this.authUseCase = authUseCase;
    };

    async route(httpRequest) {
        try {
            const { body: { email, password } } = httpRequest;

            if (!email) return HttpResponse.badRequest(new MissingParamError('email'));
            
            if (!password) return HttpResponse.badRequest(new MissingParamError('password'));

            const accessToken = await this.authUseCase.auth(email, password);

            if (!accessToken) return HttpResponse.unauthorized();
        
            return HttpResponse.ok({ accessToken });

        } catch (error) {
            return HttpResponse.serverError();
        }
        
    }
}