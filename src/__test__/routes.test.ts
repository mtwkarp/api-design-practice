import app from '../server'
import supertest from "supertest";

describe('GET /', () => {
    it('should return message hello', async () => {
        const result = await supertest(app)
            .get('/')

        expect(result.body.message).toBe('hello')

    })
})
