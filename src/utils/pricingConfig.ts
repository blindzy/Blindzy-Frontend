/**
 * Configuration helper for updating pricing rates from clientpricing folder
 * 
 * To implement your actual pricing from the clientpricing documents:
 * 1. Open the Excel files and Word documents in your clientpricing folder
 * 2. Extract the actual rates and replace the values below
 * 3. Update the configuration in your app
 */

import { DEFAULT_PRICING_CONFIG, type PricingConfig } from './pricingEngine';

// Create your custom configuration based on clientpricing documents
export const createCustomPricingConfig = (overrides: Partial<PricingConfig>): PricingConfig => {
  return {
    ...DEFAULT_PRICING_CONFIG,
    ...overrides,
    baseRates: {
      ...DEFAULT_PRICING_CONFIG.baseRates,
      ...overrides.baseRates,
    },
    fabricWastage: {
      ...DEFAULT_PRICING_CONFIG.fabricWastage,
      ...overrides.fabricWastage,
    },
    minimumCharges: {
      ...DEFAULT_PRICING_CONFIG.minimumCharges,
      ...overrides.minimumCharges,
    },
    motorization: {
      ...DEFAULT_PRICING_CONFIG.motorization,
      ...overrides.motorization,
    },
    installation: {
      ...DEFAULT_PRICING_CONFIG.installation,
      ...overrides.installation,
    },
    sizeMultipliers: {
      ...DEFAULT_PRICING_CONFIG.sizeMultipliers,
      ...overrides.sizeMultipliers,
    },
  };
};

// Example: How to update with your actual rates from clientpricing folder
// Uncomment and modify these values based on your documents:

/*
export const YOUR_CUSTOM_PRICING: PricingConfig = createCustomPricingConfig({
  baseRates: {
    blinds: 35,              // Update from Blinds.docx pricing table
    curtains: 45,            // Update from curtains.docx pricing table  
    shutters: 150,           // Update from Plantation Shutters pricelist.xlsx
    doubleCurtains: 55,      // Update from Curtain_Fabric_Calculation_Inventory_Management.docx
    verticalBlinds: 40,      // Update from your pricing documents
    doubleRollerBlinds: 50,  // Update from your pricing documents
  },
  
  fabricWastage: {
    blinds: 12,              // Update from Blinds fabric calculation explanation.docx
    curtains: 18,            // Update from Curtain_Fabric_Calculation_Inventory_Management.docx
    shutters: 8,             // Update from your documents
  },
  
  minimumCharges: {
    blinds: 180,             // Update from your minimum order requirements
    curtains: 250,           // Update from your minimum order requirements
    shutters: 500,           // Update from Plantation Shutters pricelist.xlsx
  },
  
  motorization: {
    basic: 200,              // Update from Motorisation.docx
    premium: 400,            // Update from Motorisation.docx
    smart: 650,              // Update from Motorisation.docx
  },
});
*/

// Instructions for implementing your pricing:
export const PRICING_IMPLEMENTATION_GUIDE = `
To implement your actual pricing from the clientpricing folder:

1. BLINDS PRICING:
   - Open 'clientpricing/Content/Blinds/Blinds fabric calculation explanation.docx'
   - Find the base rate per square meter
   - Find the fabric wastage percentage
   - Update baseRates.blinds and fabricWastage.blinds

2. CURTAINS PRICING:
   - Open 'clientpricing/Content/Curtains/Curtains pricelist.xlsx'
   - Open 'clientpricing/Content/Curtains/Curtain_Fabric_Calculation_Inventory_Management.docx'
   - Extract pricing per square meter and wastage calculations
   - Update baseRates.curtains and fabricWastage.curtains

3. SHUTTERS PRICING:
   - Open 'clientpricing/Content/Shutters/Plantation Shutters pricelist.xlsx'
   - Find base rates and minimum charges
   - Update baseRates.shutters and minimumCharges.shutters

4. MOTORIZATION PRICING:
   - Open 'clientpricing/Content/Motorisation.docx'
   - Find pricing for different motor types
   - Update motorization.basic, motorization.premium, motorization.smart

5. UPDATE THE PRICING ENGINE:
   - Uncomment YOUR_CUSTOM_PRICING above
   - Replace values with actual rates from your documents
   - Import and use YOUR_CUSTOM_PRICING in pricingEngine.ts

Example usage:
import { YOUR_CUSTOM_PRICING } from './pricingConfig';
export const pricingEngine = new PricingEngine(YOUR_CUSTOM_PRICING);
`;

console.log(PRICING_IMPLEMENTATION_GUIDE);
