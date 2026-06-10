import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (callback, dependencies = []) => {
  const rootRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(callback, rootRef.current);
    return () => ctx.revert();
  }, dependencies);

  return rootRef;
};
