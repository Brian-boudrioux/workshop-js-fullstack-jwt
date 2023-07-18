const users = [
    { id: 1, email: "a@a.com", password: "a" },
    { id: 2, email: "b@b.com", password: "b" },
]
let nextId = 3;

const mock = {
    getByEmail: (email) => {
        return users.filter((user) => user.email === email);
    },
    insertUser: (user) => {
        users.push(user);
        return {...user, id: nextId++};
    },
    getAll: () => {
        return users;
    },
    getById: (id) => {
        return users.filter((user) => user.id === id);
    }
}

module.exports = mock;