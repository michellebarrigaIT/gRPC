## Project setup

```bash
$ npm install
```

```bash
$ ./build.sh
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

## Structure
```bash
grpc/
    gateway/
        src/
        modules/
            user.module.ts
        main.ts

    package.json    users/
        src/
            users/
                dto/
                entities/
                users.service.ts
                users.controller.ts
                users.module.ts
    tasks/
        src/
            tasks/
                dto/
                entities/
                tasks.service.ts
                tasks.controller.ts
                tasks.module.ts
    protos/
        user.proto
        task.proto
    dist/
        user.ts
        task.ts
```
