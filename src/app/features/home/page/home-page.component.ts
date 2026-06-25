import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  private readonly titleText = 'Accoladi | Infinite Possibilities';
  private readonly legacyBodyClasses = ['popup-page', 'drama-page', 'recruiter-page', 'teacher-page', 'finearts-page', 'story-page'];
  private readonly cleanup: Array<() => void> = [];
  private scrollRevealObserver: IntersectionObserver | null = null;
  private reducedMotionQuery: MediaQueryList | null = null;
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly title: Title,
  ) {}

  currentYear(): number {
    return new Date().getFullYear();
  }

  ngAfterViewInit(): void {
    this.title.setTitle(this.titleText);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.resetBodyClasses();
    this.initializeHomeBehavior();
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cleanup.forEach((dispose) => dispose());
      this.cleanup.length = 0;
      this.scrollRevealObserver?.disconnect();
      this.scrollRevealObserver = null;
    }
  }

  onSearch(query: string, event?: Event): void {
    event?.preventDefault();
    if (!query.trim()) {
      return;
    }
  }

  private resetBodyClasses(): void {
    this.legacyBodyClasses.forEach((className) => document.body.classList.remove(className));
  }

  private initializeHomeBehavior(): void {
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const heroVideo = document.getElementById('heroVideo') as HTMLVideoElement | null;
    const heroSubtitle = document.getElementById('heroSubtitle');
    const revealElements = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[];
    const scrollRevealElements = Array.from(document.querySelectorAll('.reveal-on-scroll')) as HTMLElement[];

    this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateHeader = () => {
      if (!siteHeader) return;
      siteHeader.classList.toggle('scrolled', window.scrollY > 18);
    };

    const closeMobileMenu = () => {
      if (!navMenu || !menuToggle) return;
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    };
    const revealHeroContent = () => {
      window.requestAnimationFrame(() => {
        revealElements.forEach((element) => element.classList.add('is-visible'));
      });
    };

    const revealScrollContent = () => {
      if (!scrollRevealElements.length) return;

      if (this.scrollRevealObserver) {
        this.scrollRevealObserver.disconnect();
        this.scrollRevealObserver = null;
      }

      if (this.reducedMotionQuery?.matches || !('IntersectionObserver' in window)) {
        scrollRevealElements.forEach((element) => element.classList.add('is-visible'));
        return;
      }

      this.scrollRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      });

      scrollRevealElements.forEach((element) => this.scrollRevealObserver?.observe(element));
    };

    const typeHeroSubtitle = () => {
      if (!heroSubtitle) return;
      heroSubtitle.classList.remove('typing');
      heroSubtitle.classList.add('is-visible');
    };

    const startHeroMotion = () => {
      if (this.reducedMotionQuery?.matches) {
        revealElements.forEach((element) => element.classList.add('is-visible'));
        revealScrollContent();
        if (heroSubtitle) {
          heroSubtitle.classList.add('is-visible');
        }
        return;
      }

      revealHeroContent();
      typeHeroSubtitle();
      revealScrollContent();
    };

    updateHeader();
    startHeroMotion();

    const onScroll = () => updateHeader();
    const onResize = () => {
      if (window.innerWidth > 1000) {
        closeMobileMenu();
      }
    };
    const onDocumentClick = (event: MouseEvent) => {
      if (!navMenu || !menuToggle) return;
      const target = event.target as Node | null;
      const clickedInsideMenu = target ? navMenu.contains(target) : false;
      const clickedToggle = target ? menuToggle.contains(target) : false;
      if (!clickedInsideMenu && !clickedToggle) {
        closeMobileMenu();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('click', onDocumentClick);

    this.cleanup.push(() => window.removeEventListener('scroll', onScroll));
    this.cleanup.push(() => window.removeEventListener('resize', onResize));
    this.cleanup.push(() => document.removeEventListener('click', onDocumentClick));

    menuToggle?.addEventListener('click', () => {
      const isOpen = navMenu?.classList.toggle('open');
      if (!menuToggle) return;
      menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navMenu?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    this.reducedMotionQuery?.addEventListener?.('change', (event: MediaQueryListEvent) => {
      if (event.matches && heroVideo) {
        heroVideo.pause();
        revealScrollContent();
      }
    });
  }
}
