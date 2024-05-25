import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo/init';
import { Server } from './presentation/server'

;(() => {
  main()
})()

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  })

  await Server.start()
  
}
