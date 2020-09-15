import { Component } from '@ribajs/core';
import { JQuery } from '@ribajs/jquery';
import Debug from 'debug';

import pugTemplate from './socket-event-card.component.pug';

interface IScope {
  close?: SocketEventCardComponent['close'];
  event?: string;
  data?: any;
  role?: string;
}

export class SocketEventCardComponent extends Component {
  public static tagName = 'rv-socket-event-card';

  protected autobind = true;

  static get observedAttributes() {
    return ['event', 'data', 'role'];
  }

  protected $el: JQuery<HTMLElement>;
  protected debug = Debug('component:' + SocketEventCardComponent.tagName);

  protected scope: IScope = {
    close: this.close,
    event: undefined,
    data: undefined,
    role: undefined,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = JQuery(this.el);
    this.debug('constructor', this);
    this.init(SocketEventCardComponent.observedAttributes);
  }

  public close() {
    this.debug('close');
    this.remove();
  }

  protected async beforeBind() {
    this.debug('beforeBind');
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
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
    if (this.el.hasChildNodes()) {
      this.debug('Do not template, because element has child nodes');
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug('Use template', template);
      return template;
    }
  }
}
