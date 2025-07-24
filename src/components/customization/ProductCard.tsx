import React from "react";
import { Icon } from "@iconify/react";

interface ProductCustomisations {
  fabricColor?: string;
  controls?: string;
  fitType?: string;
  stack?: string;
  style?: string;
  hem?: string;
  curtainType?: string;
  wandLength?: string;
  trackColour?: string;
  bracketStyle?: string;
  hinge?: string;
  baseRailShape?: string;
  baseRailColour?: string;
  weightType?: string;
  blackoutColor?: string;
  sheerFabricColor?: string;
  sheerColor?: string;
  setup?: string;
  chainColor?: string;
  bracketColor?: string;
  rollDirection?: string;
  blockoutStyle?: string;
  sheerStyle?: string;
  blockoutControls?: string;
  sheerControls?: string;
  sheerHem?: string;
}

interface ProductCardProps {
  customisations: ProductCustomisations;
  imageSrc: string;
  productName?: string;
  productDescription?: string;
  price?: string;
  fields?: Array<keyof ProductCustomisations>;
  customLabels?: Partial<Record<keyof ProductCustomisations, string>>;
  groupedFields?: Array<{
    group: string;
    fields: Array<keyof ProductCustomisations>;
  }>;
}

const fieldLabels: Record<keyof ProductCustomisations, string> = {
  fabricColor: "Blockout Fabric",
  controls: "Controls",
  fitType: "Fit Type",
  stack: "Stack",
  style: "Style",
  hem: "Blockout Hem",
  curtainType: "Curtain Track Type",
  wandLength: "Wand Length",
  trackColour: "Track Colour",
  bracketStyle: "Bracket Style",
  hinge: "Hinge Colour",
  baseRailShape: "Base Rail Shape",
  baseRailColour: "Base Rail Colour",
  weightType: "Weight Type",
  blackoutColor: "Blockout Colour",
  sheerFabricColor: "Sheer Fabric",
  sheerColor: "Sheer Colour",
  setup: "Setup",
  chainColor: "Chain Colour",
  bracketColor: "Bracket Colour",
  rollDirection: "Roll Direction",
  blockoutStyle: "Blockout Style",
  sheerStyle: "Sheer Style",
  blockoutControls: "Blockout Controls",
  sheerControls: "Sheer Controls",
  sheerHem: "Sheer Hem",
};

function CustomCheckbox() {
  const [checked, setChecked] = React.useState(false);
  return (
    <div
      className="flex items-center gap-2 cursor-pointer select-none"
      onClick={() => setChecked(!checked)}
    >
      <div
        className={`w-5 h-5 border-2 rounded flex items-center justify-center transition ${checked ? "bg-primary border-primary" : "border-gray-400 bg-white"}`}
      >
        {checked && <Icon icon="tabler:check" className="text-white text-sm" />}
      </div>
      <label className="text-sm">
        I have double checked my measurements and customisations
      </label>
    </div>
  );
}

const ProductCard: React.FC<ProductCardProps> = ({
  customisations,
  imageSrc,
  productName = "Product Name",
  productDescription = "Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.",
  price = "-",
  fields,
  customLabels,
  groupedFields,
}) => {
  const scrollableRef = React.useRef<HTMLDivElement>(null);

  // Handle wheel events to prevent scroll conflicts with parent
  const handleWheel = React.useCallback((e: WheelEvent) => {
    // Always prevent scroll from bubbling up when cursor is over ProductCard
    // This prevents the customization sidebar from scrolling when cursor is on ProductCard
    e.stopPropagation();
    
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      // Only prevent default if we can't scroll in our container
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault();
      }
    }
  }, []);

  // Handle touch events for mobile scrolling
  const handleTouchStart = React.useCallback((e: TouchEvent) => {
    if (scrollableRef.current) {
      e.stopPropagation();
    }
  }, []);

  React.useEffect(() => {
    const scrollableElement = scrollableRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener('wheel', handleWheel, { passive: false });
      scrollableElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      
      return () => {
        scrollableElement.removeEventListener('wheel', handleWheel);
        scrollableElement.removeEventListener('touchstart', handleTouchStart);
      };
    }
  }, [handleWheel, handleTouchStart]);

  return (
    <div 
      className="product-card-container w-full max-w-[33vw] xl:w-[33vw] xl:max-w-[33vw] max-h-[95vh] flex flex-col xl:p-[1.25vw] sm:p-[2.344vw] p-4 text-black border border-[--Black] rounded-48 xl:sticky xl:top-6 overflow-hidden"
    >
      <div 
        ref={scrollableRef}
        className="w-full h-full overflow-y-auto scrollbar-hide scrollable-content"
        style={{ 
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain'
        }}
      >
        <div className="w-full flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
        <div className="w-full xl:w-auto rounded-32 overflow-hidden mb-4 xl:mb-0">
          <img
            src={imageSrc}
            className="w-full object-cover"
            alt="product-datail"
          />
        </div>
        <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black">
          <div className="flex flex-col gap-2">
            <h5 className="text-lg">{productName}</h5>
            <p className="text-sm lg:text-base xl:text-lg">
              {productDescription}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
            <Icon icon="uil:plus" className="text-[18px]" />
            <div className="w-full h-[1px] bg-mediumGrey"></div>
            <Icon icon="uil:plus" className="text-[18px]" />
          </div>
          <div className="w-full flex flex-col gap-4">
            <h5 className="text-lg xl:text-2xl">Customisations</h5>
            {groupedFields
              ? groupedFields.map(({ group, fields }) => (
                  <div key={group} className="mb-2">
                    <h6 className="font-bold text-base mb-1">{group}</h6>
                    {fields.map((field) => (
                      <div
                        className="flex items-center justify-between"
                        key={field}
                      >
                        <p className="capitalize text-sm lg:text-base xl:text-lg">
                          {customLabels?.[field] || fieldLabels[field]}:
                        </p>
                        <p className="text-sm lg:text-base xl:text-lg">
                          {customisations[field] || "-"}
                        </p>
                      </div>
                    ))}
                  </div>
                ))
              : (
                  fields ||
                  (Object.keys(fieldLabels) as Array<keyof ProductCustomisations>)
                ).map((field) => (
                  <div className="flex items-center justify-between" key={field}>
                    <p className="capitalize text-sm lg:text-base xl:text-lg">
                      {customLabels?.[field] || fieldLabels[field]}:
                    </p>
                    <p className="text-sm lg:text-base xl:text-lg">
                      {customisations[field] || "-"}
                    </p>
                  </div>
                ))}
            <div className="flex items-center justify-between">
              <h5 className="text-lg">TOTAL PRICE</h5>
              <h5 className="text-lg">{price}</h5>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CustomCheckbox />
          </div>
          <div className="flex items-center gap-2">
            <button className="w-1/2 cus-btn small primary shrink-0">
              Add to Cart
            </button>
            <button className="w-1/2 cus-btn small shrink-0 stroke-black">
              Buy Now
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
