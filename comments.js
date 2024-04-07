//Create web server
const http = require("http");
const fs = require("fs");
const path = require("path");
const comments = require("./comments.json");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(
      path.join(__dirname, "public", "index.html"),
      "utf8",
      (err, content) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    );
  }

  if (req.url === "/comments") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(comments));
  }

  if (req.url === "/add-comment") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { comment } = JSON.parse(body);
      comments.push(comment);
      fs.writeFile(
        path.join(__dirname, "comments.json"),
        JSON.stringify(comments),
        (err) => {
          if (err) throw err;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(comments));
        }
      );
    });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Path: public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Comments</title>
  </head>
  <body>
    <h1>Comments</h1>
    <form id="comment-form">
      <input type="text" id="comment" />
      <button type="submit">Submit</button>
    </form>
    <ul id="comments"></ul>
    <script src="app.js"></script>
  </body>
</html>
// Path: public/app.js
const form = document.getElementById("comment-form");
const commentsList = document.getElementById("comments");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const comment = document.getElementById("comment").value;
  fetch