import { Test } from "@nestjs/testing"
import { Connection } from "mongoose"
import { AppModule } from "src/app.module"
import { DatabaseService } from "src/database/database.service"
import { userStub } from "../stubs/user.stub"

describe('UsersController', () => {
    let dbConnection: Connection

    beforeAll(async ()=> {
        const moduleRef = Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        // TODO, Fix following line. 
        const app = (await moduleRef).createNestApplication()
        await app.init()
        // TODO, Fix following line. 
        dbConnection = (await moduleRef).get<DatabaseService>(DatabaseService).getDbHandle()
    })

    describe('getUsers', async () => {
        await dbConnection.collection('users').insertOne(userStub())
    })
})