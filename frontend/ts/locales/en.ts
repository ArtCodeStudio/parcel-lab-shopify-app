import enOrdersWebhookDescription from './orders/webhooks/description.en.html';
import enComponentswebhookExplorerPlaceholderCardContent from './components/webhook-explorer/placeholder-card-content.en.html';

export default {
  components: {
    parcelLabSettings: {
      title: 'ParcelLab',
      info:
        'Enter your Parcel Lab data here to enable this app to send orders to Parcel Lab.',
      saveLabel: 'Save',
      showPasswordLabel: 'Show',
      hidePasswordLabel: 'Hide',
      tokenHelp: "We'll never share your token with anyone else.",
      preferCheckoutShippingMethodLabel:
        'Try to identify the courier from the shipping method',
      preferCheckoutShippingMethodInfo:
        'If active, the app tries to identify the courier by the title of the shipping method selected by the customer during the ordering process. We recommend to leave this option disabled and to activate it only if there are problems with the courier sent to ParcelLab',
      successfullySavedMessage: 'ParcelLab settings successfully saved',
      notSuccessfullySavedMessage: 'ParcelLab settings could not be saved',
      errors: {
        generalSave: 'Settings could not be saved, please check your input.',
      },
    },
    accountConnects: {
      shopify: {
        title: 'Shopify account',
        info:
          'The Shopify account where you installed this app or have been granted access.',
        notConnected:
          'This app has not yet been connected with Shopify. Enter your Shopify domain below to connect this app with Shopify.',
      },
      connect: 'Connect now',
      disconnect: 'Disconnect',
      logout: 'Logout',
    },
    plans: {
      title: 'App plan',
      info: 'Your plan for this app.',
      plan: 'Plan',
      activated_on: 'Activated on',
      price: 'Price',
      price_html: '{{price}} USD / month',
      trial: {
        ends_on: 'Trial ends on {{date}}',
        ended_on: 'Trial ended on {{date}}',
        days: 'Testing period',
        days_html: '{{days}} days',
      },
      activate: 'Activate',
      name: {
        customers: 'Customers tariff',
        default: 'Standard tariff',
      },
    },
    apiExplorer: {
      input: {
        placeholder: 'Rest API URL for testing',
      },
      send: 'Send',
      edit: 'Edit',
      freestyle: {
        short_desc: 'Try the API itself by enter the URL yourself.',
      },
      roles: {
        'shopify-staff-member': {
          label: 'Backend only',
          info:
            'For security reasons, this API can only be used in the backend and not in the theme.',
        },
      },
      query: {
        title: 'Activate optional query parameters',
      },
      shopify: {
        themes: {
          all: {
            short_desc: 'Retrieves a list of themes.',
          },
          theme_id: {
            short_desc: 'Retrieves a single theme.',
          },
          active: {
            short_desc: 'Retrieves the single active theme.',
          },
          assets: {
            list: {
              short_desc: 'Retrieve a list of all assets for a theme',
            },
            assets_filename: {
              short_desc:
                'Retrieves a single theme asset file for a theme by its filename.',
            },
            templates_filename: {
              short_desc:
                'Retrieves a single theme template file for a theme by its filename.',
            },
            snippets_filename: {
              short_desc:
                'Retrieves a single theme snippets file for a theme by its filename.',
            },
            config_filename: {
              short_desc:
                'Retrieves a single theme config file for a theme by its filename.',
            },
            layout_filename: {
              short_desc:
                'Retrieves a single theme layout file for a theme by its filename.',
            },
            locales_filename: {
              short_desc:
                'Retrieves a single theme locales file for a theme by its filename.',
            },
            sections_filename: {
              short_desc:
                'Retrieves a single theme sections file for a theme by its filename.',
            },
            key: {
              short_desc:
                'Retrieves a single theme file for a theme by its key.',
            },
          },
          locales: {
            all: {
              short_desc: 'Retrieve all language translations for a theme.',
            },
            list: {
              short_desc: 'Retrieve a list of locale asset files for a theme.',
            },
            json: {
              short_desc:
                'Retrieves a single locale asset file for a theme by its filename.',
            },
            liquid: {
              short_desc:
                'Retrieves a single section locale object for a theme by its liquid filename.',
            },
            property_path: {
              short_desc:
                'Retrieves a locale subset or translation for a theme by its property path.',
            },
          },
        },
        products: {
          short_desc: 'Retrieves a list of products.',
          count: {
            short_desc: 'Retrieves a count of products.',
          },
          product_id: {
            short_desc: 'Retrieves a single product.',
          },
        },
      },
    },
    webhookExplorer: {
      placeholderCard: {
        content_html: enComponentswebhookExplorerPlaceholderCardContent,
      },
      simulate: {
        label: 'Simulate',
        info:
          'Creates a dummy product and removes it again to trigger the appropriate webhooks.',
      },
    },
    socketEventCard: {
      roles: {
        'shopify-staff-member': {
          label: 'Backend only',
          info:
            'For security reasons, this webhook can only be received in the backend and not in the theme.',
        },
      },
    },
  },
  titles: {
    overview: 'Overview',
    settings: 'Settings',
    orders: 'Orders',
    'webhooks-api': 'Webhook Websocket API',
  },
  overview: {
    settings_desc: 'General settings and account connections',
    orders_desc: 'Show you the transferred orders',
  },
  orders: {
    webhooks: {
      title: 'Show current received order webhooks',
      description_html: enOrdersWebhookDescription,
    },
  },
};
