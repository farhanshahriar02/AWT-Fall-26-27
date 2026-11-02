
import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { UsersModule } from './users/users.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [ObserveModule.forRoot({ serviceId: 'lab-task-3' }), UsersModule],
})
export class AppModule {}
