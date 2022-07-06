import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analytics } from './analytics.model'
import * as admin from "firebase-admin";
import fetch from 'node-fetch'
import { json } from 'express';
const serviceAccount = require("../../player-cloud-tech-firebase-adminsdk-73bm5-a080777234.json");
var FormData = require('form-data');
var fs = require('fs');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://player-cloud-tech.firebaseio.com",
});

@Injectable()
export class AnalyticsService {
    constructor(@InjectModel('Analytics') private readonly analyticsModel: Model<any>) { }

    async reportingaabuse(analyticsid:any): Promise<any> {
        return await this.analyticsModel.findByIdAndUpdate({_id: analyticsid }, { reportabuse: true }, { new: true });

    }

    async findOne(id: string): Promise<any> {
        console.log('findOneid',id)
        let gettingTheAnalysis=await this.analyticsModel.findOne({ _id: id });
        let uniqueNameBadges=[]
        console.log('gettingTheAnalysis',gettingTheAnalysis)
        for(let items of gettingTheAnalysis?.uniqueNameRecord){
            console.log('helllllo',items)
            let singleUserBadges=[]
//             singleUserBadges.push(gettingTheAnalysis?.chatbadges?.map(nested=>{
// if(items==nested.recievedUniqueName){
//     console.log('heeeeeeelo',items,nested.recievedUniqueName)
//     nested.recievedUniqueName
// }
//             }))
gettingTheAnalysis?.chatbadges?.map(nested=>{
    if(items==nested?.recievedUniqueName){
            console.log('heeeeeeelo',items,nested.recievedUniqueName)
            singleUserBadges.push({userBadges:nested.badgeName,assigneruserid:nested.assigneruserid,recievedUniqueName:nested.recievedUniqueName})
        }
    console.log('heeeeeeelo',items,nested.recievedUniqueName)
}
    )
console.log('singleUserBadges',singleUserBadges)
uniqueNameBadges.push(singleUserBadges)
        }

console.log('uniqueNameBadges',uniqueNameBadges)
gettingTheAnalysis.chatbadges=uniqueNameBadges
console.log('returningbadgesandchats',gettingTheAnalysis)
return gettingTheAnalysis
    }

    async filteredAnalysis(user_id: any): Promise<any> {
        // console.log('user_id', user_id)
        const findbyuserid = await this.analyticsModel.find({ $or: [{ shared_to: user_id }, { user_id: user_id }] }).sort({ _id: -1 });



        // console.log('findbyuserid', findbyuserid)
        return findbyuserid


    }

    async getBadgesOfUsers(analysisid: any): Promise<any> {
        console.log('analysisid', analysisid)
        const gettingTheAnalysis= await this.analyticsModel.findOne({ _id: analysisid });
        let uniqueNameBadges=[]
        console.log('gettingTheAnalysis',gettingTheAnalysis)
        for(let items of gettingTheAnalysis?.uniqueNameRecord){
            console.log('helllllo',items)
            let singleUserBadges=[]
//             singleUserBadges.push(gettingTheAnalysis?.chatbadges?.map(nested=>{
// if(items==nested.recievedUniqueName){
//     console.log('heeeeeeelo',items,nested.recievedUniqueName)
//     nested.recievedUniqueName
// }
//             }))
gettingTheAnalysis?.chatbadges?.map(nested=>{
    if(items==nested?.recievedUniqueName){
            console.log('heeeeeeelo',items,nested.recievedUniqueName)
            singleUserBadges.push({userBadges:nested.badgeName})
        }
    console.log('heeeeeeelo',items,nested.recievedUniqueName)
}
    )
console.log('singleUserBadges',singleUserBadges)
uniqueNameBadges.push(singleUserBadges)
        }

console.log('uniqueNameBadges',uniqueNameBadges)
return uniqueNameBadges
    }
    
    async createtoken(token: any, body: any, title: any, res: any): Promise<any> {

      

        const notification_options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };

