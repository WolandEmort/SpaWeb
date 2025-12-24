const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Тут вказуємо вашу базу
const middlewares = jsonServer.defaults();

// Налаштування
server.db = router.db; // Обов'язково для роботи auth

server.use(middlewares);
server.use(auth); // Підключаємо авторизацію
server.use(router);

// Запуск на порту 3000
server.listen(3000, () => {
    console.log('JSON Server with Auth is running on port 3000');
});