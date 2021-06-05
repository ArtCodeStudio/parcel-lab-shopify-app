import { Component } from '@ribajs/core';
import { EASDKWrapperService } from '@ribajs/shopify-easdk';
import { hasChildNodesTrim } from '@ribajs/utils/src/dom';
import { LocalesStaticService } from '@ribajs/i18n';
import Debug from 'debug';
import pugTemplate from './parcel-lab-settings.component.pug';

import { ParcelLabService } from '../../services/parcel-lab.service';
import { ParcelLabSettings } from '../../interfaces';

import defaultLocales from '../../locales/en';

const langCodes = Object.entries(
  defaultLocales.components.parcelLabSettings.languages,
).map(([code, label]) => ({
  code,
  label,
}));

interface Scope {
  locales: any;
  settings: Partial<ParcelLabSettings>;
  showPasswort: boolean;
  passwortInputType: 'text' | 'password';
  save: ParcelLabSettingsComponent['save'];
  addLanguageOverride: ParcelLabSettingsComponent['addLanguageOverride'];
  removeLanguageOverride: ParcelLabSettingsComponent['removeLanguageOverride'];
  togglePassword: ParcelLabSettingsComponent['togglePassword'];
  langSelectOptionsFrom: ParcelLabSettingsComponent['langSelectOptionsFrom'];
  langSelectOptionsTo: ParcelLabSettingsComponent['langSelectOptionsTo'];
}

export class ParcelLabSettingsComponent extends Component {
  public static tagName = 'parcel-lab-settings';
  protected parcelLab = new ParcelLabService();
  protected debug = Debug('component:' + ParcelLabSettingsComponent.tagName);
  protected autobind = true;
  protected easdk = new EASDKWrapperService();
  protected localesService = LocalesStaticService.getInstance('main');

  static get observedAttributes() {
    return [];
  }

  public scope: Scope = {
    locales: {
      error: '',
    },
    settings: {
      token: '',
      user: 0,
      customFields: {
        'no-notify': false,
      },
      prefer_checkout_shipping_method: false,
      languageOverrides: [],
    },
    showPasswort: false,
    passwortInputType: 'password',
    // Methods
    save: this.save,
    togglePassword: this.togglePassword.bind(this),
    addLanguageOverride: this.addLanguageOverride.bind(this),
    removeLanguageOverride: this.removeLanguageOverride.bind(this),
    langSelectOptionsFrom: this.langSelectOptionsFrom.bind(this),
    langSelectOptionsTo: this.langSelectOptionsTo.bind(this),
  };

  constructor() {
    super();
    this.debug('constructor', this);
  }

  protected async get() {
    try {
      const settings = await this.parcelLab.getSettings();
      this.debug('get settings', settings);
      return settings;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public langSelectOptionsFrom(index: number) {
    // Return all language codes that are not already set as 'from' in other overrides.
    return langCodes.filter(
      (x) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        !this.scope.settings
          .languageOverrides!.map((l) => l.from)
          .find((y, i) => i !== index && y.trim() === x.code),
    );
  }

  public langSelectOptionsTo(from: string) {
    // Return all language codes except the corresponding 'from' field.
    return langCodes.filter(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (x) => x.code !== from,
    );
  }

  public addLanguageOverride() {
    if (!this.scope.settings.languageOverrides) {
      this.scope.settings.languageOverrides = [];
    }
    this.scope.settings.languageOverrides.push({
      from: '',
      to: '',
    });
  }

  public removeLanguageOverride(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.id.startsWith('remove-lang-')) {
      const index = parseInt(target.id.substr(12));
      this.scope.settings.languageOverrides?.splice(index, 1);
    }
  }

  public async save() {
    this.debug('save settings', this.scope.settings);
    if (!this.scope.settings) {
      this.scope.locales.error =
        'components.parcelLabSettings.errors.generalSave';
      throw new Error('No settings found to save!');
    }
    try {
      const result = await this.parcelLab.setSettings(
        this.scope.settings as ParcelLabSettings,
      );
      this.resetErrors();

      const successfullySavedMessage =
        await this.localesService.getByCurrentLang([
          'components',
          'parcelLabSettings',
          'successfullySavedMessage',
        ]);

      this.easdk.flashNotice(successfullySavedMessage);
      return result;
    } catch (error) {
      console.error(error);
      this.scope.locales.error =
        'components.parcelLabSettings.errors.generalSave';

      const notSuccessfullySavedMessage =
        await this.localesService.getByCurrentLang([
          'components',
          'parcelLabSettings',
          'notSuccessfullySavedMessage',
        ]);

      this.easdk.flashError(notSuccessfullySavedMessage);
    }
  }

  public togglePassword() {
    this.scope.showPasswort = !this.scope.showPasswort;
    if (this.scope.showPasswort) {
      this.scope.passwortInputType = 'text';
    } else {
      this.scope.passwortInputType = 'password';
    }
  }

  protected resetErrors() {
    this.scope.locales.error = '';
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(ParcelLabSettingsComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.debug('beforeBind', this.scope);
    const settings = await this.get();
    this.scope.settings = settings || this.scope.settings;
    this.debug('setted settings', this.scope.settings);
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    await super.afterBind();
  }

  protected requiredAttributes() {
    return [];
  }

  protected async attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    return super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    return super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
  }

  // deconstructor
  protected disconnectedCallback() {
    return super.disconnectedCallback();
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      this.debug('Do not template, because element has child nodes');
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug('Use template', template);
      return template;
    }
  }
}
