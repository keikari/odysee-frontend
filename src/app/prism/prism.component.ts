import {Component, Input, Renderer2, ElementRef, AfterViewInit, AfterViewChecked} from '@angular/core';
declare var Prism: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'prism-block',
  template: ``,
})
export class PrismComponent implements AfterViewInit, AfterViewChecked {
  @Input() code: string;
  @Input() language: string;
  private preNode: Node;
  private codeNode: Node;
  private nativeElement: Node;
  ngAfterViewChecked(): void {
    this.highlight();
  }

  ngAfterViewInit () {
    this.highlight();
  }
  constructor(private _renderer: Renderer2, private _el: ElementRef) {
    this.nativeElement = _el.nativeElement;

  }

  private highlight() {
    if (this.preNode) {
      this._renderer.removeChild(this.nativeElement, this.preNode);
    }
    this.preNode = this._renderer.createElement('pre');
    this.codeNode = this._renderer.createElement('code');
    this._renderer.addClass(this.codeNode, 'language-' + this.language);
    this._renderer.appendChild(this.nativeElement, this.preNode);
    this._renderer.appendChild(this.preNode, this.codeNode);
    this.codeNode.textContent = this.code;
    Prism.highlightElement(this.codeNode);
  }
}
