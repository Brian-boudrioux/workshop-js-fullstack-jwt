const mockedModel = require("./mocks/usersModel.mock");
const userService = require("../../src/modules/users/service")(mockedModel);

describe("Unit test userService :", () => {
    describe("registerNewUser method", () => {
        it("Should throw a error if user already exist", async () => {
            try {
                await userService.registerNewUser({email: "a@a.com", password: "a"});
            } catch (error) {
                expect(error.message).toBe("email already exists");
            }
        });
    })
});