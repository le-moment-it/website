// src/components/AnimatedTerminal/index.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

interface AnimatedTerminalProps {
    lines: string[];
    typingSpeed?: number;
    startDelay?: number;
    cursor?: boolean;
    link?: { text: string; to: string };
}

const AnimatedTerminal: React.FC<AnimatedTerminalProps> = ({
    lines,
    typingSpeed = 100,
    startDelay = 1000,
    cursor = true,
    link,
}) => {
    const [displayLines, setDisplayLines] = useState<string[]>([]);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const cursorRef = useRef<NodeJS.Timeout | null>(null);
    const { colorMode } = useColorMode();

    useEffect(() => {
        const timer = setTimeout(() => setHasStarted(true), startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    useEffect(() => {
        if (!hasStarted || lineIndex >= lines.length) return;
        const current = lines[lineIndex];
        if (charIndex < current.length) {
            intervalRef.current = setTimeout(() => {
                setDisplayLines(prev => {
                    const updated = [...prev];
                    updated[lineIndex] = current.slice(0, charIndex + 1);
                    return updated;
                });
                setCharIndex(c => c + 1);
            }, typingSpeed);
        } else {
            intervalRef.current = setTimeout(() => {
                setLineIndex(i => i + 1);
                setCharIndex(0);
            }, typingSpeed * 5);
        }
        return () => {
            if (intervalRef.current) clearTimeout(intervalRef.current);
        };
    }, [charIndex, hasStarted, lineIndex, lines, typingSpeed]);

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
                        <div key={idx} className={styles.terminalLine}>
                            <span className={styles.prompt}>$</span>
                            <span className={styles.command}>{line}</span>
                            {idx === lineIndex && showCursor && <span className={styles.cursor}>█</span>}
                        </div>
                    ))}
                    {lineIndex >= lines.length && link && (
                        <div className={styles.linkLine}>
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
