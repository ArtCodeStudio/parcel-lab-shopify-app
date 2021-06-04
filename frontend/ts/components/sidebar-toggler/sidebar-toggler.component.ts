import { Component, EventDispatcher } from '@ribajs/core';

import { JQuery } from '@ribajs/jquery';
import Debug from 'debug';

import pugTemplate from './sidebar-toggler.component.pug';

interface Scope {
  sidebarVisable: boolean;
  hide: SidebarTogglerComponent['hide'];
  show: SidebarTogglerComponent['show'];
  toggle: SidebarTogglerComponent['toggle'];
}

interface IState {
  width: number;
  height: number;
  visable: boolean;
}

export class SidebarTogglerComponent extends Component {
  public static tagName = 'rv-sidebar-toggler';

  static get observedAttributes() {
    return [];
  }

  protected event = new EventDispatcher('sidebar');

  protected $el: JQuery<SidebarTogglerComponent>;
  protected debug = Debug('component:' + SidebarTogglerComponent.tagName);

  public scope: Scope = {
    sidebarVisable: false,
    hide: this.hide,
    show: this.show,
    toggle: this.toggle,
  };

  constructor() {
    super();
    this.$el = JQuery(this);
    this.debug('constructor', this.constructor, this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(SidebarTogglerComponent.observedAttributes);
    this.event.on('afterShow', this.afterShow.bind(this));
    this.event.on('afterHide', this.afterHide.bind(this));
    this.event.on('onState', this.onState.bind(this));
    this.demandState();
  }

  public hide() {
    this.event.trigger('hide');
  }

  public show() {
    this.event.trigger('show');
  }

  public toggle() {
    this.event.trigger('toggle');
  }

  public demandState() {
    this.event.trigger('state');
  }

  public afterHide(state: IState) {
    this.debug('afterHide', state);
    this.scope.sidebarVisable = state.visable;
    this.style.right = state.width.toString();
  }

  public afterShow(state: IState) {
    this.debug('afterShow', state);
    this.scope.sidebarVisable = state.visable;
    this.style.right = state.width.toString();
  }

  public onState(state: IState) {
    this.debug('onState', state);
    this.scope.sidebarVisable = state.visable;
    this.style.right = state.width.toString();
  }

  protected async beforeBind() {
    await super.beforeBind();
    return this.debug('beforeBind', this.bound);
  }

  protected async afterBind() {
    this.debug('afterBind', this.bound, this.scope);
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
