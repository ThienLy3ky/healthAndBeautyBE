import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, Length, Matches } from "class-validator";

export class RegisterBodyDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  @Length(1, 50)
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @Length(8, 16)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[\(|\)|\\|\/|\_|\-|\+|\*|\.|\&|\!|\@|\#|\$|\%|\^|\&|\=]).*$/,
    {
      message:
        "For security reasons, please set a password containing uppercase letters, lowercase letters, numbers and ampersands or special characters, length 8-16 characters.",
    },
  )
  @Matches(/(?=.*[A-Z]).*$/, {
    message: "password must has lower case letter",
  })
  @Matches(/(?=.*[0-9]).*$/, { message: "password must has number" })
  @Matches(/(?=.*[a-z]).*$/, { message: "password must has capital letter" })
  @Matches(/(?=.*[\(|\)|\\|\/|\_|\-|\+|\*|\.|\&|\!|\@|\#|\$|\%|\^|\&|\=]).*$/, {
    message: "password must has special character (()/_-+*.&!@#$%^&=)",
  })
  password: string;

  @ApiProperty()
  role_id: string;
}
