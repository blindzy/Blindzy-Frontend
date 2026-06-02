import React, { useState } from "react";
import { ChevronDown, Plus } from 'lucide-react';
import { Button } from "@lib/components/ui/button";

const FULFILLMENT_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  not_fulfilled:       { label: "Awaiting FulFillment",       color: "text-gray-500 bg-gray-100" },
  partially_fulfilled: { label: "Partially Fulfilled", color: "text-yellow-700 bg-yellow-100" },
  fulfilled:           { label: "Fulfilled",           color: "text-blue-700 bg-blue-100" },
  partially_shipped:   { label: "Partially Shipped",   color: "text-orange-700 bg-orange-100" },
  shipped:             { label: "Shipped",             color: "text-indigo-700 bg-indigo-100" },
  delivered:           { label: "Delivered",           color: "text-green-700 bg-green-100" },
  return_requested:    { label: "Return Requested",    color: "text-red-700 bg-red-100" },
  canceled:            { label: "Canceled",            color: "text-red-500 bg-red-100" },
};

function getFulfillmentStatus(order: any): string {
  const fulfillment = order.fulfillments?.[0];
  if (order.canceled_at || fulfillment?.canceled_at) return "canceled";

  const items = order.items ?? [];
  let totalQty = 0, totalDelivered = 0, totalShipped = 0, totalFulfilled = 0, totalReturnRequested = 0;

  for (const item of items) {
    const d = item.detail;
    if (!d) continue;
    totalQty             += d.quantity ?? 0;
    totalDelivered       += d.delivered_quantity ?? 0;
    totalShipped         += d.shipped_quantity ?? 0;
    totalFulfilled       += d.fulfilled_quantity ?? 0;
    totalReturnRequested += d.return_requested_quantity ?? 0;
  }

  if (totalReturnRequested > 0)                          return "return_requested";
  if (totalDelivered >= totalQty && totalQty > 0)        return "delivered";
  if (fulfillment?.delivered_at)                         return "delivered";
  if (totalShipped > 0 && totalShipped < totalQty)       return "partially_shipped";
  if (totalShipped >= totalQty && totalQty > 0)          return "shipped";
  if (fulfillment?.shipped_at)                           return "shipped";
  if (totalFulfilled > 0 && totalFulfilled < totalQty)   return "partially_fulfilled";
  if (totalFulfilled >= totalQty && totalQty > 0)        return "fulfilled";
  return "not_fulfilled";
}

function OrderList(props) {
  const statusKey = getFulfillmentStatus(props.order);
  const statusConfig = FULFILLMENT_STATUS_CONFIG[statusKey] ?? FULFILLMENT_STATUS_CONFIG["not_fulfilled"];

  const formattedDate = props.createdAt
    ? new Date(props.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className="w-full p-4 flex flex-col items-center gap-2.5 border border-[--Black] rounded-24">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-[64px] bg-[--primary] rounded-[16px] overflow-hidden">
            <img
              src={props.data.metadata?.thumbnail?.replace("http://localhost:9000", "https://api.blindzy.com")}
              className="w-full object-cover"
              alt={props.data.metadata?.title}
            />
          </div>
          <h6 className="hidden sm:block text-md text-[--Black]">{props.data.metadata.title}</h6>
          <span className="text-xs text-[--lightBlack]">{formattedDate}</span>

          {/* Status badge — desktop */}
          <span className={`hidden sm:inline-block text-xs font-medium px-2 py-1 rounded-full ${statusConfig.color}`}>
            {statusConfig.label}
          </span>

          <div className="w-fit sm:hidden flex flex-col gap-1">
            <h6 className="text-lg text-[--Black]">{props.data.metadata.title}</h6>
            <p className="text-md text-[--Black]">
              {props.data.metadata.currency}
              {props.data.metadata.amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            {/* Status badge — mobile */}
            <span className={`w-fit text-xs font-medium px-2 py-1 rounded-full ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
            <Button variant={"primary"} size={"smallest"} className="w-fit">
              Reorder
            </Button>
          </div>
        </div>

        <h6 className="hidden sm:block text-md text-[--Black]">
          {props.data.metadata.currency}
          {props.data.metadata.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h6>
        <div className="sm:hidden flex items-center gap-1 cursor-pointer" onClick={toggleDetails}>
          <ChevronDown className={`text-[--primary] size-[24px] transition-transform duration-300 ${showDetails ? "rotate-180" : "rotate-0"}`} />
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1 cursor-pointer" onClick={toggleDetails}>
        <p className="text-sm text-[--primary]">{showDetails ? "See Less" : "See More"}</p>
        <ChevronDown className={`text-[--primary] size-[24px] transition-transform duration-300 ${showDetails ? "rotate-180" : "rotate-0"}`} />
      </div>

      <div className={`w-full flex flex-col gap-4 overflow-hidden transition ${showDetails ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="w-full flex items-center gap-2 shrink-0 text-[--lightBlack]">
          <Plus className="size-[18px]" />
          <div className="w-full border-b border-[--mediumGrey]"></div>
          <Plus className="size-[18px]" />
        </div>
        {props.data.metadata.customizationData?.map((option, index) => (
          <div className="w-full flex items-center justify-between" key={index}>
            <span className="text-sm text-[--lightBlack]">{option.title}</span>
            <span className="text-sm text-[--lightBlack]">{option.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;