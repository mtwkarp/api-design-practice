import * as user from '../user'
describe('user handler', () => {
    it('it should create a new user', async () => {
        const req = {
            body: {
                username: 'Matviiii',
                password: 'pass'
            }
        }
        const res = {
            json(token) {
                expect(token).toBeTruthy()
            }
        }
        const newUser = await user.createNewUser(req, res)
    });
})