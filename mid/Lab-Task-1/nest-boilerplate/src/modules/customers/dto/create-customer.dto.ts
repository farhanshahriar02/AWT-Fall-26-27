import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email!: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsString()
  phone!: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString()
  address!: string;
}