import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

describe('log.datasource.ts', () => {
    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test message',
        level: LogSeverityLevel.Low
    })
    class MockLogDataSource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        };

    }


    test('Should test the abstract class',async () => {

        const mockLogDataSource = new MockLogDataSource()
        expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource)
        expect(typeof mockLogDataSource.saveLog).toBe('function')
        expect(typeof mockLogDataSource.getLog).toBe('function')
        // expect(mockLogDataSource).toHaveProperty('saveLog')
        // expect(mockLogDataSource).toHaveProperty('getLog')
        await mockLogDataSource.saveLog(newLog)
        const logs = await mockLogDataSource.getLog(LogSeverityLevel.Low)
        
        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(LogEntity)
    })

})