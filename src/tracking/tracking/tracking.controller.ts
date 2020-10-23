import { Controller, Get, Query, Res, Session, HttpStatus } from '@nestjs/common';
import { Roles } from 'nest-shopify';
import { ParcelLabTrackingService } from './tracking.service';

@Controller('parcel-lab/tracking')
export class TrackingController {
    constructor(protected readonly tracking: ParcelLabTrackingService) {}

    @Get('list')
    @Roles('shopify-staff-member')
    /**
     * Get the settings
     */
    get(
        @Res() res,
        @Session() session,
        @Query('search') search?: string,
        @Query('page') page?: number,
        @Query('size') size?: number,
    ) {
      console.debug('GET parcel-lab/settings', session.currentShop, search, page, size);
      this.tracking.list(session.currentShop, search, page, size)
      .then((list) => {
        return res.jsonp(list);
      })
      .catch((error: Error | any) => {
        return res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: `Failure on list parcel-lab trackings for shop domain ${session.currentShop} ${error.message}`,
        });
      });
    }
}
