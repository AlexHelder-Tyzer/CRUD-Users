import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';
import { User } from './entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro na criação do usuário.' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const novoUsuario = await this.usersService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Usuário criado com sucesso',
        user: novoUsuario,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao criar usuário' + error.message);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de usuários.' })
  async findAll() {
    try {
      const usuarios = await this.usersService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuários recuperados com sucesso',
        users: usuarios,
      };
    } catch (error) {
      throw new BadRequestException(
        'Erro ao obter a lista de usuários: ' + error.message,
      );
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async findOne(@Param('id') id: number) {
    try {
      const usuario = await this.usersService.findOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuário recuperado com sucesso',
        user: usuario,
      };
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado: ' + error.message);
    }
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro na atualização do usuário.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const usuarioActualizado = await this.usersService.update(
        id,
        updateUserDto,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuário atualizado com sucesso',
        data: usuarioActualizado,
      };
    } catch (error) {
      throw new BadRequestException(
        'Erro ao atualizar o usuário' + error.message,
      );
    }
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro na atualização do usuário.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async partialUpdate(
    @Param('id') id: number,
    @Body() partialUpdateUserDto: PartialUpdateUserDto,
  ) {
    try {
      const usuarioActualizado = await this.usersService.partialUpdate(
        id,
        partialUpdateUserDto,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuário atualizado com sucesso',
        data: usuarioActualizado,
      };
    } catch (error) {
      throw new BadRequestException(
        'Erro ao atualizar o usuário' + error.message,
      );
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async remove(@Param('id') id: number) {
    try {
      await this.usersService.remove(id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Usuário removido com sucesso',
      };
    } catch (error) {
      throw new NotFoundException(
        `Erro ao remover o usuário com ID ${id}: ` + error.message,
      );
    }
  }
}
