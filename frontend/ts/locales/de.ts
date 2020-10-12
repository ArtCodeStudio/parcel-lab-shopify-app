import deOrdersWebhookDescription from './orders/webhooks/description.de.html';
import deComponentswebhookExplorerPlaceholderCardContent from './components/webhook-explorer/placeholder-card-content.de.html';

export default {
  components: {
    parcelLabSettings: {
      title: 'ParcelLab',
      info:
        'Hinterlege hier deine Parcel Lab Daten um es dieser App zu ermöglichen Bestellungen an Parcel Lab zu senden.',
      saveLabel: 'Speichern',
      showPasswordLabel: 'Anzeigen',
      hidePasswordLabel: 'Verstecken',
      tokenHelp: 'Wir werden deinen Token niemals an andere weitergeben.',
      preferCheckoutShippingMethodLabel:
        'Versuche den Kuriers aus der Versandmethode herzuleiten',
      preferCheckoutShippingMethodInfo:
        'Wenn aktiv, versucht die App den Kurier anhand des Titels der Versandmethode (die der Kunde im Bestellvorgang ausgewählt hat) herzuleiten. Wir empfehlen diese Option deaktiviert zu lassen und nur zu aktivieren wenn es Probleme mit dem an ParcelLab übergebenen Kurier gibt.',
      successfullySavedMessage:
        'ParcelLab Einstellungen erfolgreich gespeichert',
      notSuccessfullySavedMessage:
        'ParcelLab Einstellungen konnten nicht gespeichert werden',
      errors: {
        generalSave:
          'Einstellungen konnten nicht gespeichert werden, bitte überprüfe deine Eingabe.',
      },
    },
    accountConnects: {
      shopify: {
        title: 'Shopify-Konto',
        info:
          'Das Shopify-Konto, in dem Sie diese App installiert haben oder Zugriff gewährt bekommen haben.',
        notConnected:
          'Diese App wurde noch nicht mit Shopify verbunden. Geben Sie unten ihre Shopify-Domain ein um diese App mit Shopify zu verbinden.',
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
    },
    webhookExplorer: {
      placeholderCard: {
        content_html: deComponentswebhookExplorerPlaceholderCardContent,
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
  },
  titles: {
    overview: 'Übersicht',
    settings: 'Einstellungen',
    orders: 'Bestellungen',
    'webhooks-api': 'Webhook Websocket-API',
  },
  overview: {
    settings_desc: 'Generelle Einstellungen und Konto-Anbindungen',
    orders_desc: 'Zeige dir die übertragenen Bestellungen an',
  },
  orders: {
    webhooks: {
      title: 'Zeige gerade empfange Order-Webhooks',
      description_html: deOrdersWebhookDescription,
    },
  },
};
