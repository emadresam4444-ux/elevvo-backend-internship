const http = require("http");
const PORT = 5000;
const os = require("os");
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello World" }));
  } else if (req.method === "GET" && req.url === "/api/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify([
        { id: 1, name: "Emad" },
        { id: 2, name: "Moahmed" },
      ]),
    );
  } else if (req.method === "GET" && req.url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        uptime: process.uptime(),
        platform: os.platform(),
        timestamp: new Date().toISOString(),
      }),
    );
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server Running in port ${PORT}`);
});
