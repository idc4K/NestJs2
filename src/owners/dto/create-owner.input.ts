import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOwnerInput {
  @IsAlpha()
  @IsNotEmpty()
  @Field()
  name:string;

  @IsAlpha()
  @IsNotEmpty()
  @Field()
  first_name:string
}
