import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePetInput } from './create-pet.input';
import { Pet } from './pets.entity';
import { PetsService } from './pets.service';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(private petService : PetsService){}
    
    @Query(returns => [Pet])
    getAll(): Promise<Pet[]>{
        return this.petService.findAll()
    }
    
    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet>{
        return this.petService.createPet(createPetInput)
    }

    @Query(returns => Pet)
    getPet(@Args('id',{type : () => Int}) id:number): Promise<Pet>{
        return this.petService.findOnePet(id)
    }
}
