<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar el siguiente comando

```
$ npm install
```
3. Tener NestCLI previamente instalado

```
$ npm i -g @nestjs/cli
```

4. Levantar la Base de Datos

```
docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__
6. Llenar las variables de entorno definidas en __.env__


7. Ejecutar la app

```
npm run start:dev
```

8. Poblar base de datos con semilla

```
http://localhost:3000/api/v2/seed/
```

## Stack usado
NestJS y
MongoDB