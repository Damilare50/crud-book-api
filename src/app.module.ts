import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Author } from './entities/author.entity';

@Module({
  imports: [
    BookModule,
    AuthorModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 55002,
      username: 'postgres',
      password: 'postgrespw',
      database: 'book_api',
      entities: [Book, Author],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
