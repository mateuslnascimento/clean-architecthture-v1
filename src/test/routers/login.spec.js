'use strict';

const LoginRouter = require('../../presentation/routers/login');
const MissingParamError = require('../../presentation/helpers/missing-param-error');
const UnauthorizedError = require('../../presentation/helpers/unauthorized-error');

const makeSut = () => {
    class AuthUsecaseSpy {
        auth(email, password) {
            this.email = email;
            this.password = password;
            return this.accessToken
        }
    }
    const authUseCaseSpy = new AuthUsecaseSpy();
    authUseCaseSpy.accessToken = 'valid_token_kasdfkajdsfdsfd';
    const sut = new LoginRouter(authUseCaseSpy);
    return {
        sut, authUseCaseSpy
    }
}

describe('Login Router', () => {
    
    test('Should return 400 if without email is provided', async () => {
        const { sut } = makeSut();
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
        const { sut } = makeSut();
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
        const { sut } = makeSut();

        const httpResponse = await sut.route();
        expect(httpResponse.statusCode).toBe(500);
    })

    test('Should return 500 if no httpRequest has no body', async () => {
        const { sut } = makeSut();
        const httpRequest = {};

        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
    })
    
    test('Should call AuthUsecase with correct params', async () => {
        const { sut, authUseCaseSpy } = makeSut();
         const httpRequest = {
             body: {
                email:"teste@teste.com",
                password: '213215469@1'
            }
        };

        const httpResponse = await sut.route(httpRequest);
        expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
        expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
    })
  
    test('Should return 401 when invalid credentials are provided', async () => {
        const { sut, authUseCaseSpy } = makeSut();
        authUseCaseSpy.accessToken = null;
         const httpRequest = {
             body: {
                email:"invalid@teste.com",
                password: 'invalid213215469@1'
            }
        };

        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(401);
        expect(httpResponse.body).toEqual(new UnauthorizedError());       
    })

  
    test('Should return 200 when valid credentials are provided', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                email:"valid@teste.com",
                password: 'valid213215469@1'
            }
        };

        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
    })


    test('Should return 500 if no AuthUseCase is provided', async () => {
        const sut = new LoginRouter();
        const httpRequest = {
            body: {
                email:"invalid@teste.com",
                password: 'invalid213215469@1'
            }
        };

        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
    })

    test('Should return 500 if no AuthUseCase has no auth Method', async () => {
        const sut = new LoginRouter({});
        const httpRequest = {
            body: {
                email:"invalid@teste.com",
                password: 'invalid213215469@1'
            }
        };

        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
    })

})