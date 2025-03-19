import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cluster from 'node:cluster';
import { availableParallelism } from 'os';

if (cluster.isPrimary) {
  const numCPUs = availableParallelism();
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log(`Worker ${process.pid} started on port: 3000`);
  }
  bootstrap();
}
