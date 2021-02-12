import { Component } from '@ribajs/core';
import Debug from 'debug';

import pugTemplate from './webhook-card.component.pug';

interface IScope {
  close?: SocketEventCardComponent['close'];
  event?: string;
  data?: any;
  role?: string;
}

export class SocketEventCardComponent extends Component {
  public static tagName = 'rv-webhook-card';

  protected autobind = true;

  static get observedAttributes() {
    return ['event', 'data', 'role'];
  }

  protected debug = Debug('component:' + SocketEventCardComponent.tagName);

  protected scope: IScope = {
    close: this.close,
    event: undefined,
    data: undefined,
    role: undefined,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(SocketEventCardComponent.observedAttributes);
  }

  public close() {
    this.debug('close');
    this.remove();
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.debug('beforeBind');
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    await super.afterBind();
  }

  protected requiredAttributes() {
    return ['event'];
  }

  protected attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (this.hasChildNodes()) {
      this.debug('Do not template, because element has child nodes');
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug('Use template', template);
      return template;
    }
  }
}
