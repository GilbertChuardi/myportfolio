'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import IconAnimated from './components/IconAnimated'
import IAmProgrammerSection from './components/IAmProgrammerSection'
import ExperienceSection from './components/ExperienceSection'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ScrollAnimation = () => {
  useGSAP(() => {
    // Explicitly type the panels array
    const panels: HTMLElement[] = gsap.utils.toArray('.panel');
    let observer: ReturnType<typeof ScrollTrigger.normalizeScroll> | undefined;
    let scrollTween: gsap.core.Tween | undefined;

    // Enable normalizeScroll for touch devices
    if (ScrollTrigger.isTouch === 1) {
      observer = ScrollTrigger.normalizeScroll(true);
    }

    // Function to scroll to a specific section
    function goToSection(i: number) {
      if (scrollTween) return; // If a tween is already running, do nothing
      scrollTween = gsap.to(window, {
        scrollTo: { y: i * window.innerHeight, autoKill: false },
        onStart: () => {
          if (!observer) return;
          observer.disable(); // Disable observer during forced scroll
          observer.enable();
        },
        duration: 1,
        onComplete: () => (scrollTween = undefined),
        overwrite: true,
      });
    }

    // Create ScrollTriggers for each panel
    panels.forEach((panel: HTMLElement, i: number) => {
      ScrollTrigger.create({
        trigger: panel, // Explicitly typed as HTMLElement
        start: 'top bottom-=10%', // Adjust start position to trigger earlier
        end: 'bottom top+=10%', // Adjust end position to trigger earlier
        markers: true, // Enable markers for debugging
        onEnter: () => !scrollTween && goToSection(i), // Only trigger on enter
        onEnterBack: () => !scrollTween && goToSection(i), // Only trigger on enter back
      });
    });

    // Add snapping behavior for smooth scrolling
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      snap: 1 / (panels.length - 1),
    });
  }, []);

  return (
    <div>
      {/* Your panels go here */}
      <div className="panel">
        <IAmProgrammerSection />
      </div>
      <div className="panel">
        <IconAnimated />
      </div>
      <div className="panel">
        <ExperienceSection />
      </div>
      {/* Add more panels as needed */}
    </div>
  );
};

export default ScrollAnimation;