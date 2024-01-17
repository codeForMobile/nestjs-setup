import { Test } from "@nestjs/testing"
import { Connection } from "mongoose"
import * as request from 'supertest'
import { AppModule } from "../../../app.module"
import { DatabaseService } from "../../../database/database.service"
import { userStub } from "../stubs/user.stub"

describe('UsersController', () => {
    let dbConnection: Connection
    let httpServer: any
    let app: any

    beforeAll(async ()=> {
        const moduleRef = Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        // TODO, Fix following line. 
        app = (await moduleRef).createNestApplication()
        await app.init()
        // TODO, Fix following line. 
        dbConnection = (await moduleRef).get<DatabaseService>(DatabaseService).getDbHandle()
        httpServer = app.getHttpServer()
    })

    afterAll(async () => {
        await dbConnection.collection('user').deleteMany({})
        await app.close()
    })

    describe('getUsers', () => {
        it('should return an array of users', async () => {
            await dbConnection.collection('user').insertOne(userStub())
            const response = await request(httpServer).get('/users')
            expect(response.status).toBe(200)
            expect(response.body).toMatchObject([userStub()])
        })
    })
})