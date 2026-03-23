import { cn } from '@/lib/utils';
import { ImgHTMLAttributes } from 'react';

type ProjectLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export default function ProjectLogo({ className, alt = 'Transport Operations Software logo', ...props }: ProjectLogoProps) {
    return <img src="/assets/images/Logo.svg" alt={alt} className={cn('h-auto w-16', className)} {...props} />;
}
