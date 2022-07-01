import { IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  name: string;
}

export class ModifyAuthorDto {
  @IsNotEmpty()
  name: string;
}
