const http = require("http");
const app = require("./backend/app");

// const server = http.createServer((request, response) => {
//     response.end('This is first response.')
// });

const port = process.env.PORT || 3200;

app.set('port',port);
const server = http.createServer(app);

server.listen(process.env.PORT || 3200);
