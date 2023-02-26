type TypographySkeletonType = {
  variant: 'h1' | 'h2' | 'h3' | 'p'
  size?: undefined
}

type FigureSkeletonType = {
  variant: 'rectangle'
  size: 'sm' | 'md' | 'lg'
}

type Props = TypographySkeletonType | FigureSkeletonType

export const Skeleton = ({ variant, size }: Props) => {
  switch (variant) {
    case 'h1':
      return <h1 role="status" className={`h-9 ${skeletonClasses}`} />
    case 'h2':
      return <h2 role="status" className={`h-8 ${skeletonClasses}`} />
    case 'h3':
      return <h3 role="status" className={`h-7 ${skeletonClasses}`} />
    case 'p':
      return <p role="status" className={`h-6 ${skeletonClasses}`} />
    case 'rectangle':
      return <div role="status" className={`${sizeClasses[size]} ${skeletonClasses}`} />
  }
}

const skeletonClasses = 'w-full bg-white bg-opacity-10 rounded-lg animate-pulse'

const sizeClasses = {
  sm: 'h-16',
  md: 'h-24',
  lg: 'h-32',
}
