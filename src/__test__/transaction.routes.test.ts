
import request from 'supertest';
import app from '../app';
import { connectDB, dropDatabase } from '../utils/test-utils/dbHandler.utils';
import Account from '../models/account.model';

const fakeAccountData = {
    userEmail: 'user@mail.com',
    balance: 100
};

const fakeTransactionData = [
    {
        userEmail: "user@mail.com",
        amount: 50,
        type: "receive"
    },
    {
        userEmail: "user@mail.com",
        amount: 30,
        type: "send"
    },
    {
        userEmail: "user@mail.com",
        amount: 60,
        type: "send"
    },
    {
        userEmail: "no-user@mail.com",
        amount: 50,
        type: "receive"
    },
];

describe('Account API tests', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await dropDatabase();
    });

    describe('POST /transaction', () => {
        beforeAll(async () => {
            const account = new Account(fakeAccountData);
            await account.save();
        });

        it('should return a successful transaction for type: receive', async () => {
            let response;
            response = await request(app).post('/transaction/').send(fakeTransactionData[0]);
            expect(response.status).toBeTruthy();
            expect(response.status).toBe(201);
            expect(response.body.userEmail).toBe(fakeTransactionData[0].userEmail);
            expect(response.headers['content-type']).toContain('json');
        });

        it('should return a successful transaction for type: send', async () => {
            let response;
            response = await request(app).post('/transaction/').send(fakeTransactionData[1]);
            expect(response.status).toBeTruthy();
            expect(response.status).toBe(201);
            expect(response.body.userEmail).toBe(fakeTransactionData[1].userEmail);
            expect(response.headers['content-type']).toContain('json');
        });

        it('should return a 400 status for a transaction (type: send) with an account without enough tokens', async () => {
            let response;
            response = await request(app).post('/transaction/').send(fakeTransactionData[2]);
            expect(response.status).toBeTruthy();
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Not enough tokens to send');
            expect(response.headers['content-type']).toContain('json');
        });

        it('should return a 404 status for a transaction with an account not found', async () => {
            let response;
            response = await request(app).post('/transaction/').send(fakeTransactionData[3]);
            expect(response.status).toBeTruthy();
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Not account found');
            expect(response.headers['content-type']).toContain('json');
        });

        it('should return a 400 status for a transaction with bad request data', async () => {
            let response;
            response = await request(app).post('/transaction/').send(fakeTransactionData[4]);
            expect(response.status).toBeTruthy();
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('userEmail, amount and type are required');
            expect(response.headers['content-type']).toContain('json');
        });
    });
});
