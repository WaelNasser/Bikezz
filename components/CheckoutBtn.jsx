"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useShoppingCart } from "use-shopping-cart";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";

const CheckoutBtn = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { toast } = useToast();
  const { clearCart } = useShoppingCart();

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardNumberRegex = /^(\d{4} ){3}\d{4}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!cardNumber || !cardNumberRegex.test(cardNumber)) {
      alert("Please enter a valid card number (16 digits with spaces).");
      return false;
    }

    if (!expiryDate || !expiryDateRegex.test(expiryDate)) {
      alert("Please enter a valid expiry date (MM/YY).");
      return false;
    }

    if (!cvv || !cvvRegex.test(cvv)) {
      alert("Please enter a valid CVV (3 digits).");
      return false;
    }

    if (!name) {
      alert("Please enter the cardholder's name.");
      return false;
    }

    if (!address) {
      alert("Please enter the billing address.");
      return false;
    }

    return true;
  };

  // handle icons of Visa
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (cardNumber === "") setIsFocused(false);
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      window.location.href = "/stripe/success";
      clearCart();
    }
  };

  return (
    <Drawer>
      <DrawerTrigger className="btn btn-primary w-full">
        Proceed to checkout
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Complete Your Payment</DrawerTitle>
        {/* <DrawerDescription>Enter Your Valid Information</DrawerDescription> */}
        <DrawerHeader>
          <div className="mb-10">
            <div className="mb-2 flex flex-col justify-between">
              <label
                htmlFor="email"
                className="text-md text-center font-bold mr-2 text-primary"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="mb-2 flex flex-col justify-between">
              <label
                htmlFor="card-number"
                className="text-md text-center font-bold mr-2 text-primary"
              >
                Card Number
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 16) return;
                    const formattedValue = value.replace(
                      /(\d{4})(?=\d)/g,
                      "$1 "
                    );
                    setCardNumber(formattedValue);
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  maxLength={19}
                  required
                  className="w-[100%] px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                />
                {/* Icons */}
                {!isFocused && cardNumber === "" && (
                  <div className="flex items-center justify-center gap-1">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                      alt="Visa"
                      width={25}
                      height={25}
                      className="w-6 h-6"
                    />
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                      alt="Mastercard"
                      width={20}
                      height={20}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="space-x-4">
              <input
                type="text"
                id="expiry-date"
                name="expiry-date"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length > 4) return;
                  if (value.length > 2) {
                    value = value.slice(0, 2) + "/" + value.slice(2);
                  }
                  setExpiryDate(value);
                }}
                maxLength={5}
                className="w-[48%] px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                maxLength={3}
                className="w-[48%] px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="mb-2 mt-2 flex flex-col justify-between">
              <label
                htmlFor="name"
                className="text-md text-center font-bold mr-2 text-primary"
              >
                Cardholder Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your Cardholder Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="mb-2 mt-2 flex flex-col justify-between">
              <label
                htmlFor="address"
                className="text-md text-center font-bold mr-2 text-primary"
              >
                Billing Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex items-center gap-5 justify-center">
            <button
              onClick={handleSubmit}
              className="btn bg-blue-700 hover:bg-blue-500"
            >
              Pay
            </button>
            <DrawerClose asChild>
              <button className="btn btn-accent" role="button" tabIndex={0}>
                Cancel
              </button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckoutBtn;
