import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Barracade',
    short_name: 'Barracade',
    description: 'Desktop security software for apps and websites.',
    start_url: '/',
    display: 'browser',
    background_color: '#050505',
    theme_color: '#050505',
    icons: [
      {
        src: '/no-backround-icon.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
