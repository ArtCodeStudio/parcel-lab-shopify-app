import Debug from 'debug';
import $ from 'jquery';
import { Component } from '@ribajs/core';
import template from './icon.component.html';

export class IconComponent extends Component {
  public static tagName = 'rv-icon';

  protected debug = Debug('component:' + IconComponent.tagName);

  static get observedAttributes() {
    return ['size', 'width', 'height', 'name', 'src', 'color', 'direction'];
  }

  protected scope: any = {};

  protected autobind = false;

  protected $el: JQuery<HTMLElement>;

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.$el
      .attr('aria-hidden', 'true')
      .attr('role', 'img')
      .addClass('iconset');

    // set default values
    // this.attributeChangedCallback('size', null, 32, null);
    this.attributeChangedCallback('direction', null, 'top', null);

    this.init(IconComponent.observedAttributes);
  }

  public attributeChangedCallback(
    name: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    this.debug('attributeChangedCallback', name, oldValue, newValue, namespace);
    // injects the changed attributes to scope
    super.attributeChangedCallback(name, oldValue, newValue, namespace);

    if (name === 'src') {
      if ((newValue as string).indexOf('.svg') > -1) {
        this.debug('load', newValue);
        this.$el.load(newValue);
      } else {
        this.debug('prepend', newValue);
        this.$el.prepend(`<img src="${newValue}" alt="${newValue}" />`);
      }
    }

    if (name === 'color') {
      this.$el
        .css({ color: newValue })
        .removeClass((index, className) => {
          return (className.match(/(^|\s)color-\S+/g) || []).join(' ');
        })
        .addClass(`color-${newValue}`);
    }

    if (name === 'size') {
      const size = newValue;
      this.debug('set size', this.$el);
      this.$el
        .css({ height: size, width: size })
        .removeClass((index, className) => {
          return (className.match(/(^|\s)size-\S+/g) || []).join(' ');
        })
        .addClass(`size-${size}`);
    }

    if (name === 'width') {
      const width = newValue;
      this.debug('set width', this.$el);
      this.$el
        .css({ width })
        .removeClass((index, className) => {
          return (className.match(/(^|\s)width-\S+/g) || []).join(' ');
        })
        .addClass(`width-${width}`);
    }

    if (name === 'height') {
      const height = newValue;
      this.debug('set height', this.$el);
      this.$el
        .css({ height })
        .removeClass((index, className) => {
          return (className.match(/(^|\s)height-\S+/g) || []).join(' ');
        })
        .addClass(`height-${height}`);
    }

    if (name === 'direction') {
      const direction = newValue;
      let classString = `direction-${direction}`;
      if (direction === 'left') {
        classString += ' rotate-270';
      } else if (
        direction === 'left-top' ||
        direction === 'left-up' ||
        direction === 'top-left' ||
        direction === 'up-left'
      ) {
        classString += ' rotate-315';
      } else if (direction === 'top' || direction === 'up') {
        classString += ' rotate-0';
      } else if (
        direction === 'top-right' ||
        direction === 'up-right' ||
        direction === 'right-top' ||
        direction === 'right-up'
      ) {
        classString += ' rotate-45';
      } else if (direction === 'right') {
        classString += ' rotate-90';
      } else if (
        direction === 'right-bottom' ||
        direction === 'right-down' ||
        direction === 'bottom-right' ||
        direction === 'down-right'
      ) {
        classString += ' rotate-135';
      } else if (direction === 'bottom' || direction === 'down') {
        classString += ' rotate-180';
      } else if (
        direction === 'left-bottom' ||
        direction === 'left-down' ||
        direction === 'bottom-left' ||
        direction === 'down-left'
      ) {
        classString += ' rotate-225';
      }
      this.$el
        .css({ height: newValue, width: newValue })
        .removeClass((index, className) => {
          return (className.match(/(^|\s)direction-\S+/g) || []).join(' ');
        })
        .removeClass((index, className) => {
          return (className.match(/(^|\s)rotate-\S+/g) || []).join(' ');
        })
        .addClass(classString);
    }
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    return template;
  }
}
