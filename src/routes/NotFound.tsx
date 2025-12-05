import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../components/common';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found | Start Ashtanga';
    // Tell search engines not to index this page
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (robotsMeta) {
      robotsMeta.content = 'noindex, nofollow';
    }
    return () => {
      if (robotsMeta) {
        robotsMeta.content = 'index, follow';
      }
    };
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <FontAwesomeIcon icon={faOm} className="text-accent h-16 w-16 opacity-20" />

      <h1 className="text-heading mt-6 text-6xl font-bold">404</h1>

      <p className="text-body mt-4 text-xl">
        This page has gone to Mysore
      </p>

      <p className="text-subtle mt-2 max-w-md">
        Like a challenging asana, this page seems to be beyond our current practice.
        Perhaps it's time to return to the beginning of the sequence.
      </p>

      <div className="mt-8">
        <Button as="link" to="/" size="lg" trackingName="404_back_home">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
