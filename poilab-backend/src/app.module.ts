import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {LocationsModule } from './locations/locations.module';
import {MongooseModule} from '@nestjs/mongoose'


@Module({
  imports: [LocationsModule, MongooseModule.forRoot("mongodb+srv://waris:ZDGtqllpMskQfv9f@sandbox-v2mqr.mongodb.net/poilabs-db?retryWrites=true&w=majority")], // linking to our moudle "Product Module =>its a nestjs feature to link module together.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
