import React, { useState, useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

interface AnimatedTerminalProps {
    text: string;
    typingSpeed?: number;
    startDelay?: number;
    cursor?: boolean;
}

const AnimatedTerminal: React.FC<AnimatedTerminalProps> = ({
    text,
    typingSpeed = 100,
    startDelay = 1000,
    cursor = true
}) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Get current theme mode from Docusaurus
    const { colorMode } = useColorMode();

    // Start typing after initial delay
    useEffect(() => {
        const startTimer = setTimeout(() => {
            setHasStarted(true);
        }, startDelay);

        return () => clearTimeout(startTimer);
    }, [startDelay]);

    // Typing animation
    useEffect(() => {
        if (!hasStarted) return;

        if (currentIndex < text.length) {
            intervalRef.current = setTimeout(() => {
                setDisplayText(text.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, typingSpeed);
        } else {
            setIsTypingComplete(true);
        }

        return () => {
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
            }
        };
    }, [currentIndex, text, typingSpeed, hasStarted]);

    // Cursor blinking animation
    useEffect(() => {
        if (!cursor) return;

        cursorIntervalRef.current = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 600);

        return () => {
            if (cursorIntervalRef.current) {
                clearInterval(cursorIntervalRef.current);
            }
        };
    }, [cursor]);

    return (
        <div className={styles.terminalContainer}>
            <div className={`${styles.terminal} ${styles[colorMode]}`}>
                <div className={styles.terminalHeader}>
                    <div className={styles.terminalButtons}>
                        <span className={`${styles.terminalButton} ${styles.red}`}></span>
                        <span className={`${styles.terminalButton} ${styles.yellow}`}></span>
                        <span className={`${styles.terminalButton} ${styles.green}`}></span>
                    </div>
                    <div className={styles.terminalTitle}>Terminal</div>
                </div>
                <div className={styles.terminalBody}>
                    <div className={styles.terminalLine}>
                        <span className={styles.prompt}>$</span>
                        <span className={styles.command}>{displayText}</span>
                        {cursor && showCursor && <span className={styles.cursor}>█</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedTerminal;
