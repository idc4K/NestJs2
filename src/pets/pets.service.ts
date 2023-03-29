import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './create-pet.input';
import { Pet } from './pets.entity';


@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository:Repository<Pet>, private ownersService:OwnersService){}
    
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

   findOnePet(id:number):Promise<Pet>{
     return this.petsRepository.findOneOrFail({ where :{id}})
   }

   getOwner(ownderId:number):Promise<Owner>{
        return this.ownersService.findOneOwner(ownderId)
   }
}
