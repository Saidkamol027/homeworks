<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# E-commerce API

Bu NestJS da yaratilgan e-commerce tizimi API si.

## Features

- **Users Management** - Foydalanuvchilarni boshqarish
- **Categories Management** - Mahsulot kategoriyalarini boshqarish
- **Products Management** - Mahsulotlarni boshqarish
- **Orders Management** - Buyurtmalarni boshqarish
- **Order Items Management** - Buyurtma elementlarini boshqarish

## Installation

```bash
npm install
```

## Environment Variables

`.env` fayl yarating va quyidagi o'zgaruvchilarni to'ldiring:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=ecommerce_db
PORT=3000
```

## Database Setup

PostgreSQL ma'lumotlar bazasini yarating va `.env` faylda ko'rsatilgan ma'lumotlarni to'ldiring.

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Endpoints

### Users

- `POST /users` - Yangi foydalanuvchi yaratish
- `GET /users` - Barcha foydalanuvchilarni olish
- `GET /users/:id` - Foydalanuvchini ID bo'yicha olish
- `PATCH /users/:id` - Foydalanuvchini yangilash
- `DELETE /users/:id` - Foydalanuvchini o'chirish

### Categories

- `POST /categries` - Yangi kategoriya yaratish
- `GET /categries` - Barcha kategoriyalarni olish
- `GET /categries/:id` - Kategoriyani ID bo'yicha olish
- `PATCH /categries/:id` - Kategoriyani yangilash
- `DELETE /categries/:id` - Kategoriyani o'chirish

### Products

- `POST /products` - Yangi mahsulot yaratish
- `GET /products` - Barcha mahsulotlarni olish
- `GET /products/:id` - Mahsulotni ID bo'yicha olish
- `PATCH /products/:id` - Mahsulotni yangilash
- `DELETE /products/:id` - Mahsulotni o'chirish

### Orders

- `POST /orders` - Yangi buyurtma yaratish
- `GET /orders` - Barcha buyurtmalarni olish
- `GET /orders/:id` - Buyurtmani ID bo'yicha olish
- `PATCH /orders/:id` - Buyurtmani yangilash
- `DELETE /orders/:id` - Buyurtmani o'chirish

### Order Items

- `POST /order-item` - Yangi buyurtma elementi yaratish
- `GET /order-item` - Barcha buyurtma elementlarini olish
- `GET /order-item/:id` - Buyurtma elementini ID bo'yicha olish
- `PATCH /order-item/:id` - Buyurtma elementini yangilash
- `DELETE /order-item/:id` - Buyurtma elementini o'chirish

## Database Schema

- **users** - Foydalanuvchilar
- **categories** - Mahsulot kategoriyalari
- **products** - Mahsulotlar
- **orders** - Buyurtmalar
- **order_item** - Buyurtma elementlari

## Technologies Used

- NestJS
- TypeORM
- PostgreSQL
- Class Validator
- Class Transformer
