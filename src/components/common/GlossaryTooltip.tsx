import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface GlossaryTerm {
  term: string;
  sanskrit?: string;
  definition: string;
}

interface GlossaryTooltipProps {
  term: string;
  children?: React.ReactNode;
}

export default function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const { t } = useTranslation('glossary');
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const [horizontalPosition, setHorizontalPosition] = useState<'center' | 'left' | 'right'>('center');
  const containerRef = useRef<HTMLSpanElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouchDevice = useRef(false);

  const terms = t('terms', { returnObjects: true }) as GlossaryTerm[];
  const glossaryEntry = terms.find(
    (entry) => entry.term.toLowerCase() === term.toLowerCase()
  );

  const showTooltip = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsVisible(true);
  };

  const hideTooltip = () => {
    // Small delay to allow moving mouse to tooltip
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 150);
  };

  const handleTouchStart = () => {
    isTouchDevice.current = true;
  };

  const handleClick = (e: React.MouseEvent) => {
    // Skip click handling on touch devices - touchend already handled it
    if (isTouchDevice.current) {
      isTouchDevice.current = false;
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setIsVisible((prev) => !prev);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible((prev) => !prev);
  };

  // Close tooltip when clicking outside on mobile
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isVisible]);

  // Use useLayoutEffect to calculate position synchronously before paint
  // This is a legitimate use case for measuring DOM and updating position
  useLayoutEffect(() => {
    if (isVisible && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const tooltipWidth = 256; // w-64 = 16rem = 256px
      const padding = 16; // minimum padding from viewport edge

      // Vertical positioning
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPosition(spaceAbove < 120 ? 'bottom' : 'top');

      // Horizontal positioning - check if tooltip would overflow viewport
      const triggerCenter = rect.left + rect.width / 2;
      const leftEdge = triggerCenter - tooltipWidth / 2;
      const rightEdge = triggerCenter + tooltipWidth / 2;

      if (leftEdge < padding) {
        // Would overflow left side - align to left
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHorizontalPosition('left');
      } else if (rightEdge > window.innerWidth - padding) {
        // Would overflow right side - align to right
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHorizontalPosition('right');
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHorizontalPosition('center');
      }
    }
  }, [isVisible]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  if (!glossaryEntry) {
    return <span>{children || term}</span>;
  }

  return (
    <span
      ref={containerRef}
      className="relative inline"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      <span
        className="border-accent cursor-help border-b border-dotted transition-colors"
        onFocus={showTooltip}
        onBlur={hideTooltip}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        tabIndex={0}
        role="button"
        aria-describedby={`tooltip-${term}`}
        aria-expanded={isVisible}
      >
        {children || term}
      </span>

      {isVisible && (
        <div
          id={`tooltip-${term}`}
          role="tooltip"
          className={`bg-emphasis absolute z-50 w-64 rounded-lg p-3 shadow-lg ${
            position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          } ${
            horizontalPosition === 'center'
              ? 'left-1/2 -translate-x-1/2'
              : horizontalPosition === 'left'
                ? 'left-0'
                : 'right-0'
          }`}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {/* Arrow */}
          <div
            className={`bg-emphasis absolute h-2 w-2 rotate-45 ${
              position === 'top' ? '-bottom-1' : '-top-1'
            } ${
              horizontalPosition === 'center'
                ? 'left-1/2 -translate-x-1/2'
                : horizontalPosition === 'left'
                  ? 'left-4'
                  : 'right-4'
            }`}
          />

          <div className="relative">
            <p className="text-sm font-semibold text-white">
              {glossaryEntry.term}
              {glossaryEntry.sanskrit && (
                <span className="ml-2 font-normal opacity-70">
                  {glossaryEntry.sanskrit}
                </span>
              )}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/80">
              {glossaryEntry.definition.length > 150
                ? `${glossaryEntry.definition.slice(0, 150)}...`
                : glossaryEntry.definition}
            </p>
            <Link
              to="/glossary"
              className="text-link-on-dark mt-2 inline-block text-xs transition-opacity hover:opacity-80 focus:underline focus:outline-none"
            >
              View in glossary →
            </Link>
          </div>
        </div>
      )}
    </span>
  );
}
