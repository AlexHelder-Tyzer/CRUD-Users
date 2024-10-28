import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Alex Huancara' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'alex.huancra@gmail.com' })
  @IsEmail()
  email: string;
}
