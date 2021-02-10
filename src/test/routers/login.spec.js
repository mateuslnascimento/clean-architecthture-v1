'use strict';

const LoginRouter = require('../../presentation/routers/login');

class MissingParamError extends Error {
    constructor(paramName) {
        super(`Missing param: ${paramName}`);
        this.name = 'MissingParamError'
    }
}


describe('Login Router', () => {
    
    test('Should return 400 if without email is provided', async () => {
        const sut = new LoginRouter();
        const httpRequest = {
            body: {
                password: '213215469@1'
            }
        };
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email'));
    })

    test('Should return 400 if without password is provided', async () => {
        const sut = new LoginRouter();
        const httpRequest = {
            body: {
                email: 'email@1.com'
            }
        };
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password'));
    })

    test('Should return 500 if no httpRequest is provided', async () => {
        const sut = new LoginRouter();

        const httpResponse = await sut.route();
        expect(httpResponse.statusCode).toBe(500);
    })

      test('Should return 500 if no httpRequest has no body', async () => {
        const sut = new LoginRouter();
        const httpRequest = {};

        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
    })
})