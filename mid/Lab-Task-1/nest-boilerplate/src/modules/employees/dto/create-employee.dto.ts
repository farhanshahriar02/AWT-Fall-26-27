import { IsString, IsEmail, IsInt, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  password!: string;

  @IsInt()
  @Min(18)
  age!: number;

  @IsInt()
  @Min(0)
  yearsOfWorking!: number;
}