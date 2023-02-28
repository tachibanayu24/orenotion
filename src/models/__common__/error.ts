export class DBError extends Error {
  private moduleError: Error | undefined

  constructor(message: string, error?: Error) {
    super()
    this.message = message
    this.moduleError = error
  }
}

export class AuthError extends Error {
  private moduleError: Error | undefined

  constructor(message: string, error?: Error) {
    super()
    this.message = message
    this.moduleError = error
  }
}

export class NotFoundError extends Error {
  private moduleError: Error | undefined

  constructor(message: string, error?: Error) {
    super()
    this.message = message
    this.moduleError = error
  }
}
