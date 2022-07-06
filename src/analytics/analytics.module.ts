import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsSchema } from './analytics.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Analytics', schema: AnalyticsSchema }])],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
})
export class AnalyticsModule { }
