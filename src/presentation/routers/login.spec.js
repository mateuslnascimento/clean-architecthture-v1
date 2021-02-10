'use strict';

class LoginRouter {
    route(httpRequest) {
        if (!httpRequest.body.email) return { statusCode: 400 };
    }
}

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
})