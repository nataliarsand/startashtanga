import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer
      className="border-t"
      style={{ backgroundColor: '#F5EDDF', borderColor: '#DCC8AF' }}
    >
      <div className="container-main py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Tagline */}
          <p className="text-sm" style={{ color: '#753742' }}>
            {t('footer.tagline')}
          </p>

          {/* Footer links */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6">
              <li>
                <a
                  href="https://github.com/USERNAME/startashtanga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
                  style={{ color: '#753742' }}
                >
                  <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                  {t('footer.github')}
                </a>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm transition-opacity hover:opacity-80"
                  style={{ color: '#753742' }}
                >
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom line */}
        <div
          className="mt-6 border-t pt-6 text-center"
          style={{ borderColor: '#DCC8AF' }}
        >
          <p
            className="flex items-center justify-center gap-1 text-xs"
            style={{ color: '#967369' }}
          >
            {t('footer.madeWithLove')}{' '}
            <FontAwesomeIcon icon={faHeart} className="h-3 w-3 text-red-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
