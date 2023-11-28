"use client";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export const AosInit = () => {
  useEffect(() => {
    Aos.init({
      duration: 2000,
      once: true,
      offset: 0,
    });
  }, []);

  return null;
};