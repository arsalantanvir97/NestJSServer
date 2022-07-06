import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Req,
    Param,
    Res,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service'
import { Request,Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Post('/reportabuse')
    reportingaabuse(@Body('analyticsid') analyticsid: any): Promise<any> {
        return this.analyticsService.reportingaabuse(analyticsid);
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<any> {
        return this.analyticsService.findOne(id);
    }

    @Post()
    filteredAnalysis(
        @Body('user_id') user_id: any): Promise<any> {
        return this.analyticsService.filteredAnalysis(user_id);
    }
    @Post('/getbadges')
    getBadgesOfUsers(
        @Body('analysisid') analysisid: any): Promise<any> {
        return this.analyticsService.getBadgesOfUsers(analysisid);
    }
    @Post('/sendanalysis')
    @UseInterceptors(FileInterceptor('video'))

    sendAnalysis(
        @UploadedFile() video,
        @Body('user_id') user_id: any, @Body('userName') userName: any, @Body('userUniqueName') userUniqueName: any,@Body('gender') gender: any,@Body('height') height: any,@Body('kickingFoot') kickingFoot: any, @Body('videouri') videouri: any, @Body('kicktype') kicktype: any,@Body('useravatar') useravatar: any,@Body('diameter') diameter:any,@Body('ball_height') ball_height:any, @Body('token') token: any): Promise<any> {
            console.log('file',video)
            return this.analyticsService.sendAnalysis(user_id,userName,userUniqueName,gender,height,kickingFoot,videouri,kicktype,useravatar,diameter,ball_height,token,video);
    }
    @Post('/sendimage')
    @UseInterceptors(FileInterceptor('image'))

    sendImage(
        @UploadedFile() image,
        @Body('user_id') user_id: any,): Promise<any> {
     console.log('file',image)
            return this.analyticsService.sendImage(user_id,image);
    }
    @Post('/creation')
    creates(
        @Req() request: Request): Promise<any> {
        return this.analyticsService.creates(request.body);
    }
    @Post('/beatthatcreation')
    beatThatCreates(
        @Req() request: Request,@Body('beatthatid') beatthatid:any): Promise<any> {
        return this.analyticsService.beatThatCreates(request.body,beatthatid);
    }

    
    @Post('/createtoken')
    createtoken(

        @Body('token') token: any, @Body('body') body: any, @Body('title') title: any,@Res() response:Response): Promise<any> {
        return this.analyticsService.createtoken(token,body,title,response);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<any> {
        return this.analyticsService.delete(id);
    }

    @Put(':id')
    update(@Body('id') id, @Body('shared_to') shared_to: string[],@Body('connectioninfo') connectioninfo: string[]): Promise<any> {
        return this.analyticsService.update(id, shared_to,connectioninfo);
    }
    @Put('update/:id')
    updatename(@Param('id') id, @Body('fileName') fileName: string): Promise<any> {
        return this.analyticsService.updatename(id, fileName);
    }
    @Put('updatefolderid/:id')
    updatefolderid(@Param('id') id, @Body('folderId') folderId: string): Promise<any> {
        return this.analyticsService.updatefolderid(id, folderId);
    }
    @Post('/createbeatthat')
    createbeatthat(@Body('analyticsid') analyticsid: string,@Body('userid') userid: string): Promise<any> {
        return this.analyticsService.createbeatthat(analyticsid,userid);
    }
    @Post('/answerbeatthat')
    answerabeatthat(@Body('analyticsid') analyticsid: string,@Body('userid') userid: string,@Body('answerkick') answerkick:any,@Body('uniqueName') uniqueName:any): Promise<any> {
        return this.analyticsService.answerabeatthat(analyticsid,userid,answerkick,uniqueName);
    }
    @Post('/postacomment')
    // postingacomment(@Body('analyticsid') analyticsid: string,@Body('userid') userid: string,@Body('textcomment') textcomment:any): Promise<any> {
    //     return this.analyticsService.postingacomment(analyticsid,userid,textcomment);
    postingacomment(
        @Req() request: Request): Promise<any> {
        return this.analyticsService.postingacomment(request.body);
    }
  
   
    
}


