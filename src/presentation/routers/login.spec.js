'use strict';

module.exports = class LoginRouter {
    route(httpRequest) {
        if (!httpRequest.body.email || !httpRequest.body.password) return { statusCode: 400 };
    }
}