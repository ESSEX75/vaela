import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn } from '@/utils';

interface IProps {
  src?: string | null;
  alt: string;
  isVideo?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

const isVideoUrl = (url: string) => {
  const extension = url.split('.').pop()?.toLowerCase();
  return ['mp4', 'webm', 'ogg', 'mov'].includes(extension || '');
};

export function ShowcaseMedia({
  src,
  alt,
  isVideo: isVideoProp,
  className,
  sizes = '100vw',
  priority = false,
}: IProps) {
  const t = useTranslations('product');
  const isVideo = isVideoProp || (src ? isVideoUrl(src) : false);

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-gray-900',
        className,
      )}
    >
      {src ? (
        isVideo ? (
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/poster.avif"
            preload="auto"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes={sizes}
          />
        )
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100">
          <span className="text-gray-400">{t('noImage')}</span>
        </div>
      )}
    </div>
  );
}
