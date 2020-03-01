import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from "@nestjs/common";
import { LocationsService } from "./locations.service";



@Controller() // this decorator turns the below class to controllers 
export class ProductsController {
    private readonly locationsService : LocationsService;
    
    constructor(locationsService:LocationsService){
        this.locationsService = locationsService;
    } //nestjs will create this object
    
    @Get("childs")
    async getChildren(){
        const points = await this.locationsService.fetchChildren();
        return points; 
    }

    @Get("api/route")
    findShortestPath(@Query("from") source: string,@Query("to") dest:string){
        const path = this.locationsService.getShortestPath(source, dest);
        return path;
    }
      
} 

