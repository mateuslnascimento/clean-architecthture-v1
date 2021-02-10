'use strict';

module.exports = class LoginRouter {
    route(httpRequest) {
        if (!httpRequest || !httpRequest.body) return { statusCode: 500 };

        const { body: { email, password } } = httpRequest;
        if (!email || !password) return { statusCode: 400 };
    }
}