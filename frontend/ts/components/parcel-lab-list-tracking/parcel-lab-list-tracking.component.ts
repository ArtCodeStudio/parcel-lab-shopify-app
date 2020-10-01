import { Component } from '@ribajs/core';
import { hasChildNodesTrim } from '@ribajs/utils/src/dom';
import Debug from 'debug';
import pugTemplate from './parcel-lab-list-tracking.component.pug';

import { ParcelLabService } from '../../services/parcel-lab.service';
import { ParcellabSearchResult } from '../../interfaces';

interface Scope {
  list: ParcellabSearchResult[];
}

export class ParcelLabListTrackingComponent extends Component {
  public static tagName = 'parcel-lab-list-tracking';

  protected parcelLab = new ParcelLabService();

  protected debug = Debug(
    'component:' + ParcelLabListTrackingComponent.tagName,
  );

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    list: [],
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
  }

  protected async list() {
    try {
      const list = await this.parcelLab.listTrackings();
      this.debug('list', list);
      return list;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(ParcelLabListTrackingComponent.observedAttributes);
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.debug('beforeBind', this.scope);
    const list = await this.list();
    if (list && list.results) {
      this.scope.list = list.results;
    }

    this.debug('setted list', this.scope.list);
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
