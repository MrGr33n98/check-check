# SolarFinder API Documentation

## Overview
This document provides comprehensive documentation for all API endpoints available in the SolarFinder platform, including the newly implemented SaaS management features.

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
Most endpoints require authentication via JWT tokens. To authenticate:

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### Using Authentication Token
Include the token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Categories

### List Categories
```
GET /categories
```

**Query Parameters:**
- `featured` (boolean) - Filter by featured status
- `page` (integer) - Page number for pagination
- `per_page` (integer) - Number of items per page (default: 20)

**Response:**
```json
[
  {
    "id": 1,
    "name": "Geração Distribuída",
    "description": "Soluções para residências, comércios e indústrias",
    "slug": "geracao-distribuida",
    "featured": true,
    "solutions_count": 25,
    "created_at": "2023-01-01T00:00:00Z"
  }
]
```

### Get Category
```
GET /categories/:id
```

**Response:**
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

## Solutions

### List Solutions
```
GET /solutions
```

**Query Parameters:**
- `category_id` (integer) - Filter by category
- `featured` (boolean) - Filter by featured status
- `page` (integer) - Page number for pagination
- `per_page` (integer) - Number of items per page (default: 20)
- `search` (string) - Search by name or company

**Response:**
```json
[
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
]
```

### Get Solution
```
GET /solutions/:id
```

**Response:**
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

## Reviews

### List Reviews
```
GET /reviews
```

**Query Parameters:**
- `solution_id` (integer) - Filter by solution
- `user_id` (integer) - Filter by user
- `rating` (integer) - Filter by rating
- `page` (integer) - Page number for pagination
- `per_page` (integer) - Number of items per page (default: 20)

**Response:**
```json
[
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
]
```

## Leads

### List Leads
```
GET /leads
```

**Query Parameters:**
- `solution_id` (integer) - Filter by solution
- `status` (string) - Filter by status (new_lead, contacted, converted, closed)
- `page` (integer) - Page number for pagination
- `per_page` (integer) - Number of items per page (default: 20)

**Response:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 99999-9999",
    "company": "Empresa Solar",
    "message": "Interessado na solução SolarMax Pro",
    "solution_id": 1,
    "status": "new_lead",
    "created_at": "2023-06-15T10:30:00Z"
  }
]
```

### Create Lead
```
POST /leads
```

**Request Body:**
```json
{
  "lead": {
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 99999-9999",
    "company": "Empresa Solar",
    "message": "Interessado na solução SolarMax Pro",
    "solution_id": 1
  }
}
```

**Response:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 99999-9999",
  "company": "Empresa Solar",
  "message": "Interessado na solução SolarMax Pro",
  "solution_id": 1,
  "status": "new_lead",
  "created_at": "2023-06-15T10:30:00Z"
}
```

## Members (SaaS Management)

### List Members
```
GET /members
```

**Query Parameters:**
- `role` (string) - Filter by role (admin_role, member_role, editor_role)
- `status` (string) - Filter by status (active_status, inactive_status, suspended_status)
- `subscription_plan` (string) - Filter by subscription plan (free_plan, basic_plan, premium_plan, enterprise_plan)
- `subscription_status` (string) - Filter by subscription status (trial_status, active_sub, cancelled_status, expired_status)
- `search` (string) - Search by name, email, or company
- `page` (integer) - Page number for pagination
- `per_page` (integer) - Number of items per page (default: 20)

**Response:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@empresa1.com",
    "company": "Empresa 1",
    "role": "member_role",
    "status": "active_status",
    "subscription_plan": "basic_plan",
    "subscription_status": "active_sub",
    "trial_ends_at": null,
    "expires_at": "2024-08-20T00:00:00Z",
    "created_at": "2023-08-20T00:00:00Z"
  }
]
```

### Get Member
```
GET /members/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@empresa1.com",
  "company": "Empresa 1",
  "role": "member_role",
  "status": "active_status",
  "subscription_plan": "basic_plan",
  "subscription_status": "active_sub",
  "trial_ends_at": null,
  "expires_at": "2024-08-20T00:00:00Z",
  "created_at": "2023-08-20T00:00:00Z"
}
```

### Create Member
```
POST /members
```

**Request Body:**
```json
{
  "member": {
    "name": "João Silva",
    "email": "joao@empresa1.com",
    "company": "Empresa 1",
    "role": "member_role",
    "status": "active_status",
    "subscription_plan": "basic_plan",
    "subscription_status": "active_sub",
    "expires_at": "2024-08-20T00:00:00Z"
  }
}
```

**Response:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@empresa1.com",
  "company": "Empresa 1",
  "role": "member_role",
  "status": "active_status",
  "subscription_plan": "basic_plan",
  "subscription_status": "active_sub",
  "trial_ends_at": null,
  "expires_at": "2024-08-20T00:00:00Z",
  "created_at": "2023-08-20T00:00:00Z"
}
```

## Product Access (SaaS Management)

### List Product Accesses
```
GET /product_accesses
```

**Query Parameters:**
- `member_id` (integer) - Filter by member
- `solution_id` (integer) - Filter by solution
- `access_level` (string) - Filter by access level (view, edit, admin)
- `active` (boolean) - Filter by active status
- `page` (integer) - Page number for pagination
- `per_page` (integer) - Number of items per page (default: 20)

**Response:**
```json
[
  {
    "id": 1,
    "member_id": 1,
    "solution_id": 1,
    "access_level": "view",
    "expires_at": "2024-08-20T00:00:00Z",
    "active": true,
    "member": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@empresa1.com"
    },
    "solution": {
      "id": 1,
      "name": "SolarMax Pro",
      "company": "EnergiaTech"
    }
  }
]
```

