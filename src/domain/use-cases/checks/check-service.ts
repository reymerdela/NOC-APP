import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceUseCase {
  execute(url: string): Promise<Boolean>
}

type SucessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly sucessCallback?: SucessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

  public async execute(url: string): Promise<Boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`)
      }
      const logEntity = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.Low,
        origin: 'check-service.ts',
      })
      this.logRepository.saveLog(logEntity)
      this.sucessCallback && this.sucessCallback()
      return true
    } catch (error) {
      const errorString = `${error}`
      const log = new LogEntity({
        message: errorString,
        level: LogSeverityLevel.High,
        origin: 'check-service.ts',
      })
      this.logRepository.saveLog(log)
      this.errorCallback && this.errorCallback(errorString)
      return false
    }
  }
}
