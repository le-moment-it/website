import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AnimatedTerminal from '../components/AnimatedTerminal';
import styles from './index.module.css';

export default function Home() {
  const { siteConfig = {} } = useDocusaurusContext();

  return (
    <Layout
      title="Welcome"
      description={siteConfig.tagline}
    >
      <main className={styles.main}>
        <AnimatedTerminal
          text="apt install --without-bad-practices devops"
          typingSpeed={80}
          startDelay={1000}
          cursor
        />
      </main>
    </Layout>
  );
}
