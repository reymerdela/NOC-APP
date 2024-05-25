import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<Boolean>
}

type SucessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly sucessCallback?: SucessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach(logRespository => {
        logRespository.saveLog(log)
    })
  }

  public async execute(url: string): Promise<Boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`)
      }
      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.Low,
        origin: 'check-service.ts',
      })
      this.callLogs(log)
      this.sucessCallback && this.sucessCallback()
      return true
    } catch (error) {
      const errorString = `${error}`
      const log = new LogEntity({
        message: errorString,
        level: LogSeverityLevel.High,
        origin: 'check-service.ts',
      })
      this.callLogs(log)      
      this.errorCallback && this.errorCallback(errorString)
      return false
    }
  }
}
