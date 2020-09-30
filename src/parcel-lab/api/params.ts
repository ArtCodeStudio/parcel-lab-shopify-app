/**
 * Based on https://bitbucket.org/parcellab/sdk-node/src/master/params.json
 */

export const params = {
  endpoint: "https://api.parcellab.com/",
  mockEndpoint: "https://mock-api.parcellab.com/",
  tracking: {
    requiredKeys: [
      "tracking_number",
      "courier"
    ],
  },
  order: {
    requiredKeys: [
      "orderNo",
    ],
  },
  allowedKeys: [
    "articles",
    "announced_delivery_dat",
    "branchDelivery",
    "cashOnDelivery",
    "city",
    "client",
    "customFields",
    "orderNo",
    "cancelled",
    "complete",
    "courie",
    "courierServiceLeve",
    "customerNo",
    "deliveryNo",
    "destination_country_iso3",
    "email",
    "language_iso3",
    "market",
    "order_date",
    "phone",
    "recipient",
    "recipient_notification",
    "return",
    "send_date",
    "statuslink",
    "street",
    "tracking_number",
    "upgrad",
    "warehouse",
    "weight",
    "xid",
    "zip_code",
  ],
  datachecks: {
    email: ["email"],
    number: ["cashOnDelivery"],
    boolean: ["complete", "upgrade", "branchDelivery", "return"],
    iso3: ["origin_country_iso3", "language_iso3"]
  },
  couriers: {
    dhl: "dhl-germany",
    dpd: "dpd-de",
    hermes: "hermes-de"
  }
}
