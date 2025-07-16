import {
    Controller,
    Get,
    Post,
    Put,
    Param,
    Delete,
    Body,
    UploadedFiles,
    UseInterceptors,
    BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PlaceService } from './place.service';
import { CloudinaryService } from './cloudinary.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { File as MulterFile } from 'multer';
import { ApiBody, ApiConsumes, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePlaceDto } from './dto/update-place.dto';


@ApiTags('places')
@Controller('places')
export class PlaceController {
    constructor(
        private placeService: PlaceService,
        private cloudinaryService: CloudinaryService,
    ) { }

    @Get()
    findAll() {
        return this.placeService.findAll();
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 3 }]))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Cadastrar novo local com imagens' })
    @ApiBody({
        description: 'Formulário com os dados do local + imagens',
        schema: {
            type: 'object',
            required: ['name', 'type', 'phone', 'latitude', 'longitude', 'images'],
            properties: {
                name: { type: 'string', example: 'Praça Central' },
                type: { type: 'string', enum: ['RESTAURANTE', 'BAR', 'HOTEL'] },
                phone: { type: 'string', example: '(88) 99999-9999' },
                latitude: { type: 'number', example: -3.7327 },
                longitude: { type: 'number', example: -38.5267 },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                    description: 'Máximo de 3 imagens',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Place criado com sucesso' })
    async createPlace(
        @Body() data: CreatePlaceDto,
        @UploadedFiles() files: { images?: MulterFile[] },
    ) {
        if (!files.images || files.images.length === 0) {
            throw new BadRequestException('Pelo menos uma imagem deve ser enviada.');
        }

        const imageUrls = await Promise.all(
            files.images.map((file) => this.cloudinaryService.uploadImage(file.buffer)),
        );

        return this.placeService.create({
            ...data,
            images: imageUrls, // Aqui você injeta as URLs para salvar
        });
    }

    @Put(':id')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 3 }]))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Atualizar local com ou sem novas imagens' })
    @ApiBody({
        description: 'Formulário com dados opcionais do local a serem atualizados.Se enviar imagens, elas substituirão as anteriores.',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Novo nome da Praça' },
                type: { type: 'string', enum: ['RESTAURANTE', 'BAR', 'HOTEL'], example: 'RESTAURANTE' },
                phone: { type: 'string', example: '(85) 91234-5678' },
                latitude: { type: 'number', example: -3.7325 },
                longitude: { type: 'number', example: -38.5259 },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                    description: 'Novas imagens que substituirão as anteriores (máximo de 3)',
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Place atualizado com sucesso' })
    async updatePlace(
        @Param('id') id: string,
        @Body() data: UpdatePlaceDto,
        @UploadedFiles() files: { images?: MulterFile[] },
    ) {
        const newImages = files.images?.map(file => file.buffer);
        return this.placeService.update(id, data, newImages);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar local e imagens no Cloudinary' })
     @ApiResponse({ status: 200, description: 'Place deletado com sucesso' })
    async deletePlace(@Param('id') id: string) {
        return this.placeService.delete(id);
    }
}