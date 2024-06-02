import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";
describe('CheckserviceMultiple UseCase', () => {
    
    const mockRepository1 = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }
    const mockRepository3 = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }
    const sucessCallback = jest.fn()
    const errorCallback = jest.fn()
    
    
    const checkService = new CheckServiceMultiple(
        [mockRepository1,mockRepository2,mockRepository3],
        sucessCallback,
        errorCallback
    )

    beforeEach(() =>{
        jest.clearAllMocks()
    })


    test('should call successCallback when fetch return true', async () => {

        const wasOk = await checkService.execute('https://google.com')
        expect(wasOk).toBe(true) 
        expect(sucessCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });
});