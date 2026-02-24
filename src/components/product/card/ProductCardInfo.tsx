import { Price } from '@/components/ui/Price';
import { Title } from '@/components/ui/Title';

interface IProps {
  name: string;
  price: number;
}

export function ProductCardInfo({ name, price }: IProps) {
  return (
    <div className="flex items-start justify-between">
      <Title as="h2" className="font-semibold md:text-xs">
        {name}
      </Title>

      <Price amount={price} className="text-sm text-black md:text-xs" />
    </div>
  );
}
