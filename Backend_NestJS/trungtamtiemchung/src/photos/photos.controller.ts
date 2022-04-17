import { Controller, Post, UploadedFiles, UseInterceptors, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './config';
import { AppService } from 'src/app.service';

@Controller('photos')
export class PhotosController {
    constructor(
        private readonly appService: AppService,
      ) { }

    @Post()
    @UseInterceptors(FilesInterceptor('file', null, multerOptions))
    async uploadFile(@Body() dataBody, @UploadedFiles() file){
        const data={
            avata: file[0].filename,
            table: "nhanvien",
            token: dataBody.token

        }
        console.log(file)
    }
}
