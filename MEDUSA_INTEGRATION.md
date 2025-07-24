# Medusa API Integration - Signup

## Overview
This document describes the integration of the Medusa e-commerce API for user registration in the Blindzy frontend.

## Configuration

### API Configuration (`src/config/api.ts`)
- **Medusa Base URL**: `http://208.87.135.120:9000`
- **Publishable Key**: `pk_35f5ace6ac7d3be739f9edbf5a4ee494f93bf53432f8673a6446da2556e826c7`

### Environment Variables
The integration uses the following configuration:
- `MEDUSA_BASE_URL`: The base URL for the Medusa backend
- `MEDUSA_PUBLISHABLE_KEY`: The publishable API key for authentication

## API Endpoints

### Register User
- **Endpoint**: `POST /store/customers/register`
- **Headers**: 
  - `Content-Type: application/json`
  - `x-publishable-api-key: {publishable_key}`

### Request Body
```json
{
  "first_name": "string",
  "last_name": "string", 
  "email": "string",
  "phone": "string",
  "username": "string",
  "password": "string"
}
```

### Response
```json
{
  "customer": {
    "id": "string",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "phone": "string"
  },
  "session": {
    "id": "string",
    "access_token": "string"
  }
}
```

## Implementation Details

### API Service (`src/services/api.ts`)
1. **Medusa Request Method**: Added `medusaRequest()` method for Medusa-specific API calls
2. **Register Method**: Updated to use Medusa API with proper error handling
3. **Response Transformation**: Converts Medusa response to match existing `AuthResponse` interface

### Signup Component (`src/components/signUp/signUp.tsx`)
- Uses existing form validation
- Calls `api.register()` with user data
- Handles success/error states
- Stores user session and customer ID in localStorage
- Redirects to user dashboard on success

## Usage

1. **Enable Real API**: Set `USE_SAMPLE_DATA = false` in `src/services/api.ts`
2. **Fill Signup Form**: User provides required information
3. **Submit**: Form calls Medusa register endpoint
4. **Success**: User is redirected to dashboard with session stored

## Error Handling

The integration includes comprehensive error handling:
- Network errors
- API validation errors
- User-friendly error messages
- Console logging for debugging

## Testing

To test the integration:
1. Navigate to `/signUp` page
2. Fill out the registration form
3. Submit and verify the API call is made to Medusa
4. Check browser network tab for the request/response
5. Verify user is redirected on success

## Security Notes

- Publishable key is safe to expose in frontend code
- Sensitive operations require admin API key (not implemented)
- All API calls use HTTPS in production
- User passwords are handled securely by Medusa backend 