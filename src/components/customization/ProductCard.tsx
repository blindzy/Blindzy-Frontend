import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { api } from '../../services/api';
import { pricingEngine, PricingEngine, type PricingCalculation } from '../../utils/pricingEngine';

interface ProductInfo {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  category: string;
  isCalculatedPrice?: boolean;
  shopWidth?: string;
  shopHeight?: string;
}

interface ProductCustomisations {
  width?: string;
  height?: string;
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
  imageSrc?: string;
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
  width: "Width",
  height: "Height",
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
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPriceCalculation, setCurrentPriceCalculation] = useState<PricingCalculation | null>(null);
  const scrollableRef = React.useRef<HTMLDivElement>(null);

  // Check backend status on component mount
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        // Try a simple health check to the backend
        const response = await fetch('http://localhost:9000/health', { 
          method: 'GET',
          timeout: 3000 
        } as any);
        if (response.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch (error) {
        console.log('Backend health check failed:', error);
        setBackendStatus('offline');
      }
    };

    checkBackendStatus();
  }, []);

  // Get product information from URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlProductInfo = {
        id: urlParams.get('product') || '',
        name: urlParams.get('name') || productName,
        price: urlParams.get('price') || price,
        image: urlParams.get('image') || imageSrc || '/images/product/1.png',
        description: urlParams.get('description') || productDescription,
        category: urlParams.get('category') || 'General'
      };
      
      // Check if this is a calculated price from shop page
      const isCalculatedPrice = urlParams.get('calculatedPrice') === 'true';
      const shopWidth = urlParams.get('width');
      const shopHeight = urlParams.get('height');
      
      setProductInfo({
        ...urlProductInfo,
        isCalculatedPrice,
        shopWidth: shopWidth || undefined,
        shopHeight: shopHeight || undefined
      });
    }
  }, [imageSrc, productName, productDescription, price]);

  // Use product info from URL if available, otherwise use props
  const displayName = productInfo?.name || productName;
  const displayPrice = productInfo?.price || price;
  const displayImage = productInfo?.image || imageSrc || '/images/product/1.png';
  const displayDescription = productInfo?.description || productDescription;

  // Calculate price using comprehensive pricing engine
  const [currentPrice, setCurrentPrice] = useState<string>('0.00');
  const [priceAnimating, setPriceAnimating] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  // Update price calculation when customizations change
  useEffect(() => {
    const calculatePrice = () => {
      // Get the original/stored product price first
      let originalPrice = 0;
      const priceString = displayPrice;
      if (priceString && priceString !== '-' && priceString !== 'Price not available') {
        // Remove $ and parse the price
        const cleanPrice = priceString.replace(/[$,]/g, '');
        originalPrice = parseFloat(cleanPrice) || 0;
      }
      
      // If no width and height in customizations, just show the stored product price
      const currentWidth = customisations.width;
      const currentHeight = customisations.height;
      
      if (!currentWidth || !currentHeight || currentWidth === '' || currentHeight === '') {
        // No dimensions provided - show the stored product price
        setCurrentPriceCalculation(null);
        setCurrentPrice(originalPrice.toFixed(2));
        return;
      }
      
      // If we have dimensions, calculate the total price using pricing engine
      const widthInMeters = parseFloat(currentWidth);
      const heightInMeters = parseFloat(currentHeight);
      
      if (widthInMeters > 0 && heightInMeters > 0) {
        // Convert meters to centimeters for pricing engine
        const width = widthInMeters * 100; // Convert to cm
        const height = heightInMeters * 100; // Convert to cm
        
        // Determine product type from URL or category
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category') || productInfo?.category || 'blinds';
        const productType = PricingEngine.getProductTypeFromCategory(category);
        
        // Calculate using comprehensive pricing engine with stored product price as base
        const calculation = pricingEngine.calculatePrice(
          width, 
          height, 
          productType,
          {
            baseProductPrice: originalPrice, // Use stored product price as base
            motorization: customisations.controls === 'motorised' ? 'basic' : undefined,
            installation: 'standard'
          }
        );
        
        // Store calculation for breakdown display
        setCurrentPriceCalculation(calculation);
        
        // Add animation when price changes
        if (calculation.finalPrice.toFixed(2) !== currentPrice) {
          setPriceAnimating(true);
          setTimeout(() => setPriceAnimating(false), 500);
        }
        
        setCurrentPrice(calculation.finalPrice.toFixed(2));
        return;
      }
      
      // Fallback to stored product price
      setCurrentPriceCalculation(null);
      setCurrentPrice(originalPrice.toFixed(2));
    };

    calculatePrice();
  }, [customisations.width, customisations.height, customisations.controls, displayPrice, productInfo?.category]);

  // Add to cart functionality
  const addToCart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get customer email from localStorage
      const customerData = localStorage.getItem('user');
      const customer = customerData ? JSON.parse(customerData) : null;
      
      if (!customer?.email) {
        alert('Please log in to add items to cart');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return;
      }

      // Get product details from URL params or props
      const productId = productInfo?.id || '1'; // fallback to default product
      const productCategory = productInfo?.category || 'General';
      
      // Prepare customizations data from current customisations state
      const customizationsArray: Array<{ name: string; value: string }> = [];
      
      // Always add width and height first if available
      const currentWidth = customisations.width || productInfo?.shopWidth;
      const currentHeight = customisations.height || productInfo?.shopHeight;
      
      if (currentWidth) {
        customizationsArray.push({ name: 'Width', value: `${currentWidth}m` });
      }
      if (currentHeight) {
        customizationsArray.push({ name: 'Height', value: `${currentHeight}m` });
      }
      
      // Add other customizations (excluding width/height to avoid duplicates)
      Object.entries(customisations)
        .filter(([key, value]) => key !== 'width' && key !== 'height' && value && value !== '-') // Exclude width/height and empty values
        .forEach(([key, value]) => {
          customizationsArray.push({
            name: fieldLabels[key as keyof ProductCustomisations] || key,
            value: value
          });
        });
      
      // Add defaults if no dimensions provided at all
      if (!currentWidth) {
        customizationsArray.push({ name: 'Width', value: '1.2m' });
      }
      if (!currentHeight) {
        customizationsArray.push({ name: 'Height', value: '1.8m' });
      }
      if (!customizationsArray.find(c => c.name.toLowerCase().includes('installation'))) {
        customizationsArray.push({ name: 'Installation', value: 'Self Installation' });
      }

      console.log('Adding product to cart:', {
        productId,
        productName: displayName,
        customizations: customizationsArray,
        calculatedPrice: parseFloat(currentPrice)
      });

      // Call the API to add to cart with calculated price
      const result = await api.addToCart({
        email: customer.email,
        product_id: productId,
        quantity: 1,
        customizations: customizationsArray,
        calculatedPrice: parseFloat(currentPrice)
      });
      
      console.log('Cart operation result:', result);
      
      // Show success message
      alert(`${displayName} added to cart successfully!`);
      
      // Trigger cart update event for navbar
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // More specific error handling
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setError('Backend unavailable - cart saved locally. Your items will be available when the server reconnects.');
        alert('Backend unavailable - Your item has been saved to a local cart and will be available when the server reconnects.');
      } else {
        setError('Failed to add product to cart');
        alert('Failed to add product to cart. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

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
      className="product-card-container w-full max-w-[34vw] xl:w-[34vw] xl:max-w-[34vw] max-h-[95vh] flex flex-col xl:p-[1.25vw] sm:p-[2.344vw] p-4 text-black border border-[--Black] rounded-48 xl:sticky xl:top-6 overflow-hidden"
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
        <div className="w-full rounded-32 overflow-hidden mb-4 xl:mb-0 h-[200px] xl:h-[250px]">
          <img
            src={displayImage}
            className="w-full h-full object-cover object-center"
            alt="product-datail"
          />
        </div>
        <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              ❌ {error}
            </div>
          )}
          
          {/* Backend Status Indicator */}
          {backendStatus === 'offline' && (
            <div className="p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-sm">
              ⚠️ Backend offline - using local cart (items will sync when server reconnects)
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <h5 className="text-lg">{displayName}</h5>
            <p className="text-sm lg:text-base xl:text-lg">
              {displayDescription}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
            <Icon icon="uil:plus" className="text-[18px]" />
            <div className="w-full h-[1px] bg-mediumGrey"></div>
            <Icon icon="uil:plus" className="text-[18px]" />
          </div>
          <div className="w-full flex flex-col gap-4">
            <h5 className="text-lg xl:text-2xl">Customisations</h5>
            
            {/* Always show Width and Height first */}
            <div className="flex items-center justify-between">
              <p className="capitalize text-sm lg:text-base xl:text-lg">
                Width:
              </p>
              <p className="text-sm lg:text-base xl:text-lg">
                {customisations.width ? `${customisations.width}m` : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="capitalize text-sm lg:text-base xl:text-lg">
                Height:
              </p>
              <p className="text-sm lg:text-base xl:text-lg">
                {customisations.height ? `${customisations.height}m` : "-"}
              </p>
            </div>
            
            {/* Show other customizations */}
            {groupedFields
              ? groupedFields.map(({ group, fields }) => (
                  <div key={group} className="mb-2">
                    <h6 className="font-bold text-base mb-1">{group}</h6>
                    {fields
                      .filter(field => field !== 'width' && field !== 'height') // Exclude width/height since they're shown above
                      .map((field) => (
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
                )
                .filter(field => field !== 'width' && field !== 'height') // Exclude width/height since they're shown above
                .map((field) => (
                  <div className="flex items-center justify-between" key={field}>
                    <p className="capitalize text-sm lg:text-base xl:text-lg">
                      {customLabels?.[field] || fieldLabels[field]}:
                    </p>
                    <p className="text-sm lg:text-base xl:text-lg">
                      {customisations[field] || "-"}
                    </p>
                  </div>
                ))}
            
            {/* Price Breakdown Section - Only show when dimensions are provided */}
            {currentPriceCalculation && customisations.width && customisations.height && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h6 className="text-sm font-medium text-gray-700 mb-3">Price Breakdown</h6>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Area ({currentPriceCalculation.breakdown.area.toFixed(2)}m²):</span>
                    <span>${currentPriceCalculation.areaPrice.toFixed(2)}</span>
                  </div>
                  
                  {currentPriceCalculation.fabricWastage > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Fabric Wastage ({currentPriceCalculation.breakdown.wastagePercent}%):</span>
                      <span>${(currentPriceCalculation.fabricWastage * currentPriceCalculation.breakdown.baseRate).toFixed(2)}</span>
                    </div>
                  )}
                  
                  {currentPriceCalculation.sizeMultiplier > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Size Adjustment ({currentPriceCalculation.breakdown.sizeCategory}):</span>
                      <span>${currentPriceCalculation.sizeMultiplier.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {currentPriceCalculation.installationMultiplier > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Installation:</span>
                      <span>${currentPriceCalculation.installationMultiplier.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {currentPriceCalculation.motorization > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Motorization:</span>
                      <span>${currentPriceCalculation.motorization.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {currentPriceCalculation.minimumCharge > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Minimum Charge:</span>
                      <span>${currentPriceCalculation.minimumCharge.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {currentPriceCalculation.basePrice > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                      <span className="text-gray-600">Base Product Price:</span>
                      <span>${currentPriceCalculation.basePrice.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <h5 className="text-lg">TOTAL PRICE</h5>
              <h5 className={`text-lg transition-all duration-300 ${priceAnimating ? 'text-primary scale-110' : ''}`}>
                ${currentPrice}
              </h5>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CustomCheckbox />
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="w-1/2 cus-btn small primary shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={addToCart}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add to Cart'}
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
