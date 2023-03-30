import {  forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './create-pet.input';
import { Pet } from './pets.entity';
import { UpdatePetInput } from './update-pet.input';


@Injectable()
export class PetsService {
    constructor(
        
        @InjectRepository(Pet) private petsRepository:Repository<Pet>, private ownersService:OwnersService){}
    
    createPet(createPetInput : CreatePetInput): Promise<Pet>{
        const newPet = this.petsRepository.create(createPetInput) // const newPet = new Pet(); newPet.name=""

        return this.petsRepository.save(newPet)
    }

    async findAll():Promise<Pet[]>{
        // const pet = new Pet();
        // pet.id=1;
        // pet.name="idc"

        // return [pet]
        return this.petsRepository.find() // SELECT * pet
    }

   async findOnePet(id:number):Promise<Pet>{
     const pet = await this.petsRepository.findOne({ where :{id}})
     if(!pet){
        throw new NotFoundException(`pet ${id} not found`)
     }
     return pet
   }

   getOwner(ownderId:number):Promise<Owner>{
        return this.ownersService.findOneOwner(ownderId)
   }

   async updatePet(id:number,updatePetInput:UpdatePetInput): Promise<Pet>{
     const pet = await this.petsRepository.preload({id:id, ...updatePetInput});

     if(!pet){
        throw new NotFoundException(`id ${id} not found`)
     }
     return this.petsRepository.save(pet)
   }

   async removePet(id:number):Promise<Pet>{
     const pet = await this.petsRepository.findOne({where :{id}});

    
     await this.petsRepository.remove(pet);
     return pet
   }
}
