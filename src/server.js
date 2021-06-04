import './db';
import './models/Video';

import express from 'express';
import morgan from 'morgan';
import globalRouter from './router/globalRouter';
import userRouter from './router/userRouter';
import videoRouter from './router/videoRouter';

const PORT = 4000;

const app = express();
const logger = morgan('dev');

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
  if (protocol === 'https') {
    console.log('Secure');
  } else {
    console.log('Insecure');
  }
  next();
};

const handleHome = (req, res) => {
  //   return res.end();
  return res.send('<h1>Home Page</h1>');
};

const handleProtected = (req, res) => {
  return res.send('<h1>Protected Page</h1>');
};

// 애플리케이션 레벨 미들웨어 -> 앱이 요청을 수신할 때마다 실행

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

app.get('/', handleHome);
app.get('/protected', handleProtected);

const handleListening = () => console.log('Server listening on port 4000 💥⚡️');

app.listen(PORT, handleListening);
