# Auth Services

This directory contains authentication-related services separated from the main API service.

## Structure

```
src/services/auth/
├── index.ts          # Barrel exports for easy importing
├── signup.ts         # User registration service
└── README.md         # This file
```

## Usage

### Signup Service

```typescript
import { signupService } from '../../services/auth';

// Register a new user
const response = await signupService.register({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  phone: '+1234567890',
  username: 'johndoe'
});

// Test API connection
const connectionTest = await signupService.testConnection();
```

## Features

- **Medusa Integration**: Direct integration with Medusa backend API
- **Fallback Support**: Automatically falls back to local storage if backend fails
- **TypeScript Support**: Full type definitions for all interfaces
- **Error Handling**: Comprehensive error handling with detailed logging
- **Testing**: Built-in API connection testing

## Interfaces

### RegisterData
```typescript
interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  username?: string;
}
```

### AuthResponse
```typescript
interface AuthResponse {
  customer: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
  };
  session: {
    id: string;
    token: string;
  };
}
```

## Migration from api.ts

The signup functionality has been moved from the main `api.ts` file to this dedicated service for better organization and maintainability.

**Before:**
```typescript
import { api } from '../../services/api';
const response = await api.register(payload);
```

**After:**
```typescript
import { signupService } from '../../services/auth';
const response = await signupService.register(payload);
```