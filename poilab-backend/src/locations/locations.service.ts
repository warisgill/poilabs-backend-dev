import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'

import {Point} from './locations.model'
import { ProductsController } from "./locations.controller";

@Injectable() // To make following class injectable.
export class LocationsService {
    /*
        =>to inject the Mongoose Point Model
        =>locationModel is constructor funciton
        =>locationModel is has type of document.
        =>.exec() returns a promise
        =>.save() returns a promise
    */
    constructor(@InjectModel('Point') private readonly locationModel: Model<Point>) { 
    } 
    
    async fetchChildren() {
        const points_promise = await this.locationModel.find({"navigation.properties.isVisibleOnList": true}).exec();
        return points_promise.map( point=>({
            id: point.id,
            title: point.title,
            description: point.description,
            location: point.location
        }));
    }

    async getShortestPath(source:string, destination: string ){
        // implement the shorestes algo
        console.log(source,destination);

        return "run the Dijkastra or Bellman Ford Algo"
    }

  
}