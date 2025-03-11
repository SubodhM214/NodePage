const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : `${req.url}.html`
  );

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, "404.html"), (err, notFound) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        } else {
          res.writeHead(404, { "content-type": "text/html" });
          res.end(notFound);
        }
      });
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const server = http.createServer((req, res) => {
//   // Determine the file path based on the URL
//   let filePath = path.join(
//     __dirname,
//     req.url === "/" ? "index.html" : `${req.url}.html`
//   );

//   // Attempt to read the requested file
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       // If the file doesn't exist, serve the 404 page
//       fs.readFile(path.join(__dirname, "404.html"), (err, notFound) => {
//         if (err) {
//           // If the 404 page is missing, send a plain text error
//           res.writeHead(500, { "Content-Type": "text/plain" });
//           res.end("Internal Server Error");
//         } else {
//           // Serve the 404 page
//           res.writeHead(404, { "Content-Type": "text/html" });
//           res.end(notFound);
//         }
//       });
//     } else {
//       // Serve the requested file
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(data);
//     }
//   });
// });

// server.listen(8080, () => {
//   console.log("Server is running on http://localhost:8080");
// });
