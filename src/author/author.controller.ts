import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Author } from '../entities/author.entity';
import { AuthorService } from './author.service';
import { CreateAuthorDto, ModifyAuthorDto } from './dto/author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  getAuthors(): Promise<Author[]> {
    return this.authorService.getAuthors();
  }

  @Post()
  createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get('/:id')
  getAuthorById(@Param('id') id: number): Promise<Author> {
    return this.authorService.getAuthorById(id);
  }

  @Delete('/:id')
  deleteAuthor(@Param('id') id: number): Promise<void> {
    return this.authorService.deleteAuthor(id);
  }

  @Patch('/:id')
  modifyAuthor(
    @Param('id') id: number,
    @Body() modifyAuthorDto: ModifyAuthorDto,
  ): Promise<Author> {
    return this.authorService.modifyAuthor(id, modifyAuthorDto);
  }
}
