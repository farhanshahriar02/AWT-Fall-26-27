import { IsNotEmpty, IsString, IsNumber, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name!: string;

  @IsNotEmpty({ message: 'Category is required' })
  @IsString()
  category!: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber()
  @Min(0)
  price!: number;

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsInt()
  @Min(0)
  quantity!: number;
}