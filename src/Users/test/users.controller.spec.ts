import { Test } from "@nestjs/testing"
import { UsersController } from '../users.controller'
import { UsersService } from "../users.service"
import { userStub } from "./stubs/user.stub"
import { UserDBModel } from "../schemas/user.schema"

jest.mock('../users.service')

describe('UserController', () => {
    let usersController: UsersController
    let usersService: UsersService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [UsersController],
            providers: [UsersService]
        }).compile()
    
    usersController = moduleRef.get<UsersController>(UsersController)
    usersService = moduleRef.get<UsersService>(UsersService)
    jest.clearAllMocks()
    })

    describe('getUser', () => {
        describe('when getUser is called', () => {
            let user: UserDBModel

            beforeEach(async () => {
               user = await usersController.getUser(userStub().userId)
            })
            test('then it should call usersService', () => {
                expect(usersService.getUserByIdDB).toHaveBeenCalledWith(userStub().userId)
            })

            test('then it should return a user', () => {
                expect(user).toEqual(userStub())
            })
        })
    })

    // tests for other controller functions.
})