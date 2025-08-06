// Comprehensive pricing engine based on clientpricing folder structure
// This implements industry-standard window treatment pricing logic

export interface PricingConfig {
  // Base rates per square meter for different product types
  baseRates: {
    blinds: number;
    curtains: number;
    shutters: number;
    doubleCurtains: number;
    verticalBlinds: number;
    doubleRollerBlinds: number;
  };
  
  // Fabric wastage percentages
  fabricWastage: {
    blinds: number;
    curtains: number;
    shutters: number;
  };
  
  // Minimum charges
  minimumCharges: {
    blinds: number;
    curtains: number;
    shutters: number;
  };
  
  // Motorization pricing
  motorization: {
    basic: number;
    premium: number;
    smart: number;
  };
  
  // Installation complexity multipliers
  installation: {
    simple: number;
    standard: number;
    complex: number;
  };
  
  // Size-based multipliers
  sizeMultipliers: {
    small: { maxArea: number; multiplier: number; }; // Under 2m²
    medium: { maxArea: number; multiplier: number; }; // 2-6m²
    large: { maxArea: number; multiplier: number; }; // 6-12m²
    extraLarge: { maxArea: number; multiplier: number; }; // Over 12m²
  };
}

// Default pricing configuration - update these with your actual rates from clientpricing documents
export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  baseRates: {
    blinds: 35, // $35 per m² for blinds (increased from $25)
    curtains: 35, // $35 per m² for curtains  
    shutters: 120, // $120 per m² for shutters
    doubleCurtains: 45, // $45 per m² for double curtains
    verticalBlinds: 30, // $30 per m² for vertical blinds
    doubleRollerBlinds: 40, // $40 per m² for double roller blinds
  },
  
  fabricWastage: {
    blinds: 10, // 10% wastage for blinds
    curtains: 15, // 15% wastage for curtains
    shutters: 10, // 10% wastage for shutters (increased from 5%)
  },
  
  minimumCharges: {
    blinds: 150, // $150 minimum
    curtains: 200, // $200 minimum
    shutters: 400, // $400 minimum
  },
  
  motorization: {
    basic: 150, // $150 for basic motor
    premium: 300, // $300 for premium motor
    smart: 500, // $500 for smart home integration
  },
  
  installation: {
    simple: 1.0, // No extra charge
    standard: 1.15, // 15% extra
    complex: 1.35, // 35% extra
  },
  
  sizeMultipliers: {
    small: { maxArea: 2, multiplier: 1.1 }, // Small windows +10% (more complex per m²)
    medium: { maxArea: 6, multiplier: 1.0 }, // Standard rate
    large: { maxArea: 12, multiplier: 0.95 }, // Large windows -5% (economies of scale)
    extraLarge: { maxArea: Infinity, multiplier: 0.90 }, // Very large -10% (bulk pricing)
  },
};

export interface PricingCalculation {
  basePrice: number;
  fabricWastage: number;
  areaPrice: number;
  sizeMultiplier: number;
  installationMultiplier: number;
  motorization: number;
  minimumCharge: number;
  finalPrice: number;
  breakdown: {
    area: number;
    effectiveArea: number;
    baseRate: number;
    sizeCategory: string;
    wastagePercent: number;
  };
}

export class PricingEngine {
  private config: PricingConfig;
  
  constructor(config: PricingConfig = DEFAULT_PRICING_CONFIG) {
    this.config = config;
  }
  
