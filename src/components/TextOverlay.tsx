import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextOverlay() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    if (titleRef.current && subtitleRef.current) {
      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
      })
        .from(subtitleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.5,
        }, 0.2)
        .to([titleRef.current, subtitleRef.current], {
          opacity: 0,
          y: -50,
          duration: 0.5,
        }, 0.8);
    }

    if (section1Ref.current) {
      gsap.fromTo(
        section1Ref.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: '#scroll-container',
            start: '25% center',
            end: '35% center',
            scrub: 1,
          },
        }
      );

      gsap.to(section1Ref.current, {
        opacity: 0,
        x: 100,
        scrollTrigger: {
          trigger: '#scroll-container',
          start: '40% center',
          end: '45% center',
          scrub: 1,
        },
      });
    }

    if (section2Ref.current) {
      gsap.fromTo(
        section2Ref.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: '#scroll-container',
            start: '50% center',
            end: '60% center',
            scrub: 1,
          },
        }
      );

      gsap.to(section2Ref.current, {
        opacity: 0,
        x: -100,
        scrollTrigger: {
          trigger: '#scroll-container',
          start: '65% center',
          end: '70% center',
          scrub: 1,
        },
      });
    }

    if (section3Ref.current) {
      gsap.fromTo(
        section3Ref.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: '#scroll-container',
            start: '75% center',
            end: '85% center',
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 mb-4"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
        >
          Happy Pongal
        </h1>
        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl font-semibold text-white"
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
        >
          by randomwalk
        </p>
      </div>

      <div
        ref={section1Ref}
        className="absolute left-8 top-1/3 opacity-0"
      >
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-2xl max-w-xs">
          <h3 className="text-2xl font-bold text-orange-600 mb-2">Tradition</h3>
          <p className="text-gray-800">Celebrating the harvest festival with joy and prosperity</p>
        </div>
      </div>

      <div
        ref={section2Ref}
        className="absolute right-8 top-1/2 opacity-0"
      >
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-2xl max-w-xs">
          <h3 className="text-2xl font-bold text-red-600 mb-2">Culture</h3>
          <p className="text-gray-800">Honoring the sacred bull and the bounty of nature</p>
        </div>
      </div>

      <div
        ref={section3Ref}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-0"
      >
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-2xl shadow-2xl">
          <p className="text-white text-3xl font-bold text-center">
            Pongalo Pongal!
          </p>
        </div>
      </div>
    </div>
  );
}
