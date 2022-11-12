const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({
  json: true,
  urlencoded: true,
  multipart: true
}));

let nextId = 1;
const skills = [
  {id: nextId++, name: "React"},
  {id: nextId++, name: "Redux"},
  {id: nextId++, name: "Redux Thunk"},
  {id: nextId++, name: "RxJS"},
  {id: nextId++, name: "Redux Observable"},
  {id: nextId++, name: "Redux Saga"},
];

let nextIdServises = 1;
const services = [
    { id: nextIdServises++, name: 'Замена стекла', price: 21000, content: 'Стекло оригинал от Apple'},
    { id: nextIdServises++, name: 'Замена дисплея', price: 25000, content: 'Дисплей оригинал от Foxconn'},
    { id: nextIdServises++, name: 'Замена аккумулятора', price: 4000, content: 'Новый на 4000 mAh'},
    { id: nextIdServises++, name: 'Замена микрофона', price: 2500, content: 'Оригинальный от Apple'},
];

function fortune(ctx, body = null, status = 200) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.25) {
        ctx.response.status = status;
        ctx.response.body = body;
        resolve();
        return;
      }

      reject(new Error('Something bad happened'));
    }, 3 * 1000);
  })
}

const router = new Router();
let isEven = true;

router.get('/api/search', async (ctx, next) => {
    
  const {q} = ctx.request.query;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (q !== '') {
        const response = skills.filter(o => o.name.toLowerCase().startsWith(q.toLowerCase()));
        ctx.response.body = response;
        resolve();
      } else {
        ctx.response.body = [];
        resolve();
      }
    }, isEven ? 1 * 1000 : 5 * 1000);
    isEven = !isEven;
  });
});

router.get('/api/services', async (ctx, next) => {
  const body = services.map(o => ({id: o.id, name: o.name, price: o.price}))
  return fortune(ctx, body);
});

router.get('/api/services/:id', async (ctx, next) => {
  const id = Number(ctx.params.id);
  const index = services.findIndex(o => o.id === id);
  if (index === -1) {
      const status = 404;
      return fortune(ctx, null, status);
  }
  const body = services[index];
  return fortune(ctx, body);
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

server.listen(port);
