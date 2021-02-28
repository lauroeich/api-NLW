import request from 'supertest';
import { app } from '../app';
import { getConnection } from 'typeorm';

import createConnection from '../database'

describe("Users",  () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
        
    });

    afterAll(async() => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close()
    });

    it("should be able to create a new user", async () =>{
    const response = await request(app).post("/Users").send({
        email: "user222@example.com",
        name: "User 22Example2"
     });

     expect(response.status).toBe(201);
    });

    it("Should not be able to create a user with exists email", async() => {
        const response = await request(app).post("/Users").send({
            email: "user222@example.com",
            name: "User 22Example2",
         });
    
         expect(response.status).toBe(400);
    })
})