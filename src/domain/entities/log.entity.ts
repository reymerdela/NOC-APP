export enum LogSeverityLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'hight',
}

export interface LogEntityOptions {
  level: LogSeverityLevel
  message: string
  createdAt?: Date
  origin: string
}

export class LogEntity {
  public level: LogSeverityLevel
  public message: string
  public createdAt: Date
  public origin: string

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options
    this.message = options.message
    this.level = level
    this.createdAt = createdAt
    this.origin = origin
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json)
    const log = new LogEntity({
      message,
      origin,
      createdAt,
      level,
    })
    log.createdAt = new Date(createdAt)
    return log
  }
}
