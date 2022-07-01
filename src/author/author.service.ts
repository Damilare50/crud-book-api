import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Author } from '../entities/author.entity';
import { CreateAuthorDto, ModifyAuthorDto } from './dto/author.dto';

@Injectable()
export class AuthorService {
  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { name } = createAuthorDto;

    if (!name) {
      throw new BadRequestException();
    }

    const new_author = Author.create({ name });
    await new_author.save();

    return new_author;
  }

  async getAuthors(): Promise<Author[]> {
    const authors = await Author.find({
      relations: { books: true },
      order: { id: 'ASC' },
    });

    return authors;
  }

  async getAuthorById(id: number): Promise<Author> {
    const author = await Author.findOne({
      where: { id: id },
      relations: { books: true },
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} cannot be found!`);
    }

    return author;
  }

  async deleteAuthor(id: number): Promise<void> {
    const author = await this.getAuthorById(id);

    await author.remove();
  }

  async modifyAuthor(
    id: number,
    modifyAuthorDto: ModifyAuthorDto,
  ): Promise<Author> {
    const { name } = modifyAuthorDto;

    if (!name) {
      throw new BadRequestException(`name is undefined`);
    }

    const author = await this.getAuthorById(id);

    author.name = name;
    await author.save();

    return author;
  }
}
