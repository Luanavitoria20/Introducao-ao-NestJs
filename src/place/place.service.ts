import { Injectable, BadRequestException } from '@nestjs/common';
import { Place } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ImageObject } from './types/image-object';
import { CloudinaryService } from './cloudinary.service';


@Injectable()
export class PlaceService {
    constructor(
        private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
    ) { }

    async findAll(){
        return this.prisma.place.findMany() // -> []
    }

    async findPaginated(page: number, limit: number){
        
      const [places, total] = await this.prisma.$transaction([
        this.prisma.place.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {created_at: 'desc'}
        }),
        this.prisma.place.count()
      ])

      return {
        data: places,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total/limit)
        }
      }
    }

    async create(data: { name: string, type: any, phone: string, latitude: number, longitude: number, images: ImageObject[] }) {
    return this.prisma.place.create({ data });
  }

  async update(id: string, data: Partial<Place>, newImages?: Buffer[]): Promise<Place> {
    const place = await this.prisma.place.findUnique({ where: { id } });
    if (!place) throw new BadRequestException('Local não encontrado');

    let images = place.images as ImageObject[];
    
    // Se forem enviadas novas imagens
    if (newImages && newImages.length > 0) {
      // Deletar imagens antigas
      await Promise.all(images.map(img => this.cloudinaryService.deleteImage(img.public_id)));
      // Upload das novas imagens
      images = await Promise.all(newImages.map(file => this.cloudinaryService.uploadImage(file)));
    }

    return this.prisma.place.update({
      where: { id },
      data: {
        ...data,
        ...(newImages ? { images: JSON.parse(JSON.stringify(images)) } : {}),
      },
    });
  }

   async delete(id: string): Promise<void> {
    const place = await this.prisma.place.findUnique({ where: { id } });
    if (!place) throw new BadRequestException('Local não encontrado');
    const images = place.images as ImageObject[];
    await Promise.all(images.map(img => this.cloudinaryService.deleteImage(img.public_id)));
    await this.prisma.place.delete({ where: { id } });
  }

}
