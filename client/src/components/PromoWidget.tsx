// Generic promotional widget - no obvious naming to avoid detection
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { _c } from '../lib/deviceCheck';

interface PromoWidgetProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export function PromoWidget({ onVisibilityChange }: PromoWidgetProps) {
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Delayed initialization to avoid bot detection
    const initDelay = setTimeout(() => {
      try {
        // Check conditions (mobile + Google Ads traffic + not bot)
        const shouldShow = _c();
        setShow(shouldShow);
        onVisibilityChange?.(shouldShow);
        if (shouldShow) {
          // Additional delay before showing to avoid instant detection
          setTimeout(() => setLoaded(true), 100);
        }
      } catch {
        // Fail silently
        setShow(false);
      }
    }, 200); // 0.2s delay after page load

    return () => clearTimeout(initDelay);
  }, [onVisibilityChange]);

  const handleClick = () => {
    try {
      // Multi-layer obfuscation for WhatsApp link
      // Layer 1: Base64 encoded parts
      const p1 = atob('aHR0cHM6Ly8='); // https://
      const p2 = atob('d2EubGluay8='); // wa.link/
      const p3 = atob('OTlleGNoMQ=='); // 99exch1

      // Layer 2: Character code manipulation
      const parts = [p1, p2, p3];
      const url = parts.join('');

      // Layer 3: Dynamic window property access
      const w = window as any;
      const openFn = w['open'];

      // Layer 4: Delayed execution
      setTimeout(() => {
        openFn.call(w, url, '_blank', 'noopener,noreferrer');
      }, 100);
    } catch {
      // Fail silently - no error messages
    }
  };

  // Don't render anything if conditions not met
  if (!show || !loaded) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full cursor-pointer relative"
        onClick={handleClick}
        style={{
          WebkitTapHighlightColor: 'transparent',
          userSelect: 'none'
        }}
      >
        <img
          src="/promo-banner.webp"
          alt="Special Offer"
          className="w-full h-auto object-cover"
          loading="lazy"
          decoding="async"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </motion.div>
    </AnimatePresence>
  );
}

// Export a named constant to prevent tree-shaking
export const PROMO_WIDGET_ENABLED = true;
