import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PartialUpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ example: 'tyzer.huancara@gmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}
