import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { UsersdataController } from './usersdata.controller';
import { UsersdataService } from './usersdata.service';
import { UsersdataSchema } from './usersdata.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Usersdata', schema: UsersdataSchema }])],
    controllers: [UsersdataController],
    providers: [UsersdataService],
})
export class UsersdataModule { }