  // Main pricing calculation function
  calculatePrice(
    width: number, 
    height: number, 
    productType: keyof PricingConfig['baseRates'],
    options: {
      motorization?: keyof PricingConfig['motorization'];
      installation?: keyof PricingConfig['installation'];
      baseProductPrice?: number;
    } = {}
  ): PricingCalculation {
    
    // Convert dimensions from cm to meters
    const widthM = width / 100;
    const heightM = height / 100;
    const area = widthM * heightM;
    
    // Get base rate for product type
    const baseRate = this.config.baseRates[productType];
    
    // Calculate fabric wastage
    const wastagePercent = this.config.fabricWastage[productType] || 0;
    const effectiveArea = area * (1 + wastagePercent / 100);
    
    // Calculate base price from area
    const areaPrice = effectiveArea * baseRate;
    
    // Apply size multiplier
    const sizeCategory = this.getSizeCategory(area);
    const sizeMultiplier = this.config.sizeMultipliers[sizeCategory].multiplier;
    const sizePriceAdjustment = areaPrice * (sizeMultiplier - 1);
    
    // Apply installation complexity
    const installationMultiplier = options.installation 
      ? this.config.installation[options.installation] 
      : this.config.installation.standard;
    
    // Calculate motorization cost (affected by installation complexity)
    const motorizationCost = options.motorization 
      ? this.config.motorization[options.motorization] * installationMultiplier
      : 0;
    
    // Calculate subtotal from area-based pricing
    const areaPriceTotal = (areaPrice + sizePriceAdjustment) * installationMultiplier;
    let subtotal = areaPriceTotal + motorizationCost;
    
    // Apply minimum charge for the calculated portion
    const minimumCharge = this.config.minimumCharges[productType];
    const calculatedPrice = Math.max(subtotal, minimumCharge);
    
    // Handle base product price: if provided, use it as starting point instead of area calculation
    const baseProductPrice = options.baseProductPrice || 0;
    let finalPrice: number;
    
    if (baseProductPrice > 0) {
      // When base product price exists, add only the extras (motorization + installation premium)
      const installationPremium = areaPriceTotal * (installationMultiplier - 1);
      finalPrice = baseProductPrice + installationPremium + motorizationCost;
    } else {
      // When no base price, use full calculated price
      finalPrice = calculatedPrice;
    }
    
    return {
      basePrice: baseProductPrice,
      fabricWastage: effectiveArea - area,
      areaPrice,
      sizeMultiplier: sizePriceAdjustment,
      installationMultiplier: areaPriceTotal * (installationMultiplier - 1),
      motorization: motorizationCost,
      minimumCharge: Math.max(0, minimumCharge - (areaPriceTotal + motorizationCost)),
      finalPrice,
      breakdown: {
        area,
        effectiveArea,
        baseRate,
        sizeCategory,
        wastagePercent,
      }
    };
  }
  
  private getSizeCategory(area: number): keyof PricingConfig['sizeMultipliers'] {
    if (area <= this.config.sizeMultipliers.small.maxArea) return 'small';
    if (area <= this.config.sizeMultipliers.medium.maxArea) return 'medium';
    if (area <= this.config.sizeMultipliers.large.maxArea) return 'large';
    return 'extraLarge';
  }
  
  // Helper function to get product type from category/slug
  static getProductTypeFromCategory(category: string): keyof PricingConfig['baseRates'] {
    const normalized = category.toLowerCase();
    
    if (normalized.includes('shutter')) return 'shutters';
    if (normalized.includes('double-curtain') || normalized.includes('double curtain')) return 'doubleCurtains';
    if (normalized.includes('curtain')) return 'curtains';
    if (normalized.includes('vertical') && normalized.includes('blind')) return 'verticalBlinds';
    if (normalized.includes('double') && normalized.includes('blind')) return 'doubleRollerBlinds';
    if (normalized.includes('blind')) return 'blinds';
    
    // Default fallback
    return 'blinds';
  }
  
  // Format price breakdown for display
  formatPriceBreakdown(calculation: PricingCalculation): string {
    const { breakdown, basePrice, areaPrice, sizeMultiplier, installationMultiplier, motorization, minimumCharge } = calculation;
    
    let breakdown_text = `Area: ${breakdown.area.toFixed(2)}m² (${breakdown.effectiveArea.toFixed(2)}m² with ${breakdown.wastagePercent}% wastage)\n`;
    breakdown_text += `Base Rate: $${breakdown.baseRate}/m² (${breakdown.sizeCategory} size)\n`;
    
    if (basePrice > 0) breakdown_text += `Product Base: $${basePrice.toFixed(2)}\n`;
    breakdown_text += `Area Cost: $${areaPrice.toFixed(2)}\n`;
    if (sizeMultiplier > 0) breakdown_text += `Size Adjustment: $${sizeMultiplier.toFixed(2)}\n`;
    if (installationMultiplier > 0) breakdown_text += `Installation: $${installationMultiplier.toFixed(2)}\n`;
    if (motorization > 0) breakdown_text += `Motorization: $${motorization.toFixed(2)}\n`;
    if (minimumCharge > 0) breakdown_text += `Minimum Charge Applied: $${minimumCharge.toFixed(2)}\n`;
    
    return breakdown_text;
  }
}

// Export singleton instance
export const pricingEngine = new PricingEngine();
