import { Test } from '@nestjs/testing'
import { UsersRepository } from '../users.repository'
import { getModelToken } from '@nestjs/mongoose'
import { UserDBModel } from '../schemas/user.schema'
import { UserModel } from './support/user.model'
import { userStub } from './stubs/user.stub'
import { FilterQuery } from 'mongoose'

describe('UserRepository', () => {
    let usersRepository: UsersRepository

    describe('find ops', () => {
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

        describe('find', () => {
            describe('when find is called', ()=> {
                let users: UserDBModel[]

                beforeEach(async () => {
                    jest.spyOn(userModel, 'find')
                    users = await usersRepository.find(userFilterQuery)
                })

                test('then it should call the userModel', () => {
                    expect(userModel.find).toHaveBeenCalledWith(userFilterQuery)
                })

                test('then it should return a users array', () => {
                    expect(users).toEqual([userStub()])
                })
            })
        })

        describe('findOneAndUpdate', () => {
            describe('when findOneAndUpdate is called', ()=> {
                let user: UserDBModel

                beforeEach(async () => {
                    jest.spyOn(userModel, 'findOneAndUpdate')
                    user = await usersRepository.findOneAndUpdate(userFilterQuery, userStub())
                })

                test('then it should call the userModel', () => {
                    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(userFilterQuery, userStub(), { new: true})
                })

                test('then it should return a users array', () => {
                    expect(user).toEqual(userStub())
                })
            })
        })
    })

    describe('create ops', () => {
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
        })
        describe.skip('create', () => {
            describe('when create is called', ()=> {
                let user: UserDBModel
                let saveSpy: jest.SpyInstance
                let constrctorSpy: jest.SpyInstance

                beforeEach(async () => {
                    saveSpy = jest.spyOn(UserModel.prototype, 'save')
                    constrctorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy')
                    user = await usersRepository.create(userStub())
                })

                test('then it should call the userModel', () => {
                    expect(saveSpy).toHaveBeenCalled()
                    expect(constrctorSpy).toHaveBeenCalledWith(userStub())
                })

                test('then it should return a user ', () => {
                    expect(user).toEqual(userStub())
                })
            })
        })
    })
})