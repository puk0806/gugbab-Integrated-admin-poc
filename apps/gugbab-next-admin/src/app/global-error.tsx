'use client';

import NextError from 'next/error';
import React from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
