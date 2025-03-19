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
      maxThreads: 10,
      minThreads: 10,
      // idleTimeout: 100,
    });
  }

  @Post('/submit')
  async submit() {
    const startTime = Date.now();
    const data = await this.pool.run({});
    // const ans: number[] = [];
    // for (let i = 0; i < 1000000; i++) {
    //   if (i % 2 == 0) {
    //     ans.push(i);
    //   }
    // }
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    console.log(`Time taken: ${timeTaken}ms`);
    // return ans;
  }
}
