'use strict';

const LoginRouter = require('../../presentation/routers/login.spec');

describe('Login Router', () => {
    test('Should return 400 if without email provided', async () => {
        const sut = new LoginRouter();
        const httpRequest = {
            body: {
                password: '213215469@1'
            }
        };
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
    })
    test('Should return 400 if without password provided', async () => {
        const sut = new LoginRouter();
        const httpRequest = {
            body: {
                email: 'email@1.com'
            }
        };
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
    })
})