import { LogDatasource } from '../../domain/datasources/log.datasource'
import { LogSeverityLevel, LogEntity } from '../../domain/entities/log.entity'
import fs from 'fs'

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/'
  private allLogsPath = 'logs/logs-all.log'
  private mediumLogsPath = 'logs/logs-medium.log'
  private hightLogsPath = 'logs/logs-hight.log'

  constructor() {
    this.createLogsFiles()
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }
    ;[this.allLogsPath, this.mediumLogsPath, this.hightLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, '')
        }
      }
    )
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)} \n`

    fs.appendFileSync(this.allLogsPath, logAsJson)
    if (newLog.level === LogSeverityLevel.Low) return
    if (newLog.level === LogSeverityLevel.Medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson)
    } else {
      fs.appendFileSync(this.hightLogsPath, logAsJson)
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8')
    if (content === '') return []
    const logs = content.split('\n').map(LogEntity.fromJson)
    return logs
  }

  async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.Low:
        return this.getLogsFromFile(this.allLogsPath)
      case LogSeverityLevel.Medium:
        return this.getLogsFromFile(this.mediumLogsPath)
      case LogSeverityLevel.High:
        return this.getLogsFromFile(this.hightLogsPath)
      default:
        throw new Error(`${severityLevel} not implemented`)
    }
  }
}
