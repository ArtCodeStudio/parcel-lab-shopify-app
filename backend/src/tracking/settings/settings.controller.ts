import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  Session,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { Roles } from 'nest-shopify';
import { SettingsService } from './settings.service';
import { ParcelLabSettings } from '../interfaces/settings';

@Controller('parcel-lab/settings')
export class SettingsController {
  constructor(protected readonly settings: SettingsService) {}

  @Get()
  @Roles('shopify-staff-member')
  /**
   * Get the settings
   */
  get(@Res() res, @Session() session) {
    console.debug('GET parcel-lab/settings', session.currentShop);
    return this.settings
      .findByShopDomain(session.currentShop)
      .then((settings) => {
        return res.json(settings);
      })
      .catch((error: Error) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: `Failure on get parcel-lab settings for shop domain ${session.currentShop} ${error.message}`,
        });
      });
  }

  @Post()
  @Roles('shopify-staff-member')
  /**
   * Set the settings
   */
  set(
    @Res() res,
    @Session() session,
    @Req() req,
    @Body('settings') settings: ParcelLabSettings,
  ) {
    console.debug('POST parcel-lab/settings', session.currentShop, settings);
    // Convert string to boolean
    return this.settings
      .createOrUpdate({
        ...settings,
        shop_domain: session.currentShop,
      })
      .then((settings) => {
        return res.json(settings);
      })
      .catch((error: any /* TODO */) => {
        console.error(error);
        const statusCode: number =
          error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({
          message: `Failure on get parcel-lab settings for shop domain ${session.currentShop}`,
        });
      });
  }
}