        const payload = {
            notification: {
                title: title,
                body: body
            }
        };
        admin.messaging().sendToDevice(token, payload, notification_options)
            .then(response => {
                //configure your response here

                res.status(200).send({ message: "Notification sent successfully" })
                // console.log('response', response)

            })
            .catch(error => {
                // console.log(error);
            });

    }

    async sendAnalysis(user_id: any,userName:any, userUniqueName:any,gender:any,height:any,kickingFoot:any,videouri: any, kicktype: string, useravatar:any,diameter:any,ball_height:any,token: any, video: any): Promise<any> {
        // console.log('sharedanalysis', user_id, userName,gender,height,kickingFoot,videouri, video, kicktype, useravatar,token)
       console.log('diameterrrrrrrrr',typeof(diameter),typeof(ball_height),typeof(user_id),typeof(userName),typeof(userUniqueName),typeof(gender),typeof(height),typeof(kickingFoot),typeof(videouri),typeof(kicktype),typeof(useravatar),typeof(diameter),typeof(ball_height),typeof(token),typeof(video.buffer))
        let thumbnailOfVideoUri="https://playercloudbucket.s3.us-east-2.amazonaws.com/Profile_pictures/User_abcz123989/profile_picture.png"
        try {
            // throw[404,'something went wrong']        
let kickfoot=kickingFoot==='Left Foot' ? 'Left' : 'Right'
// console.log('kickfoot',kickfoot)
            let formData = new FormData();
            const newAnalyis = await new this.analyticsModel({ user_id: user_id,userName:userName,gender:gender,userUniqueName:userUniqueName,thumbnail:thumbnailOfVideoUri, kicktype: kicktype, useravatar:useravatar,videouri: videouri ,kickfoot:kickfoot});
            // console.log('newAnalyis', newAnalyis)
            let useranalysis = await newAnalyis.save()
            console.log('useranalysis', useranalysis)
            const findUserIdinAnalysis = await this.analyticsModel.find({ user_id: user_id })
            console.log('findUserIdinAnalysis',findUserIdinAnalysis)
            const initial = findUserIdinAnalysis ? 'False' : 'True'
            var filetype = 'video'
            var filename = 'video'
            // console.log('initial', initial)
            // console.log('useranalysis', useranalysis, useranalysis._id, useranalysis.user_id, video)
          console.log('h0')
            formData.append('video_1', video.buffer, filename)
            console.log('h1')

            formData.append('video_2', '')
            console.log('h2')

            formData.append('video_3', '')
            console.log('h3')

            formData.append('video_flag_01', 'True')
            console.log('h4')

            formData.append('video_flag_02', 'False')
            console.log('h5')

            formData.append('video_flag_03', 'False')
            console.log('h6')

            formData.append('user_id', useranalysis.user_id)
            console.log('h7')

            formData.append('height', height)
            console.log('h8')

            formData.append('gender', gender)
            console.log('h9')

            formData.append('analysis_id', useranalysis._id + '')
            console.log('h10')

            formData.append('initial', initial)
            console.log('h0')

            formData.append('kick_type', kickfoot)
            console.log('h11')

            formData.append('token', token)
            console.log('h12')

            formData.append('diameter', diameter + '')
            console.log('h13')

            formData.append('ball_height', ball_height + '')

            console.log('h14')

            const options = {
                method: 'POST',
                body: formData,
                headers: formData.getHeaders()
            }
            console.log('h15')

            try {
                fetch('https://playercloud-backend.ml/api/video_processing', options)
            } catch (error) {
                console.log('error', error)
            }
            // .then(res => res.json())
            // .then(json => console.log(json)).catch(err=>console.log('error res',err));
            console.log('h16')

            useranalysis = {
                user_id: useranalysis.user_id,
                userName:useranalysis.userName,
                gender:useranalysis.gender,
                userUniqueName:useranalysis.userUniqueName,
                thumbnail:useranalysis.thumbnail,
                _id: useranalysis._id,
                videouri: useranalysis.videouri,
                createdAt: useranalysis.createdAt,
                kicktype: useranalysis.kicktype,
                useravatar:useranalysis.useravatar,
                kickfoot:useranalysis.kickfoot
            }
            console.log('h17',useranalysis)

            // console.log('useranalysis2', useranalysis)
            return useranalysis
        } catch (error) {
            console.log('error',error)
            throw [404, 'something went wrong']
        }
    }
    async sendImage(user_id: any,image: any): Promise<any> {
        // console.log('sendimage', user_id, image)
        try {
            // throw[404,'something went wrong']        
            let formData = new FormData();

            var filename = 'image'
            formData.append('Image', image.buffer, filename)
            formData.append('user_id',user_id)
       
          

            const options = {
                method: 'POST',
                body: formData,
                headers: formData.getHeaders()
            }
            let hosteduri
            try {
                fetch('http://139.59.34.247:5000/api/Profile_Picture', options).then(response => hosteduri=response.json())
            } catch (error) {
                // console.log('error', error)
            }
            // console.log('hosteduri',hosteduri)
            return hosteduri
            // .then(res => res.json())
            // .then(json => console.log(json)).catch(err=>console.log('error res',err));
         
            
        } catch (error) {
            throw [404, 'something went wrong']
        }
    }
    async creates(req: any): Promise<any> {
        // console.log('analysis', req)
        const newAnalyis = new this.analyticsModel(req);
        // console.log('newnewAnalyis', newAnalyis)
        return newAnalyis.save()
    }
    async beatThatCreates(req: any,beatthatid:any): Promise<any> {
        console.log('beatThatCreatesanalysis', req,beatthatid)
        try {
            let newAnalyis = await new this.analyticsModel(req?.beatthatdata);
            newAnalyis=await newAnalyis.save()
            console.log('newbeatThatCreates', newAnalyis)
            const updateanalysis= await this.analyticsModel.findByIdAndUpdate({_id:beatthatid},  {
                $push: {
                   history: {
                      $each: [ newAnalyis ],
                      $position: 0
                   }
                }
              } ,{new: true, upsert: true }).exec();
    // console.log('updateanalysis',updateanalysis)
            return newAnalyis
        } catch (error) {
            console.log('beatThatCreateserror',error)
        }
       
    }

    async delete(id: string): Promise<any> {
        return await this.analyticsModel.findByIdAndRemove(id);
    }

    async update(id: string, shared_to: string[], connectioninfo: string[]): Promise<any> {
        // console.log('id', id)
        return await this.analyticsModel.findByIdAndUpdate(id, { shared_to: shared_to, connectioninfo: connectioninfo }, { new: true });
    }
    async updatename(id: string, fileName: string): Promise<any> {
        return await this.analyticsModel.findByIdAndUpdate(id, { fileName: fileName }, { new: true });
    }
    async updatefolderid(id: string, folderId: string): Promise<any> {
        return await this.analyticsModel.findByIdAndUpdate(id, { folderId: folderId }, { new: true });
    }
    async createbeatthat(analyticsid: string,userid:string): Promise<any> {
        console.log('id', analyticsid,userid)
        let beatthatanalysis= await this.analyticsModel.findOne({_id:analyticsid})
        console.log('beatthatanalysis',beatthatanalysis)
        beatthatanalysis.shared_to.push(userid)
        console.log('beatthatanalysis2',beatthatanalysis)
        return beatthatanalysis.save()
    }
    async answerabeatthat(analyticsid: string,userid:string,answerkick:any,uniqueName:any): Promise<any> {
      console.log('answerabeatthat',analyticsid,userid,answerkick,uniqueName,answerkick.ai_video[0])

      let analysistobeupdated= await this.analyticsModel.findByIdAndUpdate({_id:analyticsid},  {
        $addToSet: {
            analyticsRecord: {
              $each: [userid  ],
           }, uniqueNameRecord: {
            $each: [ uniqueName ],
         }
        }
      } ,{new: true, upsert: true }).exec();
      console.log('analysistobeupdated',analysistobeupdated)
const indexofanalyticsRecord=analysistobeupdated?.analyticsRecord?.findIndex(
    (anlysis) => anlysis === userid
  )

  console.log('indexofanalyticsRecord',indexofanalyticsRecord)
  analysistobeupdated.ai_video[indexofanalyticsRecord]=answerkick.ai_video[0]
//   let updatedaivideo=analysistobeupdated.ai_video
//   console.log('analysistobeupdated.ai_video1',updatedaivideo)
// updatedaivideo[indexofanalyticsRecord]=answerkick.ai_video[0]
  console.log('analysistobeupdated.ai_video2',analysistobeupdated)
//   analysistobeupdated={...analysistobeupdated,}
analysistobeupdated.analysisArray[indexofanalyticsRecord]=answerkick.analysis
console.log('analysistobeupdated.analysisArray',analysistobeupdated)
const updatedanalytics=await this.analyticsModel.findByIdAndUpdate({_id:analyticsid},  {
    $set:analysistobeupdated
  } ,{new: true, upsert: true }).exec();
  console.log('updatedanalytics222222222222222222222222222222222222222222222222222222222222',updatedanalytics)
  const returnupdatedanalytics=await this.analyticsModel.update(
    {_id:analyticsid },
    { $pull: { chatbadges: { recievedUniqueName: uniqueName  } } },
    { multi: true }
  )
  console.log('updatedanalytics',returnupdatedanalytics)
  return returnupdatedanalytics
    }

    async postingacomment(req: any): Promise<any> {
        console.log('postingacomment',req,req.commentobj.userid)
        if(req.commentobj.badgepressed ==true){  
            console.log('badgepressed')     
           const badgealreadyassigned= await this.analyticsModel.find({_id: req.commentobj.analyticsid,chatbadges: {$elemMatch: {badgeName:req.commentobj.badgeName, assigneruserid:req.commentobj.userid}}})
if(badgealreadyassigned.length>0){

const updatebadge=await this.analyticsModel.findOneAndUpdate(
    { _id: req.commentobj.analyticsid, "chatbadges.badgeName": req.commentobj.badgeName, "chatbadges.assigneruserid":req.commentobj.userid},
    { $set: { "chatbadges.$.badgeName" : req.commentobj.badgeName, "chatbadges.$.assigneruserid" : req.commentobj.userid,"chatbadges.$.recievedUniqueName" : req.commentobj.recievedUniqueName} }
 )
    console.log('badgealreadyassignedd',updatebadge)

}
else{
    console.log('newbadgeassigned')
            const newcommentadded= await this.analyticsModel.findOneAndUpdate({_id:req.commentobj.analyticsid},  {
                $push: {
                    chatbadges: {
                      $each: [{assigneruserid:req.commentobj.userid,badgeName:req.commentobj.badgeName,recievedUniqueName:req.commentobj.recievedUniqueName} ],
                      
                   }
                }
              } ,{new: true, upsert: true }).exec();
            }
        }
        console.log('outsidebadgepressed block')
        let newcommentadded= await this.analyticsModel.findOneAndUpdate({_id:req.commentobj.analyticsid},  {
            $push: {
                chatcomments: {
                  $each: [{userid:req.commentobj.userid,textcomment:req.commentobj.textcomment} ],
                  
               }
            }
          } ,{new: true, upsert: true }).exec();
          console.log('newcommentadded',newcommentadded)
           let uniqueNameBadges=[]
        console.log('newcommentadded2',newcommentadded)
        for(let items of newcommentadded?.uniqueNameRecord){
            console.log('helllllo',items)
            let singleUserBadges=[]
//             singleUserBadges.push(gettingTheAnalysis?.chatbadges?.map(nested=>{
// if(items==nested.recievedUniqueName){
//     console.log('heeeeeeelo',items,nested.recievedUniqueName)
//     nested.recievedUniqueName
// }
//             }))
newcommentadded?.chatbadges?.map(nested=>{
    if(items==nested?.recievedUniqueName){
            console.log('heeeeeeelo',items,nested.recievedUniqueName)
            singleUserBadges.push({userBadges:nested.badgeName,assigneruserid:nested.assigneruserid,recievedUniqueName:nested.recievedUniqueName})

        }
    console.log('heeeeeeelo',items,nested.recievedUniqueName)
}
    )
console.log('singleUserBadges',singleUserBadges)
uniqueNameBadges.push(singleUserBadges)
        }

console.log('uniqueNameBadges',uniqueNameBadges)
newcommentadded.chatbadges=uniqueNameBadges
console.log('newcommentaddedreturn',newcommentadded)
          return newcommentadded
    }
}

