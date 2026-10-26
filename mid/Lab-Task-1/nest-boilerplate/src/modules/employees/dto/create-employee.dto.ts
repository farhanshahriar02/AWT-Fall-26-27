import { IsNotEmpty, IsString, IsEmail, IsInt, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  phone!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password!: string;

  @IsNotEmpty({ message: 'Age is required' })
  @IsInt()
  @Min(18, { message: 'Employee must be at least 18 years old' })
  age!: number;

  @IsNotEmpty({ message: 'Years of working is required' })
  @IsInt()
  @Min(0)
  yearsOfWorking!: number;
}