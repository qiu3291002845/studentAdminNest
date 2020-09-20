import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha'
@Injectable()
export class LoginService {
  async captcha() {
    var captcha = svgCaptcha.create(
      {
        size: 4,
        fontSize: 50,
        width: 120,
        height: 45,
        background: "#cc9966"
      }
    );
    return captcha;
  }
}
