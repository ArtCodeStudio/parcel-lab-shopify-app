/**
 * Based on https://bitbucket.org/parcellab/sdk-node/src/master/params.json
 */

export const params = {
  "endpoint": "https://api.parcellab.com/",
  "requiredKeys": [
    "tracking_number",
    "courier"
  ],
  "allowedKeys": [
    "zip_code",
    "destination_country_iso3",
    "deliveryNo",
    "customerNo",
    "orderNo",
    "recipient",
    "recipient_notification",
    "street",
    "city",
    "email",
    "weight",
    "client",
    "market",
    "order_date",
    "phone",
    "articleNo",
    "articleName",
    "origin_country_iso3",
    "language_iso3",
    "firstOrder",
    "complete",
    "statuslink",
    "cashOnDelivery",
    "upgrade"
  ],
  "datachecks": {
    "email": ["email"],
    "number": ["cashOnDelivery"],
    "boolean": ["complete", "firstOrder", "upgrade"],
    "iso3": ["origin_country_iso3", "language_iso3"]
  },
  "couriers": {
    "dhl": "dhl-germany",
    "dpd": "dpd-de",
    "hermes": "hermes-de"
  }
}
