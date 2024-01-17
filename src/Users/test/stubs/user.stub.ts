import { UserDBModel } from '../../schemas/user.schema'

export const userStub = (): UserDBModel => {
    return {
        userId: '123',
        email: 'test@example.com',
        age: 23
    }
}