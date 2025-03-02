'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import IconAnimated from './components/IconAnimated';
import IAmProgrammerSection from './components/IAmProgrammerSection';
import ExperienceSection from './components/ExperienceSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ScrollAnimation = () => {
  useGSAP(() => {
    const panels: HTMLElement[] = gsap.utils.toArray('.panel');
    let observer: ReturnType<typeof ScrollTrigger.normalizeScroll> | undefined;
    let scrollTween: gsap.core.Tween | undefined;

    // Enable normalizeScroll for touch devices
    if (ScrollTrigger.isTouch === 1) {
      observer = ScrollTrigger.normalizeScroll(true);
    }

    function goToSection(i: number) {
      if (scrollTween) return;

      scrollTween = gsap.to(window, {
        scrollTo: { y: i * window.innerHeight, autoKill: false },
        onStart: () => {
          if (!observer) return;
          observer.disable(); // Disable observer during forced scroll
          observer.enable();
        },
        duration: 1.5,
        onComplete: () => (scrollTween = undefined),
        overwrite: true,
      });
    }

    panels.forEach((panel: HTMLElement, i: number) => {
      ScrollTrigger.create({
        trigger: panel, // Explicitly typed as HTMLElement
        start: 'top bottom-=10%',
        end: 'bottom top+=10%',
        // markers: true, // Enable markers for debugging
        onEnter: () => !scrollTween && goToSection(i),
        onEnterBack: () => !scrollTween && goToSection(i),
      });
    });
  }, []);

  return (
    <div>
      <div className="panel">
        <IAmProgrammerSection />
      </div>
      <div className="panel">
        <IconAnimated />
      </div>
      <div className="panel">
        <ExperienceSection />
      </div>
    </div>
  );
};

export default ScrollAnimation;