"use client";
import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useToast } from "@/hooks/use-toast";

const AddToCartBtn = ({
  btnStyle,
  text,
  icon,
  currency,
  name,
  description,
  price,
  images,
  id,
}) => {
  const { toast } = useToast();

  const { addItem } = useShoppingCart();

  const bike = {
    id: id,
    currency: currency,
    name: name,
    description: description,
    price: price,
    images: images,
  };

  return (
    <button
      className={`${btnStyle}`}
      onClick={() => {
        addItem(bike);
        toast({
          title: `${name} has been added to cart`,
        });
      }}
    >
      <div>{text}</div>
      <div>{icon}</div>
    </button>
  );
};

export default AddToCartBtn;
