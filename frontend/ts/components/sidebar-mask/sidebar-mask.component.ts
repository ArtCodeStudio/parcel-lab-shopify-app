import { Component, EventDispatcher } from '@ribajs/core';
import { getViewportDimensions } from '@ribajs/utils/src/dom';

import Debug from 'debug';

interface IScope {
  show: boolean;
}

interface IState {
  width: number;
  height: number;
  visable: boolean;
}

export class SidebarMaskComponent extends Component {
  public static tagName = 'rv-sidebar-mask';

  static get observedAttributes() {
    return [];
  }

  protected autobind = false;

  protected event = new EventDispatcher('sidebar');

  protected debug = Debug('component:' + SidebarMaskComponent.tagName);

  protected scope: IScope = {
    show: false,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this.el.constructor, this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(SidebarMaskComponent.observedAttributes);
    this.event.on('afterShow', this.onState.bind(this));
    this.event.on('afterHide', this.onState.bind(this));
    this.event.on('onState', this.onState.bind(this));
  }

  public onState(state: IState) {
    this.debug('onState', state);

    const vp = getViewportDimensions();
    this.debug('onResize', vp.w);
    if (vp.w < 1200) {
      this.scope.show = state.visable;
    } else {
      this.scope.show = false;
    }

    if (this.scope.show) {
      this.el.style.display = 'block';
    } else {
      this.el.style.display = 'none';
    }
  }

  protected async beforeBind() {
    return this.debug('beforeBind', this.bound);
  }

  protected async afterBind() {
    return this.debug('afterBind', this.bound, this.scope);
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
    return null;
  }
}
