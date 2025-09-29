import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

interface AnimatedTerminalProps {
    typingSpeed?: number;
    startDelay?: number;
    cursor?: boolean;
    link?: { text: string; to: string };
}

const ALL_LOG_LINES = [
    'unpacking infrastructure as code …',
    'loading Kubernetes cluster …',
    'validating CI/CD pipeline templates …',
    'fetching Docker image layers …',
    'initializing Terraform state …',
    'applying Helm chart defaults …',
    'compiling Ansible playbooks …',
    'checking Vault secrets engine …',
    'updating Prometheus alert rules …',
    'pulling Jenkins pipeline definitions …',
    'synchronizing GitOps repository …',
    'optimizing container registry metadata …',
    'generating Kubernetes manifests …',
    'bootstrapping service mesh proxies …',
    'deploying monitoring dashboards …',
    'rendering Grafana panels …',
    'executing network policy tests …',
    'verifying certificate rotations …',
    'scanning container images for vulnerabilities …',
    'refreshing load balancer configurations …',
];

const shuffle = <T,>(arr: T[]): T[] =>
    [...arr].sort(() => Math.random() - 0.5);

const AnimatedTerminal: React.FC<AnimatedTerminalProps> = ({
    typingSpeed = 80,
    startDelay = 1000,
    cursor = true,
    link = { text: 'Open DevOps Build Intro →', to: '/docs/devops/build/intro' },
}) => {
    // Construct lines: install, 8 logs, success
    const lines = useMemo(() => {
        const logs = shuffle(ALL_LOG_LINES).slice(0, 8);
        return [
            'apt install --without-bad-practices devops',
            ...logs,
            '🚀 Success !',
        ];
    }, []);

    const [displayLines, setDisplayLines] = useState<string[]>([]);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const cursorRef = useRef<NodeJS.Timeout | null>(null);
    const { colorMode } = useColorMode();

    // Start typing after startDelay
    useEffect(() => {
        const timer = setTimeout(() => setHasStarted(true), startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    // Typing animation
    useEffect(() => {
        if (!hasStarted || lineIndex >= lines.length) return;

        const current = lines[lineIndex];
        // Use ultra-fast speed for logs and success
        const speed = lineIndex === 0 ? typingSpeed : 10;

        if (charIndex < current.length) {
            intervalRef.current = setTimeout(() => {
                setDisplayLines(prev => {
                    const updated = [...prev];
                    updated[lineIndex] = current.slice(0, charIndex + 1);
                    return updated;
                });
                setCharIndex(ci => ci + 1);
            }, speed);
        } else {
            // Pause then advance
            intervalRef.current = setTimeout(() => {
                setLineIndex(li => li + 1);
                setCharIndex(0);
            }, speed * 3);
        }

        return () => {
            if (intervalRef.current) clearTimeout(intervalRef.current);
        };
    }, [charIndex, hasStarted, lineIndex, lines, typingSpeed]);

    // Cursor blink
    useEffect(() => {
        if (!cursor) return;
        cursorRef.current = setInterval(() => setShowCursor(s => !s), 600);
        return () => {
            if (cursorRef.current) clearInterval(cursorRef.current);
        };
    }, [cursor]);

    return (
        <div className={styles.terminalContainer}>
            <div className={`${styles.terminal} ${styles[colorMode]}`}>
                <div className={styles.terminalHeader}>
                    <div className={styles.terminalButtons}>
                        <span className={`${styles.terminalButton} ${styles.red}`} />
                        <span className={`${styles.terminalButton} ${styles.yellow}`} />
                        <span className={`${styles.terminalButton} ${styles.green}`} />
                    </div>
                    <div className={styles.terminalTitle}>terminal</div>
                </div>
                <div className={styles.terminalBody}>
                    {displayLines.map((line, idx) => (
                        <div
                            key={idx}
                            className={
                                idx === 0
                                    ? styles.terminalLine
                                    : idx < lines.length - 1
                                        ? styles.logLine
                                        : styles.successLine
                            }
                        >
                            {idx === 0 && <span className={styles.prompt}>$</span>}
                            <span className={styles.command}>{line}</span>
                            {idx === lineIndex && showCursor && (
                                <span className={styles.cursor}>█</span>
                            )}
                        </div>
                    ))}
                    {lineIndex >= lines.length && (
                        <div className={styles.linkLine}>
                            <span className={styles.prompt}>$</span>
                            <Link to={link.to} className={styles.link}>
                                {link.text}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimatedTerminal;
