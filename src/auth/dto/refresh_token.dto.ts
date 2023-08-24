import { IsNotEmpty } from 'class-validator';
import { LoginResponseDTO } from './login.dto';

export class RefreshTokenBodyDTO {
  @IsNotEmpty()
  refresh_token: string;
}

export class RefreshTokenResponseDTO extends LoginResponseDTO {}
