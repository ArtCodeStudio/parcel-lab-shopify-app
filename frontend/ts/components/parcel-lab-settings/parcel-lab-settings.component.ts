import { Component } from '@ribajs/core';
import { hasChildNodesTrim } from '@ribajs/utils/src/dom';
import Debug from 'debug';
import pugTemplate from './parcel-lab-settings.component.pug';

import { ParcelLabService } from '../../services/parcel-lab.service';
import { ParcelLabSettings } from '../../interfaces';

interface Scope {
  locales: any;
  settings: Partial<ParcelLabSettings>;
  showPasswort: boolean;
  passwortInputType: 'text' | 'password';
  save: ParcelLabSettingsComponent['save'];
  togglePassword: ParcelLabSettingsComponent['togglePassword'];
}

export class ParcelLabSettingsComponent extends Component {
  public static tagName = 'parcel-lab-settings';

  protected parcelLab = new ParcelLabService();

  protected debug = Debug('component:' + ParcelLabSettingsComponent.tagName);

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    locales: {
      error: '',
    },
    settings: { token: 'test' },
    showPasswort: false,
    passwortInputType: 'password',
    // Methods
    save: this.save,
    togglePassword: this.togglePassword,
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
      return result;
    } catch (error) {
      console.error(error);
      this.scope.locales.error =
        'components.parcelLabSettings.errors.generalSave';
      // throw error;
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

  protected attributeChangedCallback(
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
