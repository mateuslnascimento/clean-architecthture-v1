'use strict'

module.exports = class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'MissingParamError'
  }
}
