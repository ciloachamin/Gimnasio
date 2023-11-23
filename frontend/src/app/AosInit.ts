"use client";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export const AosInit = () => {
  useEffect(() => {
    Aos.init({
      duration: 2500,
      delay: 400,
      once: true,
      offset: 0,
    });
  }, []);

  return null;
};