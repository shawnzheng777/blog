import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/index.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { globalConfig, databaseConfig } from './config';
import { LoggerMiddleware } from './middleware';

const { env } = process;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      username: env.DB_NAME,
      port: Number(env.DB_PORT),
      host: env.DB_HOST,
      password: env.DB_PASSWORD,
      type: 'mysql',
      database: env.DB_DATABASE,
      synchronize: false,
      autoLoadEntities: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
