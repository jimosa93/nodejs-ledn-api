import request from 'supertest';
import app from '../app';
import { connectDB, dropDatabase } from '../utils/test-utils/dbHandler.utils';
import Account from '../models/account.model';

const fakeAccountData = {
    userEmail: 'user@mail.com',
    balance: 100
};

describe('Account API tests', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await dropDatabase();
    });

    describe('GET /account', () => {
        let savedAccount;

        beforeAll(async () => {
            const account = new Account(fakeAccountData);
            savedAccount = await account.save();
        });

        it('should return an existing account', async () => {
            let response;
            response = await request(app).get('/account/user@mail.com').send();
            expect(response.status).toBeTruthy();
            expect(response.status).toBe(200);
            expect(response.body.userEmail).toBe(fakeAccountData.userEmail);
            expect(response.headers['content-type']).toContain('json');
        });

        it('should return a 404 status for an account not found', async () => {
            let response;
            response = await request(app).get('/account/no-user@mail.com').send();
            expect(response.status).toBeTruthy();
            expect(response.status).toBe(404);
            expect(response.headers['content-type']).toContain('json');
        });

    });
});