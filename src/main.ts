import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const mongoose = require('mongoose');

const database = "entregables1";
async function ConectarMongo() {
  console.log('Iniciando conexion a mongodb');
  try{
    await mongoose.connect(`mongodb://localhost:27017/${database}`, {
      useNewUrlParser: true
    });
    console.log('Conexion a mongodb completada.');
  }
  catch(err){
    console.log(err);
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await ConectarMongo();
  await app.listen(3000);
}
bootstrap();
