import express from "express";

const PORT = 4000;

const app = express();

const urlLogger = (req, res, next) => {
  const { url } = req;
  console.log(`Path: ${url}`);
  next();
};

const timeLogger = (req, res, next) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const formattedDate = `${year}.${month}.${date}`;
  console.log(`Time: ${formattedDate}`);
  next();
};

const securityLogger = (req, res, next) => {
  const { protocol } = req;
  if (protocol === "https") {
    console.log("Secure");
  } else {
    console.log("Insecure");
  }
  next();
};

const protectorMiddleware = (req, res, next) => {
  const { url } = req;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  next();
};

const handleHome = (req, res) => {
  //   return res.end();
  return res.send("<h1>Home Page</h1>");
};

const handleProtected = (req, res) => {
  return res.send("<h1>Protected Page</h1>");
};

// 애플리케이션 레벨 미들웨어 -> 앱이 요청을 수신할 때마다 실행
app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(protectorMiddleware);

app.get("/", handleHome);
app.get("/protected", handleProtected);

const handleListening = () =>
  console.log("Server listening on port 4000 💥⚡️");

app.listen(PORT, handleListening);
