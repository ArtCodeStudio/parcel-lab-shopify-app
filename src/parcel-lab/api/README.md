TODO move this to a custom repository under the ISC Licence based on https://bitbucket.org/parcellab/sdk-node

# parcelLab API

This is a simple wrapper to interface the parcelLab API from [Node.js](https://nodejs.org/).

## Background

To use the API, you have to have a set of valid credentials (`user` and `token`) from [parcelLab](https://portal.parcellab.com/).

Any issues can be submitted in the [Git repository's issue tracker](https://bitbucket.org/parcellab/sdk-node/issues).

## Install

Preferred way of installation is through [npm](https://www.npmjs.com/package/parcellab-api).

```
npm install parcellab-api --save
```

Alternatively, you can clone the Git [repository on Bitbucket](https://bitbucket.org/parcellab/sdk-node).

```
git clone git@bitbucket.org:parcellab/sdk-node.git
```

## Usage

You can find an example for using the module in the `./try.js`:

```
var ParcelLabAPI = require('parcellab-api');
var parcelLabAPI = new ParcelLabAPI(1, 'parcelLabAPItoken-30characters');

var payload = {
  courier: 'dhl-germany',
  tracking_number: '1234567890'
};

parcelLabAPI.createTracking(payload, function (err, res) {
  console.log({
    error: err,
    result: res
  });
});
```

These keys are **required** when creating a tracking:

```
courier: String, // short code of the courier
tracking_number: String // tracking number of the delivery
zip_code: String, // postal code for delivery address
destination_country_iso3: String // ISO3 code of country for delivery address
```

Then there are other **optional** keys:

```
deliveryNo: String,
customerNo: String,
orderNo: String,
recipient: String,
recipient_notification: String,
street: String,
city: String,
email: String,
weight: String,
market: String,
order_date: String,
phone: String,
articleNo: String,
articleName: String,
origin_country_iso3: String,
language_iso3: String,
firstOrder: Boolean,
complete: Boolean,
upgrade: Boolean,
cashOnDelivery: Number,
statuslink: String
```

## Dealing with multiple tracking numbers

The module features dealing with multiple tracking numbers embedded in the payload. This allows to use one single call of `createTracking(payload, callback)` for creating multiple trackings for a single order, e.g. when an order from a customer is shipped in several deliveries.

### 1.) Multiple deliveries with same courier

If all shipments are done with a single courier, multiple tracking numbers can simply listed with either the delimiter `,` or `|` within the attribute `tracking_number` like so:

```
var payload = {
  courier: 'dhl-germany',
  tracking_number: '1234567890,1234567891,1234567892'
};
```

### 2.) Multiple deliveries with multiple couriers

In the more complex case where the deliveries are not performed by the same courier, the tracking numbers can be embedded via `JSON` by using the name of the courier as the key and the associated tracking numbers in an array. Example:

```
var payload = {
  courier: 'XXX', // will be ignored
  tracking_number: {
    'dhl-germany': ['1234567890', '1234567891'],
    'ups': ['1Z1234567']
  }
};
```
