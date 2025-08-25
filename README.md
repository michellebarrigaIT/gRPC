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
        proto/
            user.ts
            task.ts
    users/
        src/
            users/
                dto/
                entities/
                users.service.ts
                users.controller.ts
                users.module.ts
            proto/
                user.ts
                task.ts
            main.ts
            app.module.ts
    tasks/
        src/
            tasks/
                dto/
                entities/
                tasks.service.ts
                tasks.controller.ts
                tasks.module.ts
            proto/
                user.ts
                task.ts
    protos/
        user.proto
        task.proto
    build.sh
    package.json
```
