import * as mongoose from 'mongoose';

export const UsersdataSchema = new mongoose.Schema({
    userid: { type: String, },
    fcmtoken: { type: String },
    reqnotif:{type:Boolean,default:false}
})


export interface Usersdata {

    userid: string;
    fcmtoken: string;
    reqnotif:boolean

}