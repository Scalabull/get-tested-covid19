class RequestValidationError extends Error {
  constructor(errors) {
    super()
    this.errors = errors

    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }
}

module.exports = RequestValidationError
