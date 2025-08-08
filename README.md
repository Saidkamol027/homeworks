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

# Vazifa - MongoDB va File Upload API

Bu loyiha NestJS, MongoDB va Mongoose yordamida yaratilgan API bo'lib, file yuklash funksiyasiga ega.

## O'rnatish

```bash
npm install
```

## MongoDB o'rnatish

MongoDB'ni o'rnatib, ishga tushiring:

```bash
# Windows uchun
mongod

# Yoki Docker orqali
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Ishga tushirish

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoint'lar

### Users

- `POST /users` - Yangi foydalanuvchi yaratish
- `GET /users` - Barcha foydalanuvchilarni olish
- `GET /users/:id` - Foydalanuvchini ID bo'yicha olish
- `PATCH /users/:id` - Foydalanuvchini yangilash
- `POST /users/:id/avatar` - Avatar yuklash (5MB, png/jpeg/jpg)
- `DELETE /users/:id` - Foydalanuvchini o'chirish

### Posts

- `POST /posts` - Yangi post yaratish
- `GET /posts` - Barcha postlarni olish
- `GET /posts/:id` - Postni ID bo'yicha olish
- `PATCH /posts/:id` - Postni yangilash
- `POST /posts/:id/images` - Rasmlar yuklash (10MB, png/jpeg/jpg/gif)
- `POST /posts/:id/video` - Video yuklash (100MB, mp4/avi/mov/mkv)
- `POST /posts/:id/document` - Hujjat yuklash (50MB, pdf/doc/docx/txt)
- `DELETE /posts/:id` - Postni o'chirish

### Comments

- `POST /comment` - Yangi komment yaratish
- `GET /comment` - Barcha kommentlarni olish
- `GET /comment/:id` - Kommentni ID bo'yicha olish
- `PATCH /comment/:id` - Kommentni yangilash
- `POST /comment/:id/attachments` - Fayllar yuklash (10MB, png/jpeg/jpg/pdf/doc/docx/txt)
- `DELETE /comment/:id` - Kommentni o'chirish

### Categories

- `POST /category` - Yangi kategoriya yaratish
- `GET /category` - Barcha kategoriyalarni olish
- `GET /category/:id` - Kategoriyani ID bo'yicha olish
- `PATCH /category/:id` - Kategoriyani yangilash
- `POST /category/:id/icon` - Icon yuklash (5MB, png/jpeg/jpg/svg)
- `DELETE /category/:id` - Kategoriyani o'chirish

## File Upload

Loyiha quyidagi file turlarini qo'llab-quvvatlaydi:

### Users

- **Avatar**: png, jpeg, jpg (5MB)

### Posts

- **Images**: png, jpeg, jpg, gif (10MB, ko'p fayl)
- **Video**: mp4, avi, mov, mkv (100MB)
- **Documents**: pdf, doc, docx, txt (50MB)

### Comments

- **Attachments**: png, jpeg, jpg, pdf, doc, docx, txt (10MB, ko'p fayl)

### Categories

- **Icon**: png, jpeg, jpg, svg (5MB)

## Database Schema

### User

```javascript
{
  name: String (required),
  phone: String (required, unique),
  age: Number (required),
  avatar: String (optional),
  posts: [ObjectId],
  comments: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Post

```javascript
{
  title: String (required),
  content: String (required),
  userId: ObjectId (required, ref: User),
  categoryId: ObjectId (required, ref: Category),
  images: [String] (optional),
  video: String (optional),
  document: String (optional),
  comments: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Comment

```javascript
{
  content: String (required),
  userId: ObjectId (required, ref: User),
  postId: ObjectId (required, ref: Post),
  attachments: [String] (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Category

```javascript
{
  name: String (required, unique),
  icon: String (optional),
  posts: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

`.env` faylida quyidagi o'zgaruvchilarni o'rnating:

```
MONGODB_URI=mongodb://localhost:27017/vazifa
PORT=3000
```

## File Storage

Yuklangan fayllar `uploads/` papkasida saqlanadi:

- `uploads/avatars/` - Foydalanuvchi avatarlari
- `uploads/posts/images/` - Post rasmlari
- `uploads/posts/videos/` - Post videolari
- `uploads/posts/documents/` - Post hujjatlari
- `uploads/comments/attachments/` - Komment fayllari
- `uploads/categories/icons/` - Kategoriya ikonlari

## Xatoliklar

API quyidagi xatolik kodlarini qaytaradi:

- `400` - Noto'g'ri so'rov
- `404` - Ma'lumot topilmadi
- `409` - Konflikt (masalan, mavjud telefon raqam)
- `413` - File hajmi juda katta
- `415` - Noto'g'ri file turi
- `500` - Server xatosi

## Misol so'rovlar

### Foydalanuvchi yaratish

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+998901234567",
    "age": 25
  }'
```

### Avatar yuklash

```bash
curl -X POST http://localhost:3000/users/USER_ID/avatar \
  -F "avatar=@/path/to/avatar.jpg"
```

### Post yaratish

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is my first post content",
    "userId": "USER_ID",
    "categoryId": "CATEGORY_ID"
  }'
```

### Rasmlar yuklash

```bash
curl -X POST http://localhost:3000/posts/POST_ID/images \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.png"
```
