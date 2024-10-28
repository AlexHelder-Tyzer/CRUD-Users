import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'juan.perez@gmail.com' })
  @IsEmail()
  email: string;
}
