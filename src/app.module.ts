import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile : join(process.cwd(), 'src/schema.gql'),
    driver : ApolloDriver
  }) , PetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
