import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { AuthModule } from './auth/auth.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { UsersdataModule } from './usersdata/usersdata.module';

import { AnalyticsController } from './analytics/analytics.controller';
import { AnalyticsService } from './analytics/analytics.service';
import { UsersdataController } from './usersdata/usersdata.controller';
import { UsersdataService } from './usersdata/usersdata.service';



@Module({
  imports: [
    ProductModule,
    NodemailerModule,
    
    AuthModule,
    AnalyticsModule,
    UsersdataModule,
    // MongooseModule.forRoot('mongodb+srv://arsalan123:arsalan123@contactkeepermern.xe8pl.mongodb.net/playercloudanalysis?retryWrites=true&w=majority')],
    MongooseModule.forRoot('mongodb+srv://dbUser:12345@cluster0.bgso9.mongodb.net/Playercloud?retryWrites=true&w=majority')],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule { }
