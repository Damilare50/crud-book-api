import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { BookService } from './book.service';
import { CreateBookDto, ModifyBookDto } from './dto/book.dto';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getBooks(): Promise<Book[]> {
    return this.bookService.getBooks();
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(createBookDto);
  }

  @Get('/:id')
  getBookById(@Param('id') id: number): Promise<Book> {
    return this.bookService.getBookById(id);
  }

  @Patch('/:id')
  modifyBook(
    @Param('id') id: number,
    @Body() modifyBook: ModifyBookDto,
  ): Promise<Book> {
    return this.bookService.modifyBook(id, modifyBook);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: number): Promise<void> {
    return this.bookService.deleteBook(id);
  }
}
