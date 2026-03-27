import Image from 'next/image';
import { cn } from '@/lib/cn';

interface ScreenshotFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  /** CSS object-position for zoom/crop focus, e.g. "top left", "center 30%" */
  focus?: string;
  /** Zoom scale factor, e.g. 1.8 to zoom in 1.8x */
  zoom?: number;
  /** Fixed height for the cropped view */
  cropHeight?: number;
}

export function ScreenshotFrame({ src, alt, width, height, className, priority, focus, zoom, cropHeight }: ScreenshotFrameProps) {
  const isZoomed = zoom && zoom > 1;

  return (
    <div
      className={cn(
        'rounded-lg border border-white/[0.04] bg-[#080808] overflow-hidden group',
        className,
      )}
      style={cropHeight ? { height: cropHeight } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'w-full transition-transform duration-700 ease-out',
          isZoomed ? 'object-cover h-full' : 'h-auto',
          isZoomed && 'group-hover:scale-[1.02]',
        )}
        style={{
          ...(isZoomed ? { transform: `scale(${zoom})`, transformOrigin: focus || 'center' } : {}),
          ...(focus && !isZoomed ? { objectPosition: focus, objectFit: 'cover' as const } : {}),
        }}
        priority={priority}
        quality={95}
      />
    </div>
  );
}
