import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { CreateBookDto, ModifyBookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  async getBooks(): Promise<Book[]> {
    const books = await Book.find({
      relations: { author: true },
      order: { id: 'ASC' },
    });

    return books;
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, release_year, genre, author } = createBookDto;

    if (!title || !release_year || !genre || !author) {
      throw new BadRequestException();
    }

    const new_book = Book.create({ title, genre, release_year, author });
    await new_book.save();

    return new_book;
  }

  async getBookById(id: number): Promise<Book> {
    const book = await Book.findOne({
      where: { id: id },
      relations: { author: true },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} cannot be found!`);
    }

    return book;
  }

  async modifyBook(id: number, modifyBook: ModifyBookDto): Promise<Book> {
    const book = await this.getBookById(id);

    const { title, release_year, author, genre } = modifyBook;

    if (title) {
      book.title = title;
    }

    if (genre) {
      book.genre = genre;
    }

    if (author) {
      book.author = author;
    }

    if (release_year) {
      book.release_year = release_year;
    }

    await book.save();

    return book;
  }

  async deleteBook(id: number): Promise<void> {
    const book = await this.getBookById(id);

    await book.remove();
  }
}
