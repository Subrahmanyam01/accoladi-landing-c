import { isPlatformBrowser } from '@angular/common';
import { Directive, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Directive()
export abstract class LegacyPageBase implements OnInit, OnDestroy {
  protected abstract readonly bodyClasses: string[];
  protected abstract readonly pageTitle: string;
  protected readonly platformId = inject(PLATFORM_ID);
  protected readonly title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.bodyClasses.forEach((className) => document.body.classList.add(className));
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.bodyClasses.forEach((className) => document.body.classList.remove(className));
  }
}
