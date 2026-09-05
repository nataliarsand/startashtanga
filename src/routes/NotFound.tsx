import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { faOm, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../components/common';
import { useSEO } from '../hooks';

export default function NotFound() {
  const { t } = useTranslation('notFound');

  useSEO({ page: 'notFound', noindex: true });

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <FontAwesomeIcon
        icon={faOm}
        className="text-accent h-16 w-16 opacity-20"
      />

      <h1 className="text-heading mt-6 text-6xl font-bold">404</h1>

      <p className="text-body mt-4 text-xl">{t('title')}</p>

      <p className="text-subtle mt-2 max-w-3xl">{t('text')}</p>

      <div className="mt-8">
        <Button as="link" to="/" size="lg">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
          {t('button')}
        </Button>
      </div>
    </div>
  );
}
