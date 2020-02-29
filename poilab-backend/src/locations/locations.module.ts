// to tie our prouduct feature 

import { Module } from "@nestjs/common";
import { ProductsController } from "./locations.controller";
import { LocationsService } from "./locations.service";
import {MongooseModule} from '@nestjs/mongoose'
import { PointSchema } from "./locations.model";

const obj = {
    imports: [MongooseModule.forFeature([{name:'Point',schema:PointSchema}])], // now we can use Point Model in our service
    controllers: [ProductsController], 
    providers:[LocationsService]
}; // we are passing classes names not objects

@Module(obj)

export class LocationsModule{} // now let to know nestjs about this module