import enApiWebhookDescription from './api/webhooks/description.en.html';
import deApiWebhookDescription from './api/webhooks/description.de.html';

import enComponentsApiSocketExplorerPlaceholderCardContent from './components/api-socket-explorer/placeholder-card-content.en.html';
import deComponentsApiSocketExplorerPlaceholderCardContent from './components/api-socket-explorer/placeholder-card-content.de.html';

export default {
  de: {
    components: {
      accountConnects: {
        shopify: {
          title: 'Shopify-Konto',
          info:
            'Das Shopify-Konto, in dem Sie diese App installiert haben oder Zugriff gewährt bekommen haben.',
          notConnected:
            'Diese App wurde noch nicht mit Shopify verbunden. Geben Sie unten ihre Shopify-Domain ein um diese App mit Shopify zu verbinden.',
        },
        facebook: {
          title: 'Facebook-Konto',
          info:
            'Ihr Facebook-Konto, dass Sie benutzen um auf die Instagram API zuzugreifen.',
          notConnected:
            'Diese App wurde noch nicht mit Ihrem Facebook-Konto verbunden. Klicken Sie unten auf "Weiter mit Facebook".',
          connect: 'Weiter mit Facebook',
          disconnect: 'Facebook trennen',
          logout: 'Facebook abmelden',
        },
        connect: 'Jetzt verbinden',
        disconnect: 'Trennen',
        logout: 'Abmelden',
      },
      plans: {
        title: 'App-Tarif',
        info: 'Ihr Tarif für diese App.',
        plan: 'Tarif',
        activated_on: 'Aktivert am',
        price: 'Preis',
        price_html: '{{price}} USD / Monat',
        trial: {
          ends_on: 'Testversion endet am {{date}}',
          ended_on: 'Testversion endete am {{date}}',
          days: 'Testzeitraum',
          days_html: '{{days}} Tage',
        },
        activate: 'Aktivieren',
        name: {
          customers: 'Kundentarif',
          default: 'Standardtarif',
        },
      },
      apiExplorer: {
        input: {
          placeholder: 'Rest-API URL zum Testen',
        },
        send: 'Senden',
        edit: 'Bearbeiten',
        freestyle: {
          short_desc:
            'Probiere die API selber aus indem du die die URL selber eingibst.',
        },
        roles: {
          'shopify-staff-member': {
            label: 'Nur Backend',
            info:
              'Diese API kann aus Sicherheitsgründen nur im Backend und nicht im Theme verwendet werden.',
          },
        },
        query: {
          title: 'Aktiviere optionale Query-Parameter',
        },
        shopify: {
          themes: {
            all: {
              short_desc: 'Ruft eine Liste aller Themes ab.',
            },
            theme_id: {
              short_desc: 'Ruft ein einzelnes Theme ab.',
            },
            active: {
              short_desc: 'Ruft das einzelne aktive Theme ab.',
            },
            assets: {
              list: {
                short_desc: 'Ruft eine Liste aller Assets eines Themes ab.',
              },
              assets_filename: {
                short_desc:
                  'Ruft eine einzelne Asset-Datei eines Themes anhand seines Dateinamens ab.',
              },
              templates_filename: {
                short_desc:
                  'Ruft eine einzelne Template-Datei eines Themes anhand seines Dateinamens ab.',
              },
              snippets_filename: {
                short_desc:
                  'Ruft eine einzelne Snippet-Datei eines Themes anhand seines Dateinamens ab.',
              },
              config_filename: {
                short_desc:
                  'Ruft eine einzelne Config-Datei eines Themes anhand seines Dateinamens ab.',
              },
              layout_filename: {
                short_desc:
                  'Ruft eine einzelne Layout-Datei eines Themes anhand seines Dateinamens ab.',
              },
              locales_filename: {
                short_desc:
                  'Ruft eine einzelne Locales-Datei eines Themes anhand seines Dateinamens ab.',
              },
              sections_filename: {
                short_desc:
                  'Ruft eine einzelne Sections-Datei eines Themes anhand seines Dateinamens ab.',
              },
              key: {
                short_desc:
                  'Ruft ein einzelnes Assets eines Themes anhand seines Keys ab.',
              },
            },
            locales: {
              all: {
                short_desc: 'Ruft alle Übersetzungen eines Themes ab.',
              },
              list: {
                short_desc: 'Ruft eine Liste von Asset-Sprachdateien ab.',
              },
              json: {
                short_desc:
                  'Ruft eine einzelne Asset-Sprachdatei eines Themes anhand seines Dateinamens ab.',
              },
              liquid: {
                short_desc:
                  'Ruft ein einzelnes Snippet Sprachobject eines Themes anhand des Liquid-Dateinamens ab.',
              },
              property_path: {
                short_desc:
                  'Ruft eine Untermenge oder eine Übersetzung eines Themes anhand des Json-Pfad ab.',
              },
            },
          },
          products: {
            short_desc: 'Ruft eine Liste von Produkten ab.',
            count: {
              short_desc: 'Ruft eine Anzahl von Produkten ab.',
            },
            product_id: {
              short_desc: 'Ruft ein einzelnes Produkt ab.',
            },
          },
        },
        instagram: {
          user: {
            short_desc: 'Ruft deinen Facebook-Benutzer ab.',
            accounts: {
              short_desc:
                'Ruft eine Liste deiner mit Facebook verbundenen Instagram Accounts ab.',
            },
          },
          media: {
            short_desc:
              'Ruft die Medien anhand eines Instagram-Business-Kontos ab.',
          },
        },
        facebook: {
          user: {
            short_desc: 'Ruft deinen Benutzer ab.',
            picture: {
              short_desc: 'Ruft dein Profilbild ab.',
            },
            pages: {
              short_desc:
                'Ruft eine Liste von Seiten ab auf die der Benutzer zugriff hat.',
            },
          },
          posts: {
            user: {
              short_desc:
                'Ruft eine Liste der Beiträge Ihres Benutzerkontos ab.',
            },
            pageId: {
              short_desc: 'Ruft eine Liste der Beiträge einer Seite ab.',
            },
          },
          post: {
            postId: {
              short_desc: 'Ruft einen einzelnen Post ab.',
              comments: {
                short_desc: 'Ruft eine Liste von Kommentaren eines Posts ab.',
              },
            },
          },
        },
      },
      apiSocketExplorer: {
        placeholderCard: {
          content_html: deComponentsApiSocketExplorerPlaceholderCardContent,
        },
        simulate: {
          label: 'Simuliere',
          info:
            'Erzeugt ein Dummy-Produkt und entfernt es wieder um die entsprechenden Webhooks auszulösen.',
        },
      },
      socketEventCard: {
        roles: {
          'shopify-staff-member': {
            label: 'Nur Backend',
            info:
              'Dieser Webhook kann aus Sicherheitsbedenken nur im Backend und nicht im Theme empfangen werden.',
          },
        },
      },
      SyncProgress: {
        title: 'Synchronisation',
        info_html:
          'Synchronisiere deine Shopdaten mit dieser App um die Live-Suche zu aktivieren.',
        need: 'Du hast noch keine Daten synchronisiert.',
        sync: {
          need: 'Bisher wurde noch keine Synchronisation gestartet.',
          running: 'Synchronisation läuft...',
          starting: 'Synchronisation beginnt...',
          ending: 'Synchronisation endet...',
          cancel: 'Abbrechen',
          start: 'Starten',
          restart: 'Neu starten',
          success: 'Die letzte Synchronisation war erfolgreich.',
          failed: 'Die letzte Synchronisation ist fehlgeschlagen.',
          cancelled: 'Die letzte Synchronisation wurde abgebrochen.',
          error_message: 'Fehlermeldung:',
          products: 'Zuletzt synchronisiertes Produkt',
          orders: 'Zuletzt synchronisierte Bestellung',
          pages: 'Zuletzt synchronisierte Seite',
          customCollections: 'Zuletzt synchronisierte Custom Collection',
          smartCollections: 'Zuletzt synchronisierte Smart Collection',
        },
      },
    },
    titles: {
      overview: 'Übersicht',
      settings: 'Einstellungen',
      api: 'API',
      i18n: 'I18n',
      content: 'Inhalte und Metafields',
      'content-blogs': 'Blogs',
      'content-blog': 'Blog',
      'content-articles': 'Artikel',
      'content-article': 'Artikel',
      'facebook-api': 'Facebook REST-API',
      'instagram-api': 'Instagram REST-API',
      'shopify-api': 'Shopify REST-API',
      'webhooks-api': 'Webhook Websocket-API',
    },
    overview: {
      settings_desc: 'Generelle Einstellungen und Konto-Anbindungen',
      api_desc: 'Erweitere Rest-API für dein Theme',
      i18n_desc: 'Übersetzungstool für deine Themes',
      content_desc: 'Inhalte und deren Metafields bearbeiten',
      content_blogs_desc: 'Blogs auflisten',
      content_articles_desc: 'Artikel und deren Metafields bearbeiten',
      facebook_api_desc:
        'Nutze die Facebook REST-API z.B. um Facebook in dein Theme zu integrieren.',
      instagram_api_desc:
        'Nutze die Instagram REST-API z.B. um deine Instagram-Bilder und / oder Kommentare in dein Theme zu integrieren.',
      shopify_api_desc:
        'Erweitere die Möglichkeiten deines Themes mit der zusätzlichen Shopify Rest-API.',
      webhooks_api_desc:
        'Beobachte das Hinzufügen, Entfernen und Ändern von Produkten mit der Webhooks Websocket API.',
    },
    api: {
      webhooks: {
        title: 'Empfange Webhooks in deinem Theme',
        description_html: deApiWebhookDescription,
      },
    },
  },
  en: {
    components: {
      accountConnects: {
        shopify: {
          title: 'Shopify account',
          info:
            'The Shopify account where you installed this app or have been granted access.',
          notConnected:
            'This app has not yet been connected with Shopify. Enter your Shopify domain below to connect this app with Shopify.',
        },
        facebook: {
          title: 'Facebook account',
          info:
            'Your Facebook account, which you use to access the Instagram API.',
          notConnected:
            'This app has not yet been linked to your Facebook account. Click "Continue with Facebook" at the bottom.',
          connect: 'Continue with Facebook',
          disconnect: 'Disconnect Facebook',
          logout: 'Logout on Facebook',
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
                short_desc:
                  'Retrieve a list of locale asset files for a theme.',
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
        instagram: {
          user: {
            short_desc: 'Retrieves your Facebook user name and id.',
            accounts: {
              short_desc:
                'Retrieves a list of your with Facebook connected instagram accounts.',
            },
          },
          media: {
            short_desc:
              'Retrieves your instagram media for a Instagram business ccount.',
          },
        },
        facebook: {
          user: {
            short_desc: 'Retrieves your user name and id.',
            picture: {
              short_desc: 'Retrieves your user picture image.',
            },
            pages: {
              short_desc: 'Retrieves your user pages your user has access to.',
            },
          },
          posts: {
            user: {
              short_desc: 'Retrieves a list of posts by your user account.',
            },
            pageId: {
              short_desc: 'Retrieves a list of posts by a page.',
            },
          },
          post: {
            postId: {
              short_desc: 'Retrieves a single post.',
              comments: {
                short_desc: 'Retrieves a list of comments of a post.',
              },
            },
          },
        },
      },
      apiSocketExplorer: {
        placeholderCard: {
          content_html: enComponentsApiSocketExplorerPlaceholderCardContent,
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
      SyncProgress: {
        title: 'Synchronization',
        info_html: 'Sync your store data with this app to enable live search.',
        need: 'You have not synced any data yet.',
        sync: {
          need: 'So far no synchronization has been started.',
          running: 'Synchronization is running...',
          starting: 'Synchronization starts...',
          ending: 'Synchronization ends...',
          cancel: 'Cancel',
          start: 'Start',
          restart: 'Restart',
          success: 'The last synchronization was successful.',
          failed: 'The last synchronization was failed.',
          cancelled: 'The last synchronization was cancelled.',
          error_message: 'Error message:',
          products: 'Last synchronized product',
          orders: 'Last synchronized order',
          pages: 'Last synchronized page',
          customCollections: 'Last synchronized custom collection',
          smartCollections: 'Last synchronized smart collection',
        },
      },
    },
    titles: {
      overview: 'Overview',
      settings: 'Settings',
      api: 'API',
      i18n: 'I18n',
      content: 'Content and Metafields',
      'content-blogs': 'Blogs',
      'content-blog': 'Blog',
      'content-articles': 'Articles',
      'content-article': 'Article',
      'facebook-api': 'Facebook REST API',
      'instagram-api': 'Instagram REST API',
      'shopify-api': 'Shopify REST API',
      'webhooks-api': 'Webhook Websocket API',
    },
    overview: {
      settings_desc: 'General settings and account connections',
      api_desc: 'Expand Rest API for your theme',
      i18n_desc: 'Translation tool for your themes',
      content_desc: 'Change contents and metafields',
      content_blogs_desc: 'List blogs',
      content_articles_desc: 'Change articles and his metafields',
      facebook_api_desc:
        'Use the Facebook REST API, e.g. to integrate Facebook into your theme.',
      instagram_api_desc:
        'Use the Instagram REST API, e.g. to integrate your Instagram pictures and / or comments into your theme.',
      shopify_api_desc:
        'Expand the possibilities of your theme with the Shopify Rest API.',
      webhooks_api_desc:
        'Watch for adding, removing, and modifying products using the Webhooks Websocket API.',
    },
    api: {
      webhooks: {
        title: 'Receive webhooks in your theme',
        description_html: enApiWebhookDescription,
      },
    },
  },
};
