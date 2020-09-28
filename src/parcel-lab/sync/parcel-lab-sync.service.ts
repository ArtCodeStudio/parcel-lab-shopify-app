import { Injectable } from '@nestjs/common';
import { ParcelLabApi } from '../api/parcel-lab-api';
import { EventService, Interfaces } from 'nest-shopify';

@Injectable()
export class ParcelLabSyncService {
    constructor(protected readonly shopifyEvents: EventService) {
        this.addEventListeners();
    }

    addEventListeners() {
        // draft orders
        this.shopifyEvents.on(`webhook:draft_orders/create`, this.onDraftOrderCreate.bind(this));
        this.shopifyEvents.on(`webhook:draft_orders/update`, this.onDraftOrderDelete.bind(this));
        this.shopifyEvents.on(`webhook:draft_orders/update`, this.onDraftOrderUpdate.bind(this));

        // orders
        this.shopifyEvents.on(`webhook:orders/cancelled`, this.onOrderCancelled.bind(this));
        this.shopifyEvents.on(`webhook:orders/create`, this.onOrderCreate.bind(this));
        this.shopifyEvents.on(`webhook:orders/fulfilled`, this.onOrderFulfilled.bind(this));      
        this.shopifyEvents.on(`webhook:orders/paid`, this.onOrderPaid.bind(this));      
        this.shopifyEvents.on(`webhook:orders/partially_fulfilled`, this.onOrderPartiallyFulfilled.bind(this));      
        this.shopifyEvents.on(`webhook:orders/updated`, this.onOrderUpdated.bind(this));      
        this.shopifyEvents.on(`webhook:orders/delete`, this.onOrderDelete.bind(this));      
        this.shopifyEvents.on(`webhook:order_transactions/create`, this.onOrderCreate.bind(this));

        // fulfillments
        this.shopifyEvents.on(`webhook:fulfillments/create`, this.onFulfillmentsCreate.bind(this));
        this.shopifyEvents.on(`webhook:fulfillments/update`, this.onFulfillmentsUpdate.bind(this));
    }

    onDraftOrderCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderCreate) {
        console.debug('onDraftOrderCreate', myshopifyDomain, data);
        const api = new ParcelLabApi(1, 'parcelLabAPItoken-30characters');
    }
    onDraftOrderDelete(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderDelete) {
        console.debug('onDraftOrderDelete', myshopifyDomain, data);
    }
    onDraftOrderUpdate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookDraftOrderCreate) {
        console.debug('onDraftOrderUpdate', myshopifyDomain, data);
    }

    onOrderCancelled(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersCancelled) {
        console.debug('onOrderCancelled', myshopifyDomain, data);
    }
    onOrderCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersCreate) {
        console.debug('onOrderCreate', myshopifyDomain, data);
    }
    onOrderFulfilled(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersFulfilled) {
        console.debug('onOrderFulfilled', myshopifyDomain, data);
    }
    onOrderPaid(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersPaid) {
        console.debug('onOrderPaid', myshopifyDomain, data);
    }
    onOrderPartiallyFulfilled(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersPartiallyFulfilled) {
        console.debug('onOrderPartiallyFulfilled', myshopifyDomain, data);
    }
    onOrderUpdated(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersUpdated) {
        console.debug('onOrderUpdated', myshopifyDomain, data);
    }
    onOrderDelete(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookOrdersCreate) {
        console.debug('onOrderDelete', myshopifyDomain, data);
    }

    onFulfillmentsCreate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookFulfillmentCreate) {
        console.debug('onFulfillmentsCreate', myshopifyDomain, data);
    }
    onFulfillmentsUpdate(myshopifyDomain: string, data: Interfaces.WebhooksReponse.WebhookFulfillmentUpdate) {
        console.debug('onFulfillmentsUpdate', myshopifyDomain, data);
    }
}
