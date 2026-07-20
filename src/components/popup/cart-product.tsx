import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { updateCart } from "../../services/update-cart";
import { deleteCart } from "../../services/delete-cart";

export function CartProduct(props) {
  const [quantity, setQuantity] = useState(props.item.quantity || 1);
  const [price, setPrice] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updatePrice = (qty) => {
    const baseAmount = props.item.customizations?.amount || 0;
    const amount = baseAmount * qty;

    const formattedPrice =
      props.item.customizations?.currency +
      amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    setPrice(formattedPrice);
  };

  const increaseQuantity = async () => {
    if (isUpdating || isDeleting) return;

    const newQuantity = quantity + 1;
    setIsUpdating(true);

    try {
      await updateCart.updateCart(props.item.id, { quantity: newQuantity });

      setQuantity(newQuantity);
      updatePrice(newQuantity);

      props.onQuantityChange?.(props.item, newQuantity);
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const decreaseQuantity = async () => {
    if (isUpdating || isDeleting) return;

    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setIsUpdating(true);

    try {
      await updateCart.updateCart(props.item.id, { quantity: newQuantity });

      setQuantity(newQuantity);
      updatePrice(newQuantity);

      props.onQuantityChange?.(props.item, newQuantity);
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    updatePrice(quantity);
  }, []);

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      const itemId = props.item.id;
      const productId = props.item.product_id?.toString();
      const variantId = props.item.variant_id?.toString() ?? null;

      if (itemId?.toString().startsWith("local_")) {
        const guestItems = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        const filteredItems = guestItems.filter((item) => item.id !== itemId);
        localStorage.setItem("guest_cart", JSON.stringify(filteredItems));
      } else {
        await deleteCart.deleteCart(itemId);
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("cartItemDeleted", {
            detail: { productId, variantId, itemId },
          })
        );
      }

      props.onDeleteSuccess?.(props.item.id);
    } catch (error) {
      console.error("Error deleting cart:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <div className="size-[64px] rounded-[15px] bg-[--primary] shrink-0 overflow-hidden">
        <img
          src={props.item.customizations?.thumbnail?.replace(
            "http://localhost:9000",
            "https://api.blindzy.com"
          )}
          className="w-full h-full object-cover object-center"
          alt={props.item.customizations?.title}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex items-center justify-between gap-2 text-[--black]">
          <h4 className="text-sm bold line-clamp-1">
            {props.item.customizations?.title}
          </h4>
          <span className="text-sm bold">{price}</span>
        </div>

        <div className="w-full flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              className="size-[32px] flex items-center justify-center border border-[--black] text-[--black] bg-transparent hover:bg-[--black] hover:text-[--white] rounded-[10px] shrink-0 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={decreaseQuantity}
              disabled={isUpdating || isDeleting || quantity <= 1}
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Minus />
              )}
            </button>

            <input
              type="number"
              value={quantity}
              disabled={isUpdating || isDeleting}
              onChange={(e) => {
                const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
                setQuantity(newQuantity);
                updatePrice(newQuantity);
                props.onQuantityChange?.(props.item, newQuantity);
              }}
              min="1"
              className="w-6 text-center bg-transparent border-none focus:ring-0 p-0 m-0 text-md text-[--black] disabled:opacity-50"
            />

            <button
              className="size-[32px] flex items-center justify-center border border-[--primary] text-[--white] bg-[--primary] hover:bg-transparent hover:text-[--primary] rounded-[10px] shrink-0 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={increaseQuantity}
              disabled={isUpdating || isDeleting}
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus />
              )}
            </button>
          </div>

          <button
            className="size-[32px] flex items-center justify-center border border-[--black] text-[--danger] bg-transparent hover:bg-[--danger] hover:border-[--danger] hover:text-[--white] rounded-[10px] shrink-0 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={isDeleting || isUpdating}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="size-[16px]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}