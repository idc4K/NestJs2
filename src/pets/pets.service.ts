import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './create-pet.input';
import { Pet } from './pets.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository:Repository<Pet>){}
    
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
}
