import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  const { siteConfig = {} } = useDocusaurusContext();

  return (
    <Layout
      title="Welcome"
      description={siteConfig.tagline}>
      <div>
        <HeroSection />
      </div>
    </Layout>
  );
}

function HeroSection() {
  const { siteConfig = {} } = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <img
              alt={siteConfig.title}
              className={clsx(styles.heroBannerLogo, 'margin-vert--md')}
              src={useBaseUrl('img/docusaurus.svg')}
            />
            <h1 className="hero__title">DevOps Architecture</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className={clsx(
                  'button button--primary button--lg',
                  styles.getStarted,
                )}
                to="/introduction">
                Start reading&nbsp;&nbsp;→
              </Link>
            </div>
            <p className="margin-top--md">
              <em>It's completely free to read!</em>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}