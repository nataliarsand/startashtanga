import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { GlossaryTerm } from '../../types/glossary';

interface GlossaryTooltipProps {
  term: string;
  children?: React.ReactNode;
}

type Placement = {
  vertical: 'top' | 'bottom';
  horizontal: 'center' | 'left' | 'right';
};

const TOOLTIP_WIDTH = 256; // matches w-64
const VIEWPORT_PADDING = 16;
const MIN_SPACE_ABOVE = 120;

function measurePlacement(trigger: HTMLElement): Placement {
  const rect = trigger.getBoundingClientRect();
  const triggerCenter = rect.left + rect.width / 2;
  const leftEdge = triggerCenter - TOOLTIP_WIDTH / 2;
  const rightEdge = triggerCenter + TOOLTIP_WIDTH / 2;

  let horizontal: Placement['horizontal'] = 'center';
  if (leftEdge < VIEWPORT_PADDING) horizontal = 'left';
  else if (rightEdge > window.innerWidth - VIEWPORT_PADDING)
    horizontal = 'right';

  return {
    vertical: rect.top < MIN_SPACE_ABOVE ? 'bottom' : 'top',
    horizontal,
  };
}

export default function GlossaryTooltip({
  term,
  children,
}: GlossaryTooltipProps) {
  const { t } = useTranslation('glossary');
  const [isVisible, setIsVisible] = useState(false);
  const [placement, setPlacement] = useState<Placement>({
    vertical: 'top',
    horizontal: 'center',
  });
  const containerRef = useRef<HTMLSpanElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouchDevice = useRef(false);

  const terms = t('terms', { returnObjects: true }) as GlossaryTerm[];
  const glossaryEntry = terms.find(
    (entry) => entry.term.toLowerCase() === term.toLowerCase()
  );

  // Placement is measured when opening, so the tooltip never renders in the wrong spot first
  const open = () => {
    if (containerRef.current) {
      setPlacement(measurePlacement(containerRef.current));
    }
    setIsVisible(true);
  };

  const toggle = () => {
    if (isVisible) setIsVisible(false);
    else open();
  };

  const showTooltip = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    open();
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
    toggle();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  };

  // Close tooltip when clicking outside on mobile
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
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
            placement.vertical === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          } ${
            placement.horizontal === 'center'
              ? 'left-1/2 -translate-x-1/2'
              : placement.horizontal === 'left'
                ? 'left-0'
                : 'right-0'
          }`}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {/* Arrow */}
          <div
            className={`bg-emphasis absolute h-2 w-2 rotate-45 ${
              placement.vertical === 'top' ? '-bottom-1' : '-top-1'
            } ${
              placement.horizontal === 'center'
                ? 'left-1/2 -translate-x-1/2'
                : placement.horizontal === 'left'
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
              {t('tooltip.viewInGlossary')}
            </Link>
          </div>
        </div>
      )}
    </span>
  );
}
