import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { join } from 'path';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';


@Module({
  imports: [UsersModule, ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      // type: configService.get('DB_TYPE') as DatabaseType,
      type:'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      //do not use in production
      synchronize: true
    })
  }), MoviesModule, AuthModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
