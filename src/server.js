import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import { localsMiddlewares } from './middlewares';

import rootRouter from './router/rootRouter';
import userRouter from './router/userRouter';
import videoRouter from './router/videoRouter';

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

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

// 애플리케이션 레벨 미들웨어 -> 앱이 요청을 수신할 때마다 실행
app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'Hello',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(localsMiddlewares);

app.use('/', rootRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

export default app;
