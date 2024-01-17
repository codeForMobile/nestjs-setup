import { Test } from '@nestjs/testing'
import { UsersRepository } from '../users.repository'
import { getModelToken } from '@nestjs/mongoose'
import { UserDBModel } from '../schemas/user.schema'
import { UserModel } from './support/user.model'
import { userStub } from './stubs/user.stub'
import { FilterQuery } from 'mongoose'

describe('UserRepository', () => {
    let usersRepository: UsersRepository
    let userModel: UserModel
    let userFilterQuery: FilterQuery<UserDBModel>

    beforeEach(async () =>{
        const moduleRef = await Test.createTestingModule({
            providers: [
                UsersRepository,
                {
                    provide: getModelToken(UserDBModel.name),
                    useClass: UserModel
                }
            ]
        }).compile()

        usersRepository = moduleRef.get<UsersRepository>(UsersRepository)
        userModel = moduleRef.get<UserModel>(getModelToken(UserDBModel.name))

        userFilterQuery = {
            userId: userStub().userId
        }
        jest.clearAllMocks()
    })

    describe('findOne', () => {
        describe('when findOne is called', ()=> {
            let user: UserDBModel

            beforeEach(async () => {
                jest.spyOn(userModel, 'findOne')
                user = await usersRepository.findOne(userFilterQuery)
            })

            test('then it should call the userModel', () => {
                expect(userModel.findOne).toHaveBeenCalledWith(userFilterQuery, {
                    _id:0, 
                    __v:0
                })
            })

            test('then it should return a user', () => {
                expect(user).toEqual(userStub())
            })
        })
    })
})