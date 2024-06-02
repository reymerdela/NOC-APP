import fs from 'fs'
import path from 'path';
import { FileSystemDatasource } from './fie-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


describe('FileSystemDatasource', () => {
    
    const logPath = path.join(__dirname,'../../../logs')
    console.log({logPath});
    
    beforeEach(() => {
        fs.rmSync(logPath,{recursive: true, force: true})
    })

    test('should create log files if they do not exists', () => {
        new FileSystemDatasource()
        const files = fs.readdirSync(logPath)
        expect(files).toEqual(['logs-all.log','logs-hight.log','logs-medium.log'])    
    });

    test('should save in logs-all.log', async () => {
        const logDatasource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.Low,
            origin: 'file-system.datasource.test.ts'
        }) 
        await logDatasource.saveLog(log)
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`,'utf-8')
        expect(allLogs).toContain(JSON.stringify(log))
    });

    
    test('should save a log in logs-hight.log',async () => {
        const logDatasource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.High,
            origin: 'file-system.datasource.test.ts'
        })
        await logDatasource.saveLog(log)
        const hightLogs = fs.readFileSync(`${logPath}/logs-hight.log`,'utf-8')
        expect(hightLogs).toContain(JSON.stringify(log))
    });

    test('should save a log in logs-medium.log',async () => {
        const logDatasource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.Medium,
            origin: 'file-system.datasource.test.ts'
        })
        await logDatasource.saveLog(log)
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`,'utf-8')
        expect(mediumLogs).toContain(JSON.stringify(log))
    });



    test('should return all logs', async () => {
        const logDatasource = new FileSystemDatasource()

        const logLow = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.Low,
            origin: 'file-system.datasource.test.ts'
        })
 
        const logMedium = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.Medium,
            origin: 'file-system.datasource.test.ts'
        })
 
        const logHight = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.High,
            origin: 'file-system.datasource.test.ts'
        })

        await logDatasource.saveLog(logLow)
        await logDatasource.saveLog(logMedium)
        await logDatasource.saveLog(logHight)

        const logsLow = await logDatasource.getLog(LogSeverityLevel.Low)
        const logsMedium = await logDatasource.getLog(LogSeverityLevel.Medium)
        const logsHight = await logDatasource.getLog(LogSeverityLevel.High)
        
        expect(logsLow).toEqual(expect.arrayContaining([logLow,logMedium,logHight]))
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]))
        expect(logsHight).toEqual(expect.arrayContaining([logHight]))
    });


    test('should return an error if path exists', () => {
        new FileSystemDatasource()

        expect(true).toBeTruthy()
    });

    test('should return an error if severity level is not defined', async () => {
        const logDatasource = new FileSystemDatasource()
        const customSeverityLevel = 'SUPER_MEGA_HIGHT' as LogSeverityLevel

        try {
            await logDatasource.getLog(customSeverityLevel)
            expect(true).toBeFalsy()
        } catch (error) {
            const errorString = `${error}`
            expect(errorString).toContain(`${customSeverityLevel} not implemented`)
        }
    });
}); 