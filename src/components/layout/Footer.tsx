import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { siteConfig } from '../../config/site';
import { DonateButton } from '../common';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="border-default bg-surface border-t">
      <div className="container-main py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Tagline */}
          <p className="text-body text-sm">
            {t('footer.tagline')}
          </p>

          {/* Footer links */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
                >
                  <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                  {t('footer.github')}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-sm transition-opacity hover:opacity-80"
                >
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <DonateButton size="sm" />
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom line */}
        <div className="border-default mt-6 border-t pt-6 text-center">
          <p className="text-subtle flex items-center justify-center gap-1 text-xs">
            {t('footer.madeWithLove')}{' '}
            <FontAwesomeIcon icon={faHeart} className="h-3 w-3 text-red-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
