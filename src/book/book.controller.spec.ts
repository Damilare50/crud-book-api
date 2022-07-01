import { Test, TestingModule } from '@nestjs/testing';
import { Author } from '../entities/author.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';

const _book = {
  id: 1,
  title: 'someText',
  genre: 'someGenre',
  release_year: 2022,
  author: {
    id: 1,
    name: 'someName',
  },
};

const author = new Author();

const create_book = {
  title: 'someTitle',
  genre: 'someGenre',
  release_year: 2000,
  author,
};

const a_books = [
  {
    id: 1,
    title: 'someText',
    genre: 'someGenre',
    release_year: 2022,
    author: {
      id: 1,
      name: 'someName',
    },
  },
  {
    id: 0,
    title: 'someOtherTitle',
    genre: 'someOtherGenre',
    release_year: 2036,
    author: {
      id: 2,
      name: 'someOtherName',
    },
  },
];

describe('BookController', () => {
  let controller: BookController;

  const mockBookService = {
    createBook: jest.fn(() => {
      return create_book;
    }),
    getBooks: jest.fn(() => {
      return a_books;
    }),
    getBookById: jest.fn(() => {
      return _book;
    }),
    modifyBook: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
        title: 'someModifiedTitle',
        genre: 'someFancyGenre',
        author: author,
      };
    }),
    deleteBook: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    })
      .overrideProvider(BookService)
      .useValue(mockBookService)
      .compile();

    controller = module.get<BookController>(BookController);
  });

  describe('getBookById', () => {
    it('should return a book with that id', async () => {
      const book = await controller.getBookById(1);

      expect(book.id).toEqual(1);
      expect(book.title).toBe('someText');
      expect(book.genre).toBe('someGenre');
      expect(book.release_year).toBe(2022);
      expect(book.author).toEqual({ id: 1, name: 'someName' });
    });
  });

  describe('createBook', () => {
    it('should create a new book and return it', async () => {
      const book = await controller.createBook({ ...create_book });

      expect(book.author).toEqual(author);
      expect(book.title).toBe('someTitle');
      expect(book.genre).toBe('someGenre');
      expect(book.release_year).toBe(2000);
    });
  });

  describe('getBooks', () => {
    it('returns all books', async () => {
      const books = await controller.getBooks();

      expect(books.length).toEqual(2);
    });
  });

  describe('deleteBook', () => {
    it('deletes a book by id', async () => {
      const book = await controller.deleteBook(3);

      expect(book).toBeUndefined();
    });
  });

  describe('modifyBook', () => {
    it('modifies the properties of a book', async () => {
      const book = await controller.modifyBook(2, {
        title: 'someModifiedTitle',
        genre: 'Fantasy',
      });

      expect(book.title).toBe('someModifiedTitle');
      expect(book.genre).toBe('someFancyGenre');
      expect(book.author).toEqual(author);
    });
  });
});
