import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  private readonly revealSelector = '.reveal, .reveal-on-scroll';
  private readonly cleanup: Array<() => void> = [];
  private intersectionObserver: IntersectionObserver | null = null;
  private mutationObserver: MutationObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.initializeRevealSupport();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.cleanup.forEach((dispose) => dispose());
    this.cleanup.length = 0;
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    this.mutationObserver?.disconnect();
    this.mutationObserver = null;
  }

  private initializeRevealSupport(): void {
    const revealExisting = () => {
      const elements = Array.from(document.querySelectorAll(this.revealSelector)) as HTMLElement[];
      elements.forEach((element) => this.revealElement(element));
    };

    if (!('IntersectionObserver' in window)) {
      revealExisting();
      return;
    }

    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px',
    });

    const observeRevealTargets = (root: ParentNode) => {
      const elements = Array.from(root.querySelectorAll(this.revealSelector)) as HTMLElement[];
      elements.forEach((element) => this.revealElement(element));
    };

    revealExisting();

    this.mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          if (node.matches(this.revealSelector)) {
            this.revealElement(node);
          }

          observeRevealTargets(node);
        });
      }
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private revealElement(element: HTMLElement): void {
    if (element.classList.contains('reveal')) {
      element.classList.add('is-visible');
      return;
    }

    if (!this.intersectionObserver) {
      element.classList.add('is-visible');
      return;
    }

    if (element.classList.contains('is-visible')) {
      return;
    }

    this.intersectionObserver.observe(element);
  }
}
