import { userStub } from '../test/stubs/user.stub'

export const UsersService = jest.fn().mockReturnValue({
    getUserByIdDB: jest.fn().mockResolvedValue(userStub()),
    getUsersDB: jest.fn().mockResolvedValue([userStub()]),
    createUserDB: jest.fn().mockResolvedValue(userStub()),
    updateUserDB: jest.fn().mockResolvedValue(userStub()),
})