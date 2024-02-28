// JSON Server module
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)

// Configurar CORS para permitir solicitações de qualquer origem
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir solicitações de qualquer origem
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

server.use(
 // Add custom route here if needed
 jsonServer.rewriter({
  "/*": "/$1",
 })
);

server.use(router);
// Listen to port
server.listen(process.env.PORT || 3000, () => {
 console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;