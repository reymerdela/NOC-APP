import { envs } from "./envs.plugin";

describe('envs.plugins.ts', () => {

    test('Should return env options' , () => {
        
        expect(envs).toEqual({
            PORT: 3000,
        MAILER_SERVICE: 'gmail',
        MAILER_EMAIL: 'reymerxd0@gmail.com',
        MAILER_SECRET_KEY: '12315',
        PROD: false,
        MONGO_URL: 'mongodb://root:123456@localhost:27017/',
        MONGO_DB_NAME: 'NOC-TEST',
        MONGO_USER: 'root',
        MONGO_PASS: '123456'
        })
        
    })  

    test('Should return error if not found env',async () => {
        jest.resetModules()
        process.env.PORT = 'ABC'

        try {
            await import('./envs.plugin')
            expect(true).toBe(true)
        } catch(error){
            expect(`${error}`).toContain('"PORT" should be a valid integer')
            
        }



    })


})