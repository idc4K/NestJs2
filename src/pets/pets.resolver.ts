import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { CreatePetInput } from './create-pet.input';
import { Pet } from './pets.entity';
import { PetsService } from './pets.service';
import { UpdatePetInput } from './update-pet.input';

@Resolver((of) => Pet)
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

    @ResolveField(returns => Owner)
    owner(@Parent() pet:Pet): Promise<Owner>{
        return this.petService.getOwner(pet.ownderId)
    }

    @Mutation(() => Pet)
    updatePet(@Args('updatePetInput') updatePetInput: UpdatePetInput) {
      return this.petService.updatePet(updatePetInput.id, updatePetInput);
    }

    @Mutation(() => Pet)
    async removePet(@Args('id', { type: () => Int }) id: number) {
      await this.petService.removePet(id);
      return Pet
    }
}
