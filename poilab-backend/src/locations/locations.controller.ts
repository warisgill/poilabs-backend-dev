import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from "@nestjs/common";
import { LocationsService } from "./locations.service";


/*
    Do not sepecify the return type in controller. If the return type is javascript object, then the NestJS will automatically set the  "contentype header" to json header. 
    Typescript will automatically infer the return type. 
    Note: if the return type is String then explicitly set the contenttype header, otherwise the it will be set to text/html.

    REQUEST TYPEPS
    HTTP Request Method decorators. 
    @Post() => to add new data. // also can be uses @Post("anything")
    @Get() => to fetch data.
    @Delete() => to delete daa
    @Patch() => to update existing data.

    EXTRACT REQUEST PARAMETERS
    @Body() => this decorator has the data inside it. 
    @Param() => this decorator is used to extract the id or similar stuff from the url.
*/


@Controller() // this decorator turns the below class to controllers 
export class ProductsController {
    private readonly locationsService : LocationsService;
    
    constructor(locationsService:LocationsService){
        this.locationsService = locationsService;
    } //nestjs will create this object
    
    @Get("child")
    async getChildren(){
        console.log("request recv");
        const points = await this.locationsService.fetchChildren();
        console.log(points.length)
        return points; 
    }

    @Get("api/route")
    async findShortestPath(@Query() params){
        // console.log(params);
        const path = await this.locationsService.getShortestPath(params["from"], params["to"])
        return path;
    }
      
} 

