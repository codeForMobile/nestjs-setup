import { UserDBModel } from "../../schemas/user.schema";
import { MockModel } from "../../../database/test/support/mock.model";
import { userStub } from '../stubs/user.stub'

export class UserModel extends MockModel<UserDBModel> {
    protected entityStub = userStub()
}