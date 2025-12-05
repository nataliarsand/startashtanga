import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

interface MapEmbedProps {
  title?: string;
  className?: string;
}

export default function MapEmbed({
  title = 'Map',
  className = '',
}: MapEmbedProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`group relative w-full transition-all duration-300 ease-in-out ${
        isExpanded ? 'h-[70vh]' : 'h-48 md:h-56'
      } ${className}`}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50000000!2d10!3d20!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDAwJzAwLjAiTiAxMMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sus!4v1"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-white/90 text-heading hover:bg-white absolute bottom-4 right-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium shadow-md transition-all hover:shadow-lg"
        aria-label={isExpanded ? 'Collapse map' : 'Expand map'}
      >
        <FontAwesomeIcon
          icon={isExpanded ? faCompress : faExpand}
          className="h-4 w-4"
        />
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
    </div>
  );
}
