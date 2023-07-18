require("dotenv").config();
const request = require("supertest");
const app = require("../../src/config/server");
const db = require("../../src/config/database");

const newUser = {
    username: "aaa",
    email: "aaa@aaa.com",
    password: "aaa",
    repeat_password: "aaa",
    role: "ROLE_USER"
}
let cookie;

afterAll( async() => {
    await db.query("TRUNCATE TABLE users");
    await db.end();
});


describe("Integration Test /api/users router : ", () => {
    describe("POST /api/users : ", () => {
        it("Should throw a 400 error if credential is missing", async () => {
            await request(app).post("/api/users").send({})
            .expect(400).expect("Content-Type", /json/);
        });

        it("Should return a 200 confirm status with specified data", async () => {
            const res = await request(app).post("/api/users").send(newUser)
            .expect(201).expect("Content-Type", /json/);

            expect(res.body.email).toBe(newUser.email);
        })

        it("Should throw a 400 error if user alrealdy exist", async () => {
            const res = await request(app).post("/api/users").send(newUser)
            .expect(400);

            expect(res.body).toBe("email already exists");
        })

    });

    describe("POST /api/users/login :", () => {
        it("Should throw a 400 error if credentials is missing", async () => {
            const res = await request(app).post("/api/users/login").send({})
            .expect(400);

            expect(res.body).toBe("Please specify both email and password");
        })

        it("Should throw a 400 error if user doesnt exist", async () => {
            const res = await request(app).post("/api/users/login").send({email: "z", password: "e"})
            .expect(400);

            expect(res.body).toBe("Invalid email");
        })

        it("Should throw a 400 error if password do not match", async () => {
            const res = await request(app).post("/api/users/login").send({email: "aaa@aaa.com", password: "e"})
            .expect(400);

            expect(res.body).toBe("invalid password");
        })

        it("Should return 200 confirm status with user data", async () => {
            const res = await request(app).post("/api/users/login").send(newUser)
            .expect(200);

            cookie = res.get("Set-Cookie");
            expect(res.body.email).toBe(newUser.email);
        })
    });

    describe("GET /api/users/me", () => {
        
        it("Should throw a 401 Unauthorized status code if auth cookie is missing", async () => {
            await request(app).get("/api/users/me").expect(401);
        })

        it("Should return a 200 confirm status with user data", async () => {
            const res = await request(app).get("/api/users/me").set("Cookie", cookie).expect(200);

            expect(res.body.email).toBe(newUser.email);

        })

    })
});
