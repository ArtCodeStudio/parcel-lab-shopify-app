/**
 * Based on https://bitbucket.org/parcellab/sdk-node/src/master/params.json
 */

export const params = {
  endpoint: "https://api.parcellab.com/",
  mockEndpoint: "https://mock-api.parcellab.com/",
  tracking: {
    requiredKeys: [
      "tracking_number",
      "courier",
      "zip_code",
      "destination_country_iso3"
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
  /**
   * For a list of supported carries see https://how.parcellab.works/docs/carrier-integration/parcel-carriers
   */
  couriers: {
    //////////
    // Okay //
    //////////

    // Other ?
    "wn-direct": "wn-direct",

    // Global
    "dhl-express": "dhl-express",
    "ups": "ups",
    "fedex": "fedex",
    "tnt": "tnt",

    // USA
    "ontrac": "ontrac",

    // Germany
    "dhl-germany": "dhl-germany",
    "hermes-germany": "hermes-germany",
    "gls-germany": "gls-germany",
    "dpd-germany": "dpd-germany",
    "liefery": "liefery",

    // Austria
    "austrian-post": "austrian-post",
    "hermes-austria": "hermes-austria",
    "dpd-austria": "dpd-austria",

    // Switzerland
    "swiss-post": "swiss-post",

    // UK
    "dpd-uk": "dpd-uk",
    "hermes-uk": "hermes-uk",
    "uk-mail": "uk-mail",

    // France
    "chronopost": "chronopost",
    "colisprivee": "colisprivee",
    "mondial-relay": "mondial-relay",

    // Spain
    "seur": "seur",

    // Italy
    "gls-italy": "gls-italy",

    // BeNeLux (Belgium, Netherlands, Luxemburg)
    "post-nl": "post-nl",
    "bpost": "bpost",
    "dpd-benelux": "dpd-benelux",

    // Poland
    "dhl-poland": "dhl-poland",
    "poczta-polska": "poczta-polska",

    // Czech Republic
    "ppl": "ppl",

    // Slovenia
    "pošta": "pošta",


    ///////////////////////////////
    // Transform by country code //
    ///////////////////////////////
    "dhl-de": "dhl-germany",
    "dhl-deu": "dhl-germany",

    "dhl-pl": "dhl-poland",
    "dhl-pol": "dhl-poland",

    "dpd-de": "dpd-germany",
    "dpd-deu": "dpd-germany",

    "dpd-be": "dpd-benelux",
    "dpd-bel": "dpd-benelux",
    "dpd-nl": "dpd-benelux",
    "dpd-nld": "dpd-benelux",
    "dpd-lu": "dpd-benelux",
    "dpd-lux": "dpd-benelux",

    "dpd-gb": "dpd-uk",
    "dpd-gbr": "dpd-uk",

    "dpd-at": "dpd-austria",
    "dpd-aut": "dpd-austria",

    "hermes-de": "hermes-germany",
    "hermes-deu": "hermes-germany",

    "hermes-gb": "hermes-uk",
    "hermes-gbr": "hermes-uk",

    "gls-de": "gls-germany",
    "gls-deu": "gls-germany",

    "gls-it": "gls-italy",
    "gls-ita": "gls-italy",

    "post-nld": "post-nl",

    "post-be": "bpost",
    "post-bel": "bpost",

    "post-at": "austrian-post",
    "post-aut": "austrian-post",

    "post-ch": "swiss-post",
    "post-che": "swiss-post",

    ///////////////
    // Transform //
    ///////////////
    "dhl": "dhl-germany",
    "hermes": "hermes-germany",
    "dpd": "dpd-germany",
    "colis-privé": "colisprivee",
    "colis-prive": "colisprivee",
    "ups-express": "ups",
  },
  /**
   * If the courier is one of the bellow we need to append the country code
   */
  couriersAppendCountry: [
    "dhl",
    "dpd",
    "hermes",
    "gls",
    "post",
  ]
}
