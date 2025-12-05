import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

interface DonateButtonProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function DonateButton({ size = 'md' }: DonateButtonProps) {
  // TODO: Unhide when ready to accept donations
  const isHidden = true;

  if (isHidden) return null;

  return (
    <Button
      as="a"
      href="https://www.paypal.com/donate/?hosted_button_id=L4FNL6FVJPRUJ"
      target="_blank"
      rel="noopener noreferrer"
      variant="donate"
      size={size}
      trackingName="donate"
    >
      <FontAwesomeIcon icon={faHeart} className="mr-2 h-4 w-4" />
      Donate
    </Button>
  );
}
