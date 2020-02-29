import { Schema } from 'mongoose';
import { Document } from 'mongoose';

/*
    Schema is not a Typescript object. It is pure javascript object.
    Its the collection. 
*/
export const PointSchema = new Schema({
    "id": { type: String, required: true },
    "title": String,
    "description": String,
    "filters": {},
    "location": {},
    "navigation": {}
});

/*
    Defiing the Point2D data Type using interfaces 
    which inherts the Document type to use mongoose methods 
*/

export interface Point extends Document {
    "id": string,
    "title": string,
    "description": string,
    "filters": {
        "networkType": string,
        "pointType": [string]
    },
    "location": {
        "type": string,
        "geometry": {
            "type": string,
            "coordinates": number []
        },
        "properties": {
            "floorLevel": number,
            "shopCenterPoint":number[]
        }
    },
    "navigation": {
        "segments": [
            {
                "id": string,
                "weight": number,
                "mapWeight": number,
                "isAvailableForDisabledPerson" : boolean

            }
        ],
        "properties": {
            "isVisibleOnList": boolean
        }
    }
}
