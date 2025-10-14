import { useEffect } from 'react';

export default function MTSMockup() {
  useEffect(() => {
    // Redirect to the static HTML file
    window.location.href = '/mts-mockup/index.html';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Redirecting to MTS Mockup...</p>
        <a 
          href="/mts-mockup/index.html" 
          className="text-primary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here if you're not redirected automatically
        </a>
      </div>
    </div>
  );
}
