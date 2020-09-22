import { Component, HttpService } from '@ribajs/core';
import pugTemplate from './plans.component.pug';

import { IRecurringCharge } from '../../interfaces/shopify-api/recurring_charge';
import { IPlan } from '../../interfaces/plan';

interface IScope {
  plans: IPlan[];
  active?: IRecurringCharge;
  hasActive: boolean;
  activate: PlansComponent['activate'];
}

export class PlansComponent extends Component {
  public static tagName = 'rv-plans';

  static get observedAttributes() {
    return [];
  }

  public _debug = true;

  protected scope: IScope = {
    plans: [],
    active: undefined,
    hasActive: false,
    activate: this.activate,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.loadAvailableCharges()
      .then(() => {
        return this.loadActiveCharge();
      })
      .then(() => {
        return this.init(PlansComponent.observedAttributes);
      })
      .catch((error) => {
        this.debug('error', error);
      });
  }

  /**
   * Create and acivate the charge
   * @param plan
   */
  public activate(plan: IPlan) {
    this.debug('activate');
    const activateUrl = `/shopify/charge/create/${plan.name}`;
    window.location.href = activateUrl;
  }

  protected async loadActiveCharge() {
    return HttpService.getJSON(`/shopify/charge/active`).then(
      (activeCharge: IRecurringCharge | null) => {
        this.debug('activeCharge', activeCharge);
        this.scope.active = activeCharge ? activeCharge : undefined;
        if (this.scope.active) {
          this.scope.hasActive = true;
        }
        return this.scope.active;
      },
    );
  }

  protected async loadAvailableCharges() {
    return HttpService.getJSON(`/shopify/charge/available`).then(
      (availableCharges: IPlan[]) => {
        this.debug('available charges', availableCharges);
        this.scope.plans = availableCharges;
        return this.scope.plans;
      },
    );
  }

  protected async beforeBind() {
    this.debug('beforeBind');
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

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
