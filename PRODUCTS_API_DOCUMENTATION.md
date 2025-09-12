# Products API Documentation

## Overview
This document outlines the required data structure for the Products API that needs to be implemented in the backend. The frontend expects this specific JSON structure for the curtains/blinds product catalog.

## API Endpoint Requirements

### Base Endpoint
```
GET /api/products/{type}/{slug}
```

**Parameters:**
- `type`: Product category (e.g., "double", "single", "shutters")
- `slug`: Product handle/identifier (e.g., "premium-plantation-shutters")

### Response Format

The API should return a JSON object with the following structure:

```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "handle": "string",
    "description": "string",
    "status": "published" | "draft" | "archived",
    "type": "string",
    "thumbnail": "string (image URL)",
    "images": [
      {
        "id": "string",
        "url": "string"
      }
    ],
    "categories": [
      {
        "id": "string",
        "name": "string",
        "handle": "string"
      }
    ],
    "price": {
      "amount": "number",
      "currency_code": "string"
    },
    "options": [...], // See detailed structure below
    "variants": [...], // See detailed structure below
    "tags": "string",
    "created_at": "string (ISO date)",
    "updated_at": "string (ISO date)"
  }
}
```

## Detailed Data Structure

### 1. Basic Product Information
```json
{
  "id": "1",
  "title": "Premium Plantation Shutters",
  "handle": "premium-plantation-shutters",
  "description": "High-quality timber plantation shutters with adjustable louvers for perfect light control.",
  "status": "published",
  "type": "Double",
  "thumbnail": "/images/categories/1.png"
}
```

### 2. Images Array
```json
"images": [
  {
    "id": "img1",
    "url": "/images/categories/1.png"
  }
]
```

### 3. Categories Array
```json
"categories": [
  {
    "id": "cat1",
    "name": "Shutters",
    "handle": "shutters"
  }
]
```

### 4. Price Object
```json
"price": {
  "amount": 150,
  "currency_code": "usd"
}
```

### 5. Options Array (Complex Structure)

The options array contains customization choices for the product. Each option can have:
- Basic options with simple values
- Nested options with sub-options
- Different types: "variant", "color"

#### Basic Option Structure:
```json
{
  "id": "opt1",
  "title": "Setup",
  "description": "Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.",
  "type": "variant",
  "values": [
    {
      "label": "Blockout in Front",
      "image": "/images/custom/blockout-front.png"
    },
    {
      "label": "Sheer in Front",
      "image": "/images/custom/sheer-front.png"
    }
  ]
}
```

#### Nested Option Structure:
```json
{
  "id": "opt2",
  "title": "Blockout Options",
  "type": "variant",
  "options": [
    {
      "id": "opt1",
      "title": "Blackout Fabric",
      "description": "Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.",
      "type": "color",
      "values": [
        {
          "label": "White",
          "image": "/images/colors/01.png"
        },
        {
          "label": "Grey",
          "image": "/images/colors/02.png"
        }
      ]
    }
  ],
  "values": [
    {
      "label": "Blockout in Front",
      "image": "/images/custom/blockout-front.png"
    }
  ]
}
```

### 6. Required Option Categories

The following option categories must be supported:

1. **Setup** - Basic configuration
2. **Blockout Options** - Contains sub-options:
   - Blackout Fabric
   - Blackout Color
   - Blockout Curtain Style
   - Blockout Hem
3. **Sheer Options** - Contains sub-options:
   - Sheer Fabric
   - Sheer Colour
   - Sheer Curtain Style
   - Sheer Hem
4. **Fitting Type** - Installation type
5. **Select Fit** - Fit vs Recess
6. **Track Type** - Designer vs Residential
7. **Curtain Stack** - Opening direction
8. **Wand Length** - Control wand size
9. **Choose Your Track** - Track color

### 7. Variants Array

Variants represent different product variations (colors, sizes, etc.):

