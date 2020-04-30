class DatabaseConnectionError extends Error {
  constructor() {
    super()
    this.reason = 'Error connecting to database'

    Object.setProtoypeOf(this, DatabaseConnectionError.prototype)
  }
}

module.exports = DatabaseConnectionError
