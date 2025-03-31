'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import AnimatedIconSection from './components/AnimatedIconSection';
import ProgrammerSection from './components/ProgrammerIntro';
import ExperienceSection from './components/ExperienceSection';
import Background from "./components/Background"
import ContactMe from "./components/ContactMe"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ScrollAnimation = () => {
  useGSAP(() => {
    const panels: HTMLElement[] = gsap.utils.toArray('.panel');
    let observer: ReturnType<typeof ScrollTrigger.normalizeScroll> | undefined;
    let scrollTween: gsap.core.Tween | undefined;

    if (ScrollTrigger.isTouch === 1) {
      observer = ScrollTrigger.normalizeScroll(true);
    }

    function goToSection(i: number) {
      if (scrollTween) return;
// 0 1 2 3
//len 4
      scrollTween = gsap.to(window, {
        scrollTo: { y: i < panels.length - 1 ? i * window.innerHeight : i * window.innerHeight + 1, autoKill: false },
        onStart: () => {
          if (!observer) return;
          observer.disable();
          observer.enable();
        },
        duration: 1.5,
        onComplete: () => (scrollTween = undefined),
        overwrite: true,
      });
    }

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel, // Explicitly typed as HTMLElement
        start: 'top bottom-=1',
        end: 'bottom top+=1',
        onEnter: () => !scrollTween && goToSection(i),
        onEnterBack: () => !scrollTween && goToSection(i),
      });
    });
  }, []);

  return (
    <div className="relative">
      <Background />
      <title>Gilbert Chuardi</title>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="panel">
          <ProgrammerSection />
        </div>
        <div className="panel">
          <AnimatedIconSection />
        </div>
        <div className="panel">
          <ExperienceSection />
        </div>
        <div className="panel">
          <ContactMe />
        </div>
      </div>
    </div>
  );
};

export default ScrollAnimation;