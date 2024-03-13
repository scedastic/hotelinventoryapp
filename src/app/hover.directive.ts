import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hinvHover]'
})
export class HoverDirective {

  @Input() color: string = 'red'; // @Input allows you to put color="" in the tag

  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(this.element.nativeElement);
  }


  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', this.color);

  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'green');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'white');
  }
}
