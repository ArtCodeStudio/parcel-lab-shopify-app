import Debug from 'debug';
import {
  Langcode,
  AI18nSwitcherComponent,
  LocalesStaticService,
} from '@ribajs/i18n';

export class TdaI18nSwitcherComponent extends AI18nSwitcherComponent {
  public static tagName = 'rv-i18n-switcher';

  static get observedAttributes() {
    return [];
  }

  // protected $el: JQuery<HTMLElement>;

  protected localesService = LocalesStaticService.getInstance('main');

  protected debug = Debug('component:' + TdaI18nSwitcherComponent.tagName);

  protected scope = {
    langcodes: <Langcode[]>[],
    switch: this.switch,
    toggle: this.toggle,
    ready: <boolean>false,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TdaI18nSwitcherComponent.observedAttributes);
  }

  /**
   * Switch to language by langcode
   * @param langcode
   * @param event
   */
  public switch(langcode: Langcode, event: Event) {
    return super.switch(langcode, event);
  }

  /**
   * Toggle language, makes only sense if you have only two languages
   * @param langcode
   * @param event
   */
  public toggle(event: Event) {
    return super.toggle(event);
  }

  protected setLangcode(langcode: string) {
    this.debug('setLangcode', langcode);
    return super.setLangcode(langcode);
  }

  protected async beforeBind() {
    this.debug('beforeBind', this.scope);
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
    return null;
  }
}
