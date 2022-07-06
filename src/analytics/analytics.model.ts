import * as mongoose from 'mongoose';

export const AnalyticsSchema = new mongoose.Schema({
    user_id: {type: String},
    userName: {type: String},
    analyticsRecord:{type: Array},
    chatcomments:{type: Array},
    chatbadges:{type: Array},
    uniqueNameRecord:{type: Array},
gender:{type: String},
history:{type: Array},
    thumbnail: {
        type: Array,
    },
    analysisArray:{
        type: Array,
    },
    status:{
type:String
    },
    kicktype: {
        type: String,
    },
    
    useravatar: {
        type: String,
    },
    Post_Frame: {
        type: String,
    },
    ai_video:  {
        type: Array,
    },
    ai_response:  {
        type: Array,
    },
    videouri:  {
        type: Array,
    },
    kickfoot:{
        type:String
    },
    shared_to:  {
        type: Array,
    }, analysis: {
        type: Array,
    }, connectioninfo: {
        type: Array,
    },
    beat_that:{type:Boolean,default:false},
    reportabuse:{type:Boolean,default:false},

    userUniqueName:{type:String}
}, {
    timestamps: true,
})


export interface Analytics {

    user_id: string;
    userName:string;
    gender:string;
    history:string[];
    analyticsRecord:string[];
    chatcomments:string[];
    chatbadges:string[];
    uniqueNameRecord:string[];

    diameter:string,
    ball_height:string,
    height:string;
    kickingFoot:string;
    thumbnail: string[];
    analysisArray: string[];
    status:string;
    useravatar:string;
    Post_Frame: string;
    ai_video: string[];
    videouri: string[];
    kickfoot: string;
beat_that:boolean;
reportabuse:boolean;
video:any
    ai_response: string[];
kicktype:string;
    shared_to: string[];

    analysis: string[];
    connectioninfo:string[];
    userUniqueName:string[]

}
export class CreateAnalyticsDto {
    user_id: string;
    userName:string;
    gender:string;
    history:string[];
    analyticsRecord:string[];
    chatcomments:string[];
    chatbadges:string[];
    uniqueNameRecord:string[];

    height:string;
    kickingFoot:string;
    status:string;
    useravatar:string;

    thumbnail: string[];
    analysisArray: string[];

    Post_Frame: string;
    ai_video: string[];
    ai_response: string;
    kicktype:string;
    videouri: string[];
video:any;
    shared_to: string[];
    diameter:string;
    ball_height:string;
    analysis: string[]
    connectioninfo:string[]

}