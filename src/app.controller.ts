import { Controller, Post } from '@nestjs/common';
import { resolve } from 'path';
import Piscina from 'piscina';
import { AppService } from './app.service';
@Controller()
export class AppController {
  private pool: Piscina;
  constructor(private readonly appService: AppService) {
    console.log('This is dirname: ', __dirname);

    this.pool = new Piscina({
      filename: resolve(__dirname, '../worker.js'),
      maxThreads: 12,
      minThreads: 12,
      // idleTimeout: 100,
    });
  }

  @Post('/submit')
  async submit() {
    const startTime = Date.now();
    const data = await this.pool.run({});
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    console.log(`Time taken: ${timeTaken}ms`);
    // return ans;
  }
}
