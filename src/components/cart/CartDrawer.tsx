'use client';

import { FiShoppingBag } from 'react-icons/fi';
import { useCartStore } from '@/store/useCartStore';
import { useModalStore } from '@/store/useModalStore';
import { CartItem } from './CartItem';
import { useLocale, useTranslations } from 'next-intl';
import { Price } from '@/components/ui/Price';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui';

export function CartDrawer() {
  const { isOpen, closeCart, items, clearCart } = useCartStore();
  const { addModal } = useModalStore();
  const t = useTranslations('cart');
  const tCheckout = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    addModal(tCheckout('checkoutSuccess'), 'success');
    clearCart();
    closeCart();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeCart}
      title={t('shoppingCart')}
      overlayClassName="bg-white/30"
      footer={
        items.length > 0 ? (
          <div className="flex flex-col gap-4">
            {/* Итоговая сумма */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>{t('subtotal')}</p>
                <Price amount={totalPrice} />
              </div>
              <p className="text-sm text-gray-500">{t('shippingNote')}</p>
            </div>

            {/* Кнопка оформления заказа */}
            <Button
              onClick={handleCheckout}
              variant="primary"
              size="md"
              fullWidth
              className="px-6 shadow-sm"
            >
              {tCheckout('checkout')}
            </Button>

            {/* Ссылка продолжить покупки */}
            <div className="flex justify-center text-center text-sm text-gray-500">
              <Button type="button" variant="ghost" onClick={closeCart}>
                {tCommon('continueShopping')}
                <span aria-hidden="true"> &rarr;</span>
              </Button>
            </div>
          </div>
        ) : null
      }
    >
      <div className="flow-root">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            {/* Иконка корзины */}
            <FiShoppingBag className="mb-4 h-12 w-12 text-gray-300" />

            {/* Текст пустой корзины */}
            <p className="text-gray-500">{t('emptyCart')}</p>

            {/* Кнопка продолжить покупки */}
            <Button
              onClick={closeCart}
              variant="ghost"
              className="mt-4 text-sm"
            >
              {tCommon('continueShopping')}
              <span aria-hidden="true"> &rarr;</span>
            </Button>
          </div>
        ) : (
          <ul role="list" className="flex flex-col gap-6">
            {/* Элементы корзины */}
            {items.map(item => (
              <li key={item.itemKey}>
                <CartItem item={item} locale={locale} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Drawer>
  );
}
