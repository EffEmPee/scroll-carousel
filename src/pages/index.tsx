/* eslint-disable consistent-return */
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState, WheelEventHandler } from 'react';

import { motion, useIsomorphicLayoutEffect, useTransform } from 'framer-motion';

import { CarouselContainer, Container } from '../styles/pages/Home';

// sections and necessary information
const sections = [
  {
    title: 'Section 1',
    color: '#313715'
  },
  {
    title: 'Section 2',
    color: '#D16014'
  },
  {
    title: 'Section 3',
    color: '#939F5C'
  },
  {
    title: 'Section 4',
    color: '#84828F'
  }
];

const Home: NextPage = () => {
  const ref = useRef<HTMLUListElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const buffer = 300;

  const [tops, setTops] = useState([0]);

  // get the container full height
  useIsomorphicLayoutEffect(() => {
    const container = ref.current;

    if (!container) return;

    const onResize = () => {
      setContainerHeight(container.offsetHeight);
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const startBuffer = () => {
    setIsScrolling(true);
    const timeout = setTimeout(() => setIsScrolling(false), buffer);
  };

  const nextSection = () => {
    const next = activeSection + 1;
    setActiveSection(next === sections.length ? activeSection : next);
  };

  const prevSection = () => {
    const prev = activeSection - 1;
    setActiveSection(prev === -1 ? activeSection : prev);
  };

  const onWheel = (event: WheelEvent) => {
    if (isScrolling) return;
    if (event.deltaY > 0) {
      nextSection();
    } else {
      prevSection();
    }
    startBuffer();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (isScrolling) return;
    if (event.key === 'ArrowDown') {
      nextSection();
    } else if (event.key === 'ArrowUp') {
      prevSection();
    }
    startBuffer();
  };

  return (
    <Container>
      <Head>
        <title>Scroll Carousel</title>
      </Head>

      <CarouselContainer
        ref={ref}
        tabIndex={0}
        onWheel={onWheel as any}
        onKeyDown={onKeyDown as any}
      >
        {sections.map((section, index) => (
          <motion.li
            style={{ backgroundColor: section.color }}
            animate={{
              top: activeSection >= index ? 0 : containerHeight * 2
              // scale: activeSection >= index ? 1 : 1
              // scaleX: activeSection >= index ? 1 : 0.1
            }}
            transition={{ type: 'easeInOut', duration: 0.8 }}
          >
            <h1>{section.title}</h1>
          </motion.li>
        ))}
      </CarouselContainer>
    </Container>
  );
};

export default Home;
