'use strict';

module.exports = class LoginRouter {
    route(httpRequest) {
        const { body: { email, password } } = httpRequest;
        if (!email || !password) return { statusCode: 400 };
    }
}