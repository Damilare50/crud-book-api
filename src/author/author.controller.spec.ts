import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';

const authors = [
  {
    id: 3,
    name: 'George R. R. Martin',
    books: [
      {
        id: 5,
        title: 'A Dance of Dragons',
        release_year: 2008,
        genre: 'Fantasy',
      },
    ],
  },
  {
    id: 2,
    name: 'someAuthor',
    books: [
      {
        id: 8,
        title: 'someBook',
        release_year: 2008,
        genre: 'someGenre',
      },
    ],
  },
];

describe('AuthorController', () => {
  let controller: AuthorController;

  const mockAuthorService = {
    getAuthors: jest.fn(() => {
      return authors;
    }),
    createAuthor: jest.fn(() => {
      return {
        id: 23,
        name: 'someAuthor',
      };
    }),
    getAuthorById: jest.fn((id) => {
      return {
        id: id,
        name: 'George R. R. Martin',
        books: [
          {
            id: 5,
            title: 'A Dance of Dragons',
            release_year: 2008,
            genre: 'Fantasy',
          },
        ],
      };
    }),
    deleteAuthor: jest.fn(),
    modifyAuthor: jest.fn((id, dto) => {
      return {
        ...dto,
        id: id,
        books: [
          {
            id: 5,
            title: 'A Dance of Dragons',
            release_year: 2008,
            genre: 'Fantasy',
          },
        ],
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [AuthorService],
    })
      .overrideProvider(AuthorService)
      .useValue(mockAuthorService)
      .compile();

    controller = module.get<AuthorController>(AuthorController);
  });

  describe('getAuthorById', () => {
    it('should return an author with that id', async () => {
      const author = await controller.getAuthorById(1);

      expect(author.id).toBe(1);
      expect(author.name).toBe('George R. R. Martin');
      expect(author.books.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('createAuthor', () => {
    it('should create a new author and return it', async () => {
      const author = await controller.createAuthor({ name: 'someAuthor' });

      expect(author.id).toBeTruthy();
      expect(author.name).toBe('someAuthor');
    });
  });

  describe('getAuthors', () => {
    it('returns all authors', async () => {
      const authors = await controller.getAuthors();

      expect(authors.length).toEqual(2);
    });
  });

  describe('deleteAuthor', () => {
    it('deletes an author by id', async () => {
      const author = await controller.deleteAuthor(3);

      expect(author).toBeUndefined();
    });
  });

  describe('modifyAuthor', () => {
    it('modifies the name of an author', async () => {
      const author = await controller.modifyAuthor(1, {
        name: 'someModifiedName',
      });

      expect(author.id).toBe(1);
      expect(author.name).toBe('someModifiedName');
      expect(author.books.length).toEqual(1);
    });
  });
});
