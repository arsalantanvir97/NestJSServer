import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usersdata } from './usersdata.model'
import * as admin from "firebase-admin";
const serviceAccount = require("../../player-cloud-tech-firebase-adminsdk-73bm5-a080777234.json");

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://player-cloud-tech.firebaseio.com",
    });  }




@Injectable()
export class UsersdataService {
    constructor(@InjectModel('Usersdata') private readonly usersdataModel: Model<any>) { }


    async createusersdata(userid: any,fcmtoken:any): Promise<any> {
        console.log('userid', userid,fcmtoken)
        // let checknode = await this.nodeModel.find({ nodeid: node.nodeid })
        // console.log('checknode', checknode)
        // const checkuser = await this.usersdataModel.findOne({ userid:userid })
        // console.log('checkuser', checkuser)
        // if (checkuser) {
        //   return { message: 'User Already exists' }
        // } else {
        //   const newuser = new this.usersdataModel({userid:userid,fcmtoken:fcmtoken});
        //   console.log('newuser', newuser)
        //   return await newuser.save();
        // }
        const createdataofusers=await this.usersdataModel.findOneAndUpdate({userid:userid}, {userid:userid ,fcmtoken:fcmtoken}, { new: true,upsert: true,returnNewDocument:true });
        console.log("createdataofusers",createdataofusers)
        return await createdataofusers.save()
    }
   


    async getdataofusers(userid: any): Promise<any> {

console.log('userid22',userid)

const getdataofuser = await this.usersdataModel.findOne({ userid:userid })
return getdataofuser

}
async reqNotification(userid: any,userName:any,res: any): Promise<any> {

    console.log('userid22',userid,userName)
    
    const getdataofuser = await this.usersdataModel.findOne({ userid:userid })
    console.log('getdataofuser',getdataofuser)
    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    const payload = {
        notification: {
            title: 'Request Notification',
            body: `${userName} send you a Connection Request`
        }
    };
    const token=getdataofuser?.fcmtoken
    console.log('tokentoken',token)
    admin.messaging().sendToDevice(token, payload, notification_options)
        .then(response => {
            //configure your response here

            res.status(200).send({ message: "Notification sent successfully" })
            console.log('response', response)
            // console.log(response?.results[0]?.error);


        })
        .catch(error => {
            console.log(error);
        });

    }

    async popupofnotification(userid: any): Promise<any> {
console.log('reqqqqqqqqqqqqqq',userid)
      try {
     let userdata= await this.usersdataModel.findOneAndUpdate({userid:userid},{reqnotif:true}, { new: true });
     console.log('userdata1',userdata)
     return await userdata.save()
    //  userdata={
    //     reqnotif:userdata.reqnotif,_id:userdata._id,userid:userdata.userid,fcmtoken:userdata.fcmtoken
    //  }
    //  console.log('userdata2',userdata)
    //  return await userdata.save()

      } catch (error) {
          console.log('notifpopuperror',error)
      }
        }
        async closepopupofnotification(userid: any): Promise<any> {
            console.log('reqqqqqqqqqqqqqq',userid)
                  try {
                 let userdata= await this.usersdataModel.findOneAndUpdate({userid:userid},{reqnotif:false}, { new: true });
                 console.log('userdata1',userdata)
                 return await userdata.save()
                //  userdata={
                //     reqnotif:userdata.reqnotif,_id:userdata._id,userid:userdata.userid,fcmtoken:userdata.fcmtoken
                //  }
                //  console.log('userdata2',userdata)
                //  return await userdata.save()
            
                  } catch (error) {
                      console.log('notifpopuperror',error)
                  }
                    }
    
}