# SolarFinder API Endpoints Specification

## Overview
This document defines the API endpoints required for the SolarFinder application to communicate with the Rails backend. These endpoints will support both the public frontend and the Active Admin interface.

## Authentication Endpoints

### POST /api/v1/auth/login
**Description**: User login
**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response**:
```json
{
  "token": "jwt.token.here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "admin",
    "name": "John Doe"
  }
}
```

### POST /api/v1/auth/logout
**Description**: User logout
**Headers**: Authorization: Bearer <token>
**Response**: 200 OK

### POST /api/v1/auth/register
**Description**: User registration
**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "user"
}
```
**Response**: 201 Created with user object

### POST /api/v1/auth/password/reset
**Description**: Password reset request
**Request Body**:
```json
{
  "email": "user@example.com"
}
```
**Response**: 200 OK

## Category Endpoints

### GET /api/v1/categories
**Description**: List all categories
**Query Parameters**:
- page (integer)
- per_page (integer, default: 20)
- sort (string, default: "name")
- order (string, "asc" or "desc")
**Response**:
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Geração Distribuída",
      "description": "Soluções para residências, comércios e indústrias",
      "slug": "geracao-distribuida",
      "featured": true,
      "solutions_count": 25,
      "created_at": "2023-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 5,
    "total_count": 45
  }
}
```

### GET /api/v1/categories/:id
**Description**: Get specific category
**Response**:
```json
{
  "id": 1,
  "name": "Geração Distribuída",
  "description": "Soluções para residências, comércios e indústrias",
  "long_description": "Detailed description...",
  "slug": "geracao-distribuida",
  "featured": true,
  "features": [
    "Redução significativa na conta de luz",
    "Valorização do imóvel"
  ],
  "segments": [
    {"name": "Residencial", "percentage": 45},
    {"name": "Comercial", "percentage": 35}
  ]
}
```

### POST /api/v1/categories
**Description**: Create new category (admin only)
**Headers**: Authorization: Bearer <admin_token>
**Request Body**:
```json
{
  "name": "New Category",
  "description": "Category description",
  "long_description": "Detailed description",
  "featured": false,
  "features": ["Feature 1", "Feature 2"]
}
```
**Response**: 201 Created with category object

### PUT /api/v1/categories/:id
**Description**: Update category (admin only)
**Headers**: Authorization: Bearer <admin_token>
**Request Body**: Same as POST
**Response**: 200 OK with updated category

### DELETE /api/v1/categories/:id
**Description**: Delete category (admin only)
**Headers**: Authorization: Bearer <admin_token>
**Response**: 204 No Content

## Solution/Company Endpoints

### GET /api/v1/solutions
**Description**: List all solutions
**Query Parameters**:
- category_id (integer)
- featured (boolean)
- page (integer)
- per_page (integer, default: 20)
- sort (string, default: "name")
- order (string, "asc" or "desc")
- search (string)
**Response**:
```json
{
  "solutions": [
    {
      "id": 1,
      "name": "SolarMax Pro",
      "company": "EnergiaTech",
      "rating": 4.8,
      "reviews_count": 124,
      "description": "Sistema completo de monitoramento",
      "featured": true,
      "tags": ["Fácil de usar", "Bom custo-benefício"],
      "logo_url": "https://example.com/logo.png"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 10,
    "total_count": 195
  }
}
```

### GET /api/v1/solutions/:id
**Description**: Get specific solution
**Response**:
```json
{
  "id": 1,
  "name": "SolarMax Pro",
  "company": "EnergiaTech",
  "rating": 4.8,
  "reviews_count": 124,
  "description": "Sistema completo de monitoramento",
  "long_description": "Detailed description...",
  "featured": true,
  "tags": ["Fácil de usar", "Bom custo-benefício"],
  "logo_url": "https://example.com/logo.png",
  "website": "https://solar-max-pro.com",
  "category_ids": [1, 3],
  "created_at": "2023-01-01T00:00:00Z"
}
```

### POST /api/v1/solutions
**Description**: Create new solution (admin/company)
**Headers**: Authorization: Bearer <token>
**Request Body**:
```json
{
  "name": "New Solution",
  "company": "Company Name",
  "description": "Solution description",
  "long_description": "Detailed description",
  "featured": false,
  "tags": ["Tag 1", "Tag 2"],
  "website": "https://new-solution.com",
  "category_ids": [1, 2]
}
```
**Response**: 201 Created with solution object

### PUT /api/v1/solutions/:id
**Description**: Update solution (admin/company owner)
**Headers**: Authorization: Bearer <token>
**Request Body**: Same as POST
**Response**: 200 OK with updated solution

### DELETE /api/v1/solutions/:id
**Description**: Delete solution (admin/company owner)
**Headers**: Authorization: Bearer <token>
**Response**: 204 No Content

## Review Endpoints

