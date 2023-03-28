import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm';
//import TypeOrmModule from '@nestjs/typeorm'

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile : join(process.cwd(), 'src/schema.gql'),
    driver : ApolloDriver
  }),TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'SuperSecret!23',
      autoLoadEntities: true,
      type:'postgres',
      database:'postgres',
      entities:['dist/**/*.entity{.ts,.js}'],
      synchronize:true
  }),
  PetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
