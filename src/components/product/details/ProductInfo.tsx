import { BsStarFill } from 'react-icons/bs';
import { Price } from '@/components/ui/Price';
import { Title } from '@/components/ui/Title';

interface IProps {
  name: string;
  price: number;
  rate: number;
  description: string;
}

export function ProductInfo({ name, price, rate, description }: IProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Title
          as="h1"
          size="hero"
          className="tracking-tight text-gray-900 sm:text-4xl"
        >
          {name}
        </Title>

        <div className="flex items-center gap-4">
          <p className="text-2xl font-medium tracking-tight text-gray-900">
            <Price amount={price} />
          </p>

          <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1">
            <BsStarFill className="h-3.5 w-3.5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">
              {rate} <span className="text-gray-400">/ 5</span>
            </span>
          </div>
        </div>
      </div>

      <div className="prose prose-sm text-gray-500">
        <p className="text-base leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
}
