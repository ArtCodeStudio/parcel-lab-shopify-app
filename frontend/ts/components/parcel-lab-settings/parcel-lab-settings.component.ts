import { Component } from '@ribajs/core';
import { hasChildNodesTrim } from '@ribajs/utils/src/dom';

import pugTemplate from './parcel-lab-settings.component.pug';

interface Scope {
  locales: any;
}

export class ParcelLabSettingsComponent extends Component {
  public static tagName = 'parcel-lab-settings';

  public _debug = true;

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    locales: {},
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
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
  }

  protected async afterBind() {
    await super.afterBind();
    this.debug('afterBind', this.scope);
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
    if (hasChildNodesTrim(this.el)) {
      this.debug('Do not template, because element has child nodes');
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug('Use template', template);
      return template;
    }
  }
}
