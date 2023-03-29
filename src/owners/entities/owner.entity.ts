import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from 'src/pets/pets.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  first_name:string;

  @OneToMany(() => Pet, pet=>pet.owner)
  @Field(type => [Pet], {nullable:true})
  pets:Pet[]
}
