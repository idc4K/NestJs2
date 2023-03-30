import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/pets/pets.entity';
import { PetsService } from 'src/pets/pets.service';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {

  constructor( 
   
    @InjectRepository(Owner) private ownerRepository:Repository<Owner>){}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownerRepository.create(createOwnerInput)

    return this.ownerRepository.save(newOwner);
  }

  findAll() {
    return this.ownerRepository.find();
  }

  async findOneOwner(id: number) {
    const owner = await this.ownerRepository.findOne({where :{id}})

    if(!owner){
      throw new NotFoundException(`Owner ${id} not found`)
    }
    return owner
  }

  updateOwner(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `${id}`
  }

  remove(id: number) {
    this.ownerRepository.delete(id)
  }

  
}
