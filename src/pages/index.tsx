import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import AnimatedTerminal from '../components/AnimatedTerminal';

export default function Home() {
  const { siteConfig = {} } = useDocusaurusContext();

  return (
    <Layout
      title="Welcome"
      description={siteConfig.tagline}
    >
      <HeroSection />
      <main>
        <TerminalSection />
        {/* Add other sections here as needed */}
      </main>
    </Layout>
  );
}

function HeroSection() {
  const { siteConfig = {} } = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function TerminalSection() {
  return (
    <section className={styles.terminalSection}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <AnimatedTerminal
              text="Welcome to Le Moment IT - DevOps the Good way !"
              typingSpeed={80}
              startDelay={1500}
              cursor={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