```json
"variants": [
  {
    "id": "v1",
    "title": "White",
    "sku": "SHUT-001-WHITE",
    "prices": [
      {
        "amount": 0,
        "currency_code": "usd"
      }
    ],
    "options": {
      "Color": "White"
    },
    "inventory_quantity": 10,
    "image": "/images/colors/01.png"
  }
]
```

## Color Values

Standard color options that should be available:
- White
- Grey
- Black
- Oak
- Walnut
- Charcoal

Each color should have a corresponding image in `/images/colors/` directory.

## Image Requirements

### Directory Structure:
- `/images/categories/` - Product thumbnails
- `/images/colors/` - Color swatches (01.png to 06.png)
- `/images/custom/` - Customization option images

### Required Custom Images:
- blockout-front.png
- sheer-front.png
- s-fold.jpg
- pinch.jpg
- pencil-pleat.jpg
- 70mm.png
- lead-weight.png
- fitting-left.jpg
- fitting-right.jpg
- fit.jpg
- racess.jpg
- designer.png
- residential.png
- left-stack.jpg
- right-stack.jpg
- center-opening.jpg
- wand-length.png
- track-white.png
- track-black.png

## Database Schema Suggestions

### Products Table
```sql
CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  handle VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  status ENUM('published', 'draft', 'archived') DEFAULT 'draft',
  type VARCHAR(100),
  thumbnail VARCHAR(500),
  price_amount DECIMAL(10,2),
  price_currency VARCHAR(3) DEFAULT 'usd',
  tags TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Product Images Table
```sql
CREATE TABLE product_images (
  id VARCHAR(50) PRIMARY KEY,
  product_id VARCHAR(50),
  url VARCHAR(500),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Product Categories Table
```sql
CREATE TABLE categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  handle VARCHAR(255)
);

CREATE TABLE product_categories (
  product_id VARCHAR(50),
  category_id VARCHAR(50),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### Product Options Table
```sql
CREATE TABLE product_options (
  id VARCHAR(50) PRIMARY KEY,
  product_id VARCHAR(50),
  parent_option_id VARCHAR(50) NULL,
  title VARCHAR(255),
  description TEXT,
  type VARCHAR(50),
  sort_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (parent_option_id) REFERENCES product_options(id)
);
```

### Option Values Table
```sql
CREATE TABLE option_values (
  id VARCHAR(50) PRIMARY KEY,
  option_id VARCHAR(50),
  label VARCHAR(255),
  image VARCHAR(500),
  sort_order INT DEFAULT 0,
  FOREIGN KEY (option_id) REFERENCES product_options(id)
);
```

### Product Variants Table
```sql
CREATE TABLE product_variants (
  id VARCHAR(50) PRIMARY KEY,
  product_id VARCHAR(50),
  title VARCHAR(255),
  sku VARCHAR(100),
  price_amount DECIMAL(10,2),
  price_currency VARCHAR(3) DEFAULT 'usd',
  inventory_quantity INT DEFAULT 0,
  image VARCHAR(500),
  options_json TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## Implementation Notes

1. **Nested Options**: Some options contain sub-options. The `options` field within an option should contain an array of nested option objects.

2. **Option Types**: Support both "variant" and "color" types. Color types typically show color swatches.

3. **Image Paths**: All image paths should be relative to the public directory or use full URLs if using a CDN.

4. **Currency**: Default currency is "usd" but the system should support multiple currencies.

5. **Inventory**: Track inventory quantities for variants to show availability.

6. **SEO**: The `handle` field is used for SEO-friendly URLs.

## Error Handling

The API should return appropriate HTTP status codes:
- 200: Success
- 404: Product not found
- 400: Invalid parameters
- 500: Server error

Error response format:
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with handle 'invalid-product' not found"
  }
}
```

## Frontend Usage

The frontend will consume this data in the `detail.astro` file:
```javascript
// Current implementation
const Products = [...]; // This will be replaced with API call

// Future implementation
const response = await fetch(`/api/products/${type}/${slug}`);
const { data: product } = await response.json();
```

The `Customization` component expects the product data to match this exact structure for proper rendering of the product configurator.
