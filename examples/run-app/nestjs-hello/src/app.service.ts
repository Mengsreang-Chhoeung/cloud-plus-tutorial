import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const message = process.env.APP_MESSAGE || 'Hello from Run App!';
    return `<h1>${message}</h1><p>Served by NestJS on Run App.</p>`;
  }

  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}
