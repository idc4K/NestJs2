import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePetInput } from './create-pet.input';
import { Pet } from './pets.entity';
import { PetsService } from './pets.service';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(private petService : PetsService){}
    
    @Query(returns => [Pet])
    pets(): Promise<Pet[]>{
        return this.petService.findAll()
    }
    
    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet>{
        return this.petService.createPet(createPetInput)
    }
}
