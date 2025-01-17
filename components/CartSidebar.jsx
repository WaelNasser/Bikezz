"use client";
import CartItem from "./CartItem";
import CheckoutBtn from "./CheckoutBtn";
import { useShoppingCart } from "use-shopping-cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

import { ScrollArea } from "./ui/scroll-area";

const CartSidebar = () => {
  const {
    cartCount,
    cartDetails,
    shouldDisplayCart,
    handleCartClick,
    totalPrice,
  } = useShoppingCart();
  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="mb-6">
        <SheetHeader>
          <SheetTitle className="mb-12">
            My Shopping Cart ({cartCount})
          </SheetTitle>
        </SheetHeader>
        <>
          {cartCount === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h5 className="text-black/50">Your cart is empty</h5>
            </div>
          ) : (
            <ScrollArea className="h-[68vh] xl:h-[70vh] pr-4 mb-4">
              {cartDetails &&
                Object.entries(cartDetails).map(([key, item]) => {
                  return <CartItem key={key} item={item} />;
                })}
            </ScrollArea>
          )}
        </>
        {cartCount > 0 && (
          <div className="mb-4">
            <div className="flex justify-between font-semibold">
              <div className="uppercase mb-5">Total</div>
              <div className="text-lg">${totalPrice}</div>
            </div>
            <CheckoutBtn />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
