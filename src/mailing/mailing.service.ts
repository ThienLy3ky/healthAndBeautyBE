import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { google } from "googleapis";
import { Options } from "nodemailer/lib/smtp-transport";

interface DataSendEmail {
  code: string;
  to: string;
  user: any;
}
@Injectable()
export class MailingService {
  constructor(
    private configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}
  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get("googleClientId"),
      this.configService.get("googleClientSecret"),
      "https://developers.google.com/oauthplayground",
    );

    oauth2Client.setCredentials({
      refresh_token: this.configService.get("refresh_token_email"),
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token");
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: this.configService.get("email"),
        clientId: this.configService.get("googleClientId"),
        clientSecret: this.configService.get("googleClientSecret"),
        accessToken,
      },
    };
    this.mailerService.addTransporter("gmail", config);
  }

  public async sendMail({ to, code, user }: DataSendEmail) {
    await this.setTransport();
    this.mailerService
      .sendMail({
        transporterName: "gmail",
        to: to, // list of receivers
        from: "noreply@nestjs.com", // sender address
        subject: "Verficiaction Code", // Subject line
        template: "action",
        context: {
          // Data to be sent to template engine..
          code: code,
        },
      })
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log("Err send:", err);
      });
  }
}
