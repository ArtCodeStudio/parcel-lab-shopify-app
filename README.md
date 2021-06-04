# parcel-lab-shopify-app

## Description

Sync your Shopify orders to [parcelLab](https://parcellab.com).

## Clone

This repository has submodules, so you need to clone this repository with it's submodules:

```sh
git clone --recurse-submodules https://github.com/ArtCodeStudio/parcel-lab-shopify-app.git
cd parcel-lab-shopify-app
```

If you have already pulled the repository you can just run:

```sh
git submodule update --init --recursive
git pull --recurse-submodules
```

## Installation

```bash
yarn install
cp .env.example .env
# Now open and edit .env
```

## Running the app

```bash
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## Test

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## Support

This app is an AGPL-licensed open source project. If you'd like this app please help us to make the app better.

## Stay in touch

- [Art+Code Studio](https://artandcode.studio)

## License

  This app is licensed under [The GNU Affero General Public License](LICENSE.md).
