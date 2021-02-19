import {
  Controller,
  Get,
  Post,
  Delete,
  Res,
  Session,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { Roles, DebugService } from 'nest-shopify';
import { SettingsService } from '../settings/settings.service';
import { ParcelLabSettings } from '../interfaces/settings';

@Controller('parcel-lab/settings')
export class SettingsController {
  protected log = new DebugService('parcelLab:SettingsController');
  constructor(protected readonly settings: SettingsService) {}

  @Get()
  @Roles('shopify-staff-member')
  /**
   * Get the settings
   */
  get(@Res() res, @Session() session) {
    this.log.debug('GET parcel-lab/settings', session.currentShop);
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
    @Body('settings') settings: ParcelLabSettings,
  ) {
    this.log.debug('POST parcel-lab/settings', session.currentShop, settings);
    return this.settings
      .createOrUpdate({ ...settings, shop_domain: session.currentShop })
      .then((settings) => res.json(settings))
      .catch((error: any /* TODO */) => {
        this.log.error(error);
        const statusCode: number =
          error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({
          message: `Failure on set parcel-lab settings for shop domain ${session.currentShop}`,
        });
      });
  }

  @Delete()
  @Roles('shopify-staff-member')
  /**
   * Set the settings
   */
  delete(
    @Res() res,
    @Session() session,
    @Body('settings') settings: ParcelLabSettings,
  ) {
    this.log.debug('Delete parcel-lab/settings', session.currentShop, settings);
    return this.settings
      .delete(session.currentShop)
      .then((deleteResult) => res.json(deleteResult))
      .catch((error: Error) => {
        this.log.error(error);
        const statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({
          message: `Failure on delete parcel-lab settings for shop domain ${session.currentShop}`,
        });
      });
  }
}
