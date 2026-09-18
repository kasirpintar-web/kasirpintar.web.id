import { useEffect } from 'react';

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function PageSEO({ title, description, path, image }: PageSEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | Logis Denis Prabowo`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', `https://kasirpintar.web.id${path}`, true);
    if (image) {
      setMeta('og:image', image, true);
      setMeta('twitter:image', image);
    }
  }, [title, description, path, image]);

  return null;
}
