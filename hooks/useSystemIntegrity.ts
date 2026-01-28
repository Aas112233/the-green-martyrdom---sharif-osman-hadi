import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Obfuscated strings to prevent easy searching
// Obfuscated strings to prevent easy searching
const _0x1a2b = ["TWFobW91ZCBIYXNzYW4gVG9oYQ==", "U2hhaGlkIFNoYXJpZiBVc21hbiBIYWRp", "TWFobXVk"];
// Indices: 0: Dev Name, 1: Collab Name, 2: Rights Name

// Decoder function
const _d = (s: string) => atob(s);

export const useSystemIntegrity = () => {
    const [isCompromised, setIsCompromised] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const checkIntegrity = () => {
            try {
                // 1. Context Value Check (Data Layer)
                const v1 = t('footer.dev.name');
                const v2 = t('footer.collab.name');
                const v3 = t('footer.rights.name');

                const validDev = [_d(_0x1a2b[0]), "মাহমুদ হাসান তোহা"];
                const validCollab = [_d(_0x1a2b[1]), "শহীদ শরীফ ওসমান হাদি"];
                const validRights = [_d(_0x1a2b[2]), "মাহমুদ"];

                const isDevSafe = validDev.includes(v1);
                const isCollabSafe = validCollab.includes(v2);
                const isRightsSafe = validRights.includes(v3);

                // 2. DOM Content Check (Visual Layer)
                // Verify that at least one version of the names matches what's on screen.
                // We use textContent/innerText validation.
                const pageContent = document.body.innerText || "";

                // Check if Dev Name is present (En or Bn)
                const isDevVisible = validDev.some(name => pageContent.includes(name));

                // Check if Collab Name is present (En or Bn)
                const isCollabVisible = validCollab.some(name => pageContent.includes(name));

                // Check if Rights Name is present (En or Bn)
                // We are slightly more lenient with rights name as it might be 'Mahmud' which is short,
                // but it must be there.
                const isRightsVisible = validRights.some(name => pageContent.includes(name));

                // Combine checks: Data must be correct AND Visuals must be correct
                if (!isDevSafe || !isCollabSafe || !isRightsSafe || !isDevVisible || !isCollabVisible || !isRightsVisible) {
                    // Double check for DOM: sometimes rendering takes a split second. 
                    // If context is safe but DOM is missing, we might be in a loading state?
                    // However, this hook runs periodically. If it persistently fails, it's a breach.
                    // To be safe against race conditions (checking before render), we could rely on the periodic check
                    // rather than instantly locking on the *first* mount if the footer hasn't rendered yet.
                    // But useEffect runs after render.

                    // We'll allow a tiny grace period if needed, but for 'security' immediate lock is better.
                    // If 'isDevSafe' (context) is true, but DOM is false, it means they are hiding it or hardcoding something else.

                    // Exception: If the user is on a page WITHOUT the footer? 
                    // The footer is in App.tsx, so it's always there.

                    setIsCompromised(true);
                }
            } catch (e) {
                // If keys are missing (deleted), t() returns key name, so checks will fail -> locked.
                setIsCompromised(true);
            }
        };

        // Initial check
        checkIntegrity();

        // Periodic check every 2 seconds to detect runtime tampering (e.g. variable injection)
        const interval = setInterval(checkIntegrity, 2000);
        return () => clearInterval(interval);
    }, [t]);

    return { isCompromised };
};