### Get Product Access
```
GET /product_accesses/:id
```

**Response:**
```json
{
  "id": 1,
  "member_id": 1,
  "solution_id": 1,
  "access_level": "view",
  "expires_at": "2024-08-20T00:00:00Z",
  "active": true,
  "member": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@empresa1.com"
  },
  "solution": {
    "id": 1,
    "name": "SolarMax Pro",
    "company": "EnergiaTech"
  }
}
```

### Create Product Access
```
POST /product_accesses
```

**Request Body:**
```json
{
  "product_access": {
    "member_id": 1,
    "solution_id": 1,
    "access_level": "view",
    "expires_at": "2024-08-20T00:00:00Z"
  }
}
```

**Response:**
```json
{
  "id": 1,
  "member_id": 1,
  "solution_id": 1,
  "access_level": "view",
  "expires_at": "2024-08-20T00:00:00Z",
  "active": true,
  "member": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@empresa1.com"
  },
  "solution": {
    "id": 1,
    "name": "SolarMax Pro",
    "company": "EnergiaTech"
  }
}
```

## Sponsored Content (SaaS Management)

### List Sponsored Items
```
GET /sponsoreds
```

**Query Parameters:**
- `position` (string) - Filter by position (header, sidebar, footer, category_page, solution_page)
- `status` (string) - Filter by status (draft, active, paused, expired)
- `active` (boolean) - Filter by active status
- `page` (integer) - Page number for pagination
- `per_page` (integer) - Number of items per page (default: 20)

**Response:**
```json
[
  {
    "id": 1,
    "title": "Anúncio Principal 1",
    "description": "Destaque no topo da página",
    "image_url": "https://via.placeholder.com/300x250",
    "link_url": "https://example.com",
    "position": "header",
    "status": "active",
    "priority": 1,
    "starts_at": "2023-08-20T00:00:00Z",
    "ends_at": "2023-09-20T00:00:00Z",
    "active": true
  }
]
```

### Get Sponsored Item
```
GET /sponsoreds/:id
```

**Response:**
```json
{
  "id": 1,
  "title": "Anúncio Principal 1",
  "description": "Destaque no topo da página",
  "image_url": "https://via.placeholder.com/300x250",
  "link_url": "https://example.com",
  "position": "header",
  "status": "active",
  "priority": 1,
  "starts_at": "2023-08-20T00:00:00Z",
  "ends_at": "2023-09-20T00:00:00Z",
  "active": true
}
```

### Create Sponsored Item
```
POST /sponsoreds
```

**Request Body:**
```json
{
  "sponsored": {
    "title": "Anúncio Principal 1",
    "description": "Destaque no topo da página",
    "image_url": "https://via.placeholder.com/300x250",
    "link_url": "https://example.com",
    "position": "header",
    "status": "active",
    "priority": 1,
    "starts_at": "2023-08-20T00:00:00Z",
    "ends_at": "2023-09-20T00:00:00Z"
  }
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Anúncio Principal 1",
  "description": "Destaque no topo da página",
  "image_url": "https://via.placeholder.com/300x250",
  "link_url": "https://example.com",
  "position": "header",
  "status": "active",
  "priority": 1,
  "starts_at": "2023-08-20T00:00:00Z",
  "ends_at": "2023-09-20T00:00:00Z",
  "active": true
}
```

## Articles (Content Management)

### List Articles
```
GET /articles
```

**Query Parameters:**
- `status` (string) - Filter by status (draft, published, archived)
- `category` (string) - Filter by category (news, guides, case_studies, industry, tips)
- `featured` (boolean) - Filter by featured status
- `published` (boolean) - Filter by published status
- `search` (string) - Search by title, excerpt, or content
- `page` (integer) - Page number for pagination
- `per_page` (integer) - Number of items per page (default: 20)

**Response:**
```json
[
  {
    "id": 1,
    "title": "Guia Completo sobre Energia Solar",
    "slug": "guia-completo-sobre-energia-solar",
    "excerpt": "Tudo o que você precisa saber sobre energia solar",
    "status": "published",
    "published_at": "2023-08-20T00:00:00Z",
    "author": "Redator Solar",
    "category": "guides",
    "featured": true
  }
]
```

### Get Article
```
GET /articles/:id
```

**Response:**
```json
{
  "id": 1,
  "title": "Guia Completo sobre Energia Solar",
  "slug": "guia-completo-sobre-energia-solar",
  "excerpt": "Tudo o que você precisa saber sobre energia solar",
  "content": "Conteúdo completo sobre energia solar...",
  "status": "published",
  "published_at": "2023-08-20T00:00:00Z",
  "author": "Redator Solar",
  "category": "guides",
  "featured": true
}
```

### Create Article
```
POST /articles
```

**Request Body:**
```json
{
  "article": {
    "title": "Guia Completo sobre Energia Solar",
    "excerpt": "Tudo o que você precisa saber sobre energia solar",
    "content": "Conteúdo completo sobre energia solar...",
    "author": "Redator Solar",
    "category": "guides",
    "status": "published",
    "published_at": "2023-08-20T00:00:00Z",
    "featured": true
  }
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Guia Completo sobre Energia Solar",
  "slug": "guia-completo-sobre-energia-solar",
  "excerpt": "Tudo o que você precisa saber sobre energia solar",
  "content": "Conteúdo completo sobre energia solar...",
  "status": "published",
  "published_at": "2023-08-20T00:00:00Z",
  "author": "Redator Solar",
  "category": "guides",
  "featured": true
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

### POST /webhooks/category_updated
**Description**: Notification when category is updated

### POST /webhooks/solution_updated
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

This API provides a comprehensive foundation for connecting the React frontend to the Rails backend while enabling full Active Admin control over all application features.