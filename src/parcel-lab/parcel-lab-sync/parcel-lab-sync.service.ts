import { Injectable } from '@nestjs/common';
import { ParcelLabApiService } from '../parcel-lab-api/parcel-lab-api.service';
import { EventService } from 'nest-shopify';

@Injectable()
export class ParcelLabSyncService {
    constructor(protected readonly api: ParcelLabApiService, protected readonly shopifyEvents: EventService) {

    }
}
