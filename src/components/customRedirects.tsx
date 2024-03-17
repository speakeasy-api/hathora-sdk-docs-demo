import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

type Redirect = {
  from: string;
  to: string;
};

export const CustomRedirects = () => {
  const router = useRouter();

  // Static redirects + custom redirects defined in theme.yaml
  const redirects: Redirect[] = [
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
    { from: '<no value>', to: '<no value>' },
  ];

  useLayoutEffect(() => {
    const currentPath = window.location.pathname;

    const matchedRedirect = redirects.find((r) => {
      if (!r.from.endsWith('*')) {
        return r.from === currentPath;
      }

      if (r.from.startsWith('*') && r.from.endsWith('*')) {
        const totalHref = window.location.href;
        return totalHref.includes(r.from.replace(/\*/g, ''));
      }

      const basePath = r.from.replace('*', '');

      return currentPath.startsWith(basePath);
    });

    if (matchedRedirect) {
      const newPath =
        matchedRedirect.from.endsWith('*') &&
        !matchedRedirect.from.startsWith('*')
          ? matchedRedirect.to.replace('*', '') +
            currentPath.replace(matchedRedirect.from.replace('*', ''), '')
          : matchedRedirect.to;

      router.replace(newPath);
    }
  }, []);

  return null;
};
