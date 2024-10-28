import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error('Falha ao criar usuário: ' + error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error('Falha ao obter usuários: ' + error.message);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user)
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      return user;
    } catch (error) {
      throw new Error(`Erro ao obter o usuário com ID ${id}`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.userRepository.update(id, updateUserDto);
      const updatedUser = await this.findOne(id);
      return updatedUser;
    } catch (error) {
      throw new Error(`Erro ao atualizar o usuário con ID ${id}`);
    }
  }

  async partialUpdate(
    id: number,
    partialUpdateUserDto: PartialUpdateUserDto,
  ): Promise<User> {
    try {
      await this.userRepository.update(id, partialUpdateUserDto);
      const updatedUser = await this.findOne(id);
      return updatedUser;
    } catch (error) {
      throw new Error(`Erro ao atualizar o usuário con ID ${id}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0)
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    } catch (error) {
      throw new Error(`Erro ao deletar ol usuário con ID ${id}`);
    }
  }
}
