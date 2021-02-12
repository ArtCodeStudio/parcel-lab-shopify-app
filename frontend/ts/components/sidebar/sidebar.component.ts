import { Component, EventDispatcher } from '@ribajs/core';
import { getViewportDimensions } from '@ribajs/utils/src/dom';
import { JQuery } from '@ribajs/jquery';
import Debug from 'debug';

import pugTemplate from './sidebar.component.pug';

import { EASDKWrapperService } from '@ribajs/shopify-easdk';
import { LocalesStaticService } from '@ribajs/i18n';

interface IScope {
  environment: 'production' | 'development';
  visable: boolean;
  reload: SidebarComponent['reload'];
}

interface IState {
  width: number;
  height: number;
  visable: boolean;
}

export class SidebarComponent extends Component {
  public static tagName = 'rv-sidebar';

  static get observedAttributes() {
    return ['environment'];
  }

  protected event = new EventDispatcher('sidebar');
  protected router = new EventDispatcher('main');
  protected shopifyApp = new EASDKWrapperService();
  protected localesService = LocalesStaticService.getInstance('main');

  protected $el: JQuery<SidebarComponent>;
  protected debug = Debug('component:' + SidebarComponent.tagName);

  protected scope: IScope = {
    environment: 'production',
    visable: false,
    reload: this.reload,
  };

  constructor() {
    super();
    this.$el = JQuery(this);

    this.debug('constructor', this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(SidebarComponent.observedAttributes);

    this.event.on('hide', this.hide.bind(this, false));
    this.event.on('show', this.show.bind(this, false));
    this.event.on('toggle', this.toggle.bind(this, false));
    this.event.on('state', this.state.bind(this));

    window.addEventListener('resize', this.onResize.bind(this, false), false);
    this.router.on('newPageReady', this.onRoute.bind(this));
    this.onResize(true);

    this.localesService.event.on('changed', this.onResize.bind(this, false));
  }

  public hide(force = false) {
    if (this.scope.visable || force) {
      this.scope.visable = false;
      this.style.display = 'none';
      setTimeout(() => {
        this.event.trigger('afterHide', (<IState>{
          width: this.clientWidth,
          height: this.clientHeight,
          visable: this.scope.visable,
        }) as IState);
      }, 0);
    }
  }

  public show(force = false) {
    if (!this.scope.visable || force) {
      this.scope.visable = true;
      this.style.display = 'flex';
      setTimeout(() => {
        if (this.clientWidth > 0) {
          this.event.trigger('afterShow', <IState>{
            width: this.clientWidth,
            height: this.clientHeight,
            visable: this.scope.visable,
          });
        }
      }, 0);
    }
  }

  public toggle() {
    if (this.scope.visable) {
      return this.hide();
    }
    return this.show();
  }

  public state() {
    if ((this.scope.visable && this.clientWidth > 0) || !this.scope.visable) {
      // WORKAROUND
      this.event.trigger('onState', <IState>{
        width: this.clientWidth,
        height: this.clientHeight,
        visable: this.scope.visable,
      });
    }
  }

  /**
   * For debugging
   */
  public reload() {
    this.shopifyApp.Bar.loadingOn();
    location.reload();
  }

  protected onResize(force = false) {
    const vp = getViewportDimensions();
    this.debug('onResize', vp.w);
    if (vp.w < 1200) {
      this.hide(force);
    } else {
      this.show(force);
      // on force the hide or show event is fired and we do not fire the state event byself
      if (!force) {
        setTimeout(() => {
          this.state();
        }, 0);
      }
    }
  }

  protected onRoute() {
    setTimeout(() => {
      const vp = getViewportDimensions();
      this.debug('onResize', vp.w);
      if (vp.w < 1200) {
        this.hide();
      } else {
        this.state();
      }
    }, 0);
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
    return [];
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.onResize.bind(this, false));
    this.localesService.event.off('changed', this.onResize.bind(this, false));
    this.router.off('newPageReady', this.onRoute.bind(this));
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
