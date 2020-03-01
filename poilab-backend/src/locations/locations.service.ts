import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'

import {Point} from './locations.model'
import * as Graph  from "node-dijkstra"

@Injectable() // To make following class injectable.
export class LocationsService {
    
    private nodes : any;
    private graph = new Graph();

    constructor(@InjectModel('Point') private readonly locationModel: Model<Point>) {
        this.constructGraph();
    } 

    private async constructGraph(){
        const points = await this.locationModel.find().exec();
        
        this.nodes = points.map(point=>({
            id: point.id,
            neighbor: point.navigation.segments
        }));

        this.nodes.forEach(element => {
          let temp = {};
          if(element.neighbor){
            element.neighbor.forEach(n => {
                temp[n.id] = n.weight;
            });
          }
          this.graph.addNode(element.id,temp)  
        });
        
        //console.log(this.graph);
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

    getShortestPath(source:string, destination: string ){
        if(source === destination){
            throw new NotFoundException("Source and destination are same.")
        }
        
        const result = this.graph.path(source,destination, {cost:true});
        const short_path = {dist: result.cost, route:[]};

        if(result.path){
            let cost: number;
            for (let i = 0; i<result.path.length-1; i++){
                cost = this.graph.path(result.path[i],result.path[i+1], {cost:true})["cost"]; 
                short_path.route.push([result.path[i], cost])
            }
            short_path.route.push([destination]);
        } else {
            throw new NotFoundException("Path not found.");
        }

        return short_path;
    }
  
}