### GET /api/v1/reviews
**Description**: List all reviews
**Query Parameters**:
- solution_id (integer)
- user_id (integer)
- rating (integer)
- page (integer)
- per_page (integer, default: 20)
**Response**:
```json
{
  "reviews": [
    {
      "id": 1,
      "user_id": 5,
      "solution_id": 3,
      "rating": 5,
      "title": "Excelente solução",
      "comment": "Muito satisfeito com os resultados",
      "user_name": "Maria Silva",
      "created_at": "2023-06-15T10:30:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 3,
    "total_count": 55
  }
}
```

### POST /api/v1/reviews
**Description**: Create new review
**Headers**: Authorization: Bearer <token>
**Request Body**:
```json
{
  "solution_id": 3,
  "rating": 5,
  "title": "Excelente solução",
  "comment": "Muito satisfeito com os resultados"
}
```
**Response**: 201 Created with review object

### PUT /api/v1/reviews/:id
**Description**: Update review (owner only)
**Headers**: Authorization: Bearer <token>
**Request Body**: Same as POST (partial updates allowed)
**Response**: 200 OK with updated review

### DELETE /api/v1/reviews/:id
**Description**: Delete review (admin/owner)
**Headers**: Authorization: Bearer <token>
**Response**: 204 No Content

## User Management Endpoints

### GET /api/v1/users
**Description**: List users (admin only)
**Headers**: Authorization: Bearer <admin_token>
**Query Parameters**:
- role (string)
- active (boolean)
- page (integer)
- per_page (integer, default: 20)
**Response**:
```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin",
      "active": true,
      "created_at": "2023-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 1,
    "total_count": 5
  }
}
```

### GET /api/v1/users/:id
**Description**: Get specific user (admin/user self)
**Headers**: Authorization: Bearer <token>
**Response**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "active": true,
  "solutions_count": 3,
  "reviews_count": 12,
  "created_at": "2023-01-01T00:00:00Z"
}
```

### PUT /api/v1/users/:id
**Description**: Update user (admin/user self)
**Headers**: Authorization: Bearer <token>
**Request Body**:
```json
{
  "name": "New Name",
  "email": "new@example.com"
}
```
**Response**: 200 OK with updated user

### DELETE /api/v1/users/:id
**Description**: Delete user (admin only)
**Headers**: Authorization: Bearer <admin_token>
**Response**: 204 No Content

### PUT /api/v1/users/:id/activate
**Description**: Activate user (admin only)
**Headers**: Authorization: Bearer <admin_token>
**Response**: 200 OK

### PUT /api/v1/users/:id/deactivate
**Description**: Deactivate user (admin only)
**Headers**: Authorization: Bearer <admin_token>
**Response**: 200 OK

## Statistics Endpoints

### GET /api/v1/statistics/categories
**Description**: Get category statistics
**Response**:
```json
{
  "total_categories": 9,
  "featured_categories": 5,
  "categories_by_solutions": [
    {"name": "Geração Distribuída", "count": 45},
    {"name": "Armazenamento", "count": 32}
  ]
}
```

### GET /api/v1/statistics/solutions
**Description**: Get solution statistics
**Response**:
```json
{
  "total_solutions": 195,
  "featured_solutions": 12,
  "solutions_by_category": [
    {"category": "Geração Distribuída", "count": 45},
    {"category": "Armazenamento", "count": 32}
  ]
}
```

### GET /api/v1/statistics/users
**Description**: Get user statistics
**Response**:
```json
{
  "total_users": 1245,
  "active_users": 980,
  "users_by_role": [
    {"role": "admin", "count": 3},
    {"role": "company", "count": 45},
    {"role": "user", "count": 1197}
  ]
}
```

## File Upload Endpoints

### POST /api/v1/upload
**Description**: Upload files (images, documents)
**Headers**: 
- Authorization: Bearer <token>
- Content-Type: multipart/form-data
**Body**: File data
**Response**:
```json
{
  "url": "https://example.com/uploads/file.png",
  "filename": "file.png",
  "size": 102400
}
```

## Search Endpoints

### GET /api/v1/search
**Description**: Search across categories and solutions
**Query Parameters**:
- q (string) - search query
- type (string) - "categories", "solutions", or "all"
**Response**:
```json
{
  "categories": [...],
  "solutions": [...]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": {
    "email": ["can't be blank"],
    "password": ["is too short (minimum is 6 characters)"]
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## Rate Limiting

All endpoints are subject to rate limiting:
- 100 requests per minute for authenticated users
- 50 requests per minute for anonymous users
- 1000 requests per minute for admin users

## Webhook Endpoints (for future integration)

### POST /api/v1/webhooks/category_updated
**Description**: Notification when category is updated

### POST /api/v1/webhooks/solution_updated
**Description**: Notification when solution is updated

## Implementation Priority

### Phase 1 (High Priority)
1. Authentication endpoints
2. Category CRUD endpoints
3. Solution CRUD endpoints
4. User management endpoints

### Phase 2 (Medium Priority)
1. Review endpoints
2. Statistics endpoints
3. Search endpoints
4. File upload endpoints

### Phase 3 (Low Priority)
1. Webhook endpoints
2. Advanced filtering
3. Bulk operations
4. Export endpoints

This API specification provides a comprehensive foundation for connecting the React frontend to the Rails backend while enabling full Active Admin control over all application features.