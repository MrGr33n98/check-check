# SolarFinder - SaaS Management Features

## Overview
This document outlines the comprehensive SaaS management features implemented for the SolarFinder platform. These features enable complete control over membership, product access, sponsored content, and articles through both API endpoints and the Active Admin interface.

## 1. SaaS Membership Management

### 1.1 Member Model
- **Fields**: name, email, company, role, status, subscription_plan, subscription_status, trial_ends_at, expires_at, slug
- **Roles**: admin_role, member_role, editor_role
- **Statuses**: active_status, inactive_status, suspended_status
- **Subscription Plans**: free_plan, basic_plan, premium_plan, enterprise_plan
- **Subscription Statuses**: trial_status, active_sub, cancelled_status, expired_status

### 1.2 API Endpoints
- `GET /api/v1/members` - List all members with filtering and pagination
- `GET /api/v1/members/:id` - Get specific member details
- `POST /api/v1/members` - Create new member
- `PUT/PATCH /api/v1/members/:id` - Update member
- `DELETE /api/v1/members/:id` - Delete member

### 1.3 Active Admin Features
- Member list with status indicators
- Filtering by role, status, subscription plan, and subscription status
- Search functionality
- Batch actions for activating/suspending members
- Detailed member view with product access information

## 2. Product Access Management

### 2.1 ProductAccess Model
- **Fields**: member_id, solution_id, access_level, expires_at
- **Access Levels**: view, edit, admin

### 2.2 API Endpoints
- `GET /api/v1/product_accesses` - List all product accesses with filtering
- `GET /api/v1/product_accesses/:id` - Get specific product access
- `POST /api/v1/product_accesses` - Create new product access
- `PUT/PATCH /api/v1/product_accesses/:id` - Update product access
- `DELETE /api/v1/product_accesses/:id` - Delete product access

### 2.3 Active Admin Features
- Product access list with expiration indicators
- Filtering by member, solution, and access level
- Batch actions for extending access or revoking access
- Detailed view showing member and solution information

## 3. Sponsored Content Management

### 3.1 Sponsored Model
- **Fields**: title, description, image_url, link_url, position, status, starts_at, ends_at, priority
- **Positions**: header, sidebar, footer, category_page, solution_page
- **Statuses**: draft, active, paused, expired

### 3.2 API Endpoints
- `GET /api/v1/sponsoreds` - List all sponsored items with filtering
- `GET /api/v1/sponsoreds/:id` - Get specific sponsored item
- `POST /api/v1/sponsoreds` - Create new sponsored item
- `PUT/PATCH /api/v1/sponsoreds/:id` - Update sponsored item
- `DELETE /api/v1/sponsoreds/:id` - Delete sponsored item

### 3.3 Active Admin Features
- Sponsored items list with position and status indicators
- Filtering by position and status
- Batch actions for activating/pausing sponsored items
- Detailed view with scheduling information

## 4. Article Management

### 4.1 Article Model
- **Fields**: title, slug, content, excerpt, status, published_at, author, category, featured
- **Statuses**: draft, published, archived
- **Categories**: news, guides, case_studies, industry, tips

### 4.2 API Endpoints
- `GET /api/v1/articles` - List all articles with filtering
- `GET /api/v1/articles/:id` - Get specific article
- `POST /api/v1/articles` - Create new article
- `PUT/PATCH /api/v1/articles/:id` - Update article
- `DELETE /api/v1/articles/:id` - Delete article

### 4.3 Active Admin Features
- Article list with publication status
- Filtering by category, status, and featured flag
- Batch actions for publishing/archiving articles
- Rich text editor for content
- Detailed view with preview

## 5. Frontend Integration Guide

### 5.1 API Usage Examples

#### Fetch Members
```javascript
// Get all members
fetch('/api/v1/members')
  .then(response => response.json())
  .then(data => console.log(data));

// Get members with specific subscription plan
fetch('/api/v1/members?subscription_plan=premium_plan')
  .then(response => response.json())
  .then(data => console.log(data));

// Get active members
fetch('/api/v1/members?status=active_status')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### Fetch Product Access
```javascript
// Get all product accesses
fetch('/api/v1/product_accesses')
  .then(response => response.json())
  .then(data => console.log(data));

// Get accesses for specific member
fetch('/api/v1/product_accesses?member_id=1')
  .then(response => response.json())
  .then(data => console.log(data));

// Get active accesses
fetch('/api/v1/product_accesses?active=true')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### Fetch Sponsored Content
```javascript
// Get all sponsored items
fetch('/api/v1/sponsoreds')
  .then(response => response.json())
  .then(data => console.log(data));

// Get active sponsored items in header position
fetch('/api/v1/sponsoreds?position=header&active=true')
  .then(response => response.json())
  .then(data => console.log(data));

// Get sponsored items ordered by priority
fetch('/api/v1/sponsoreds?sort=priority')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### Fetch Articles
```javascript
// Get all articles
fetch('/api/v1/articles')
  .then(response => response.json())
  .then(data => console.log(data));

// Get published articles
fetch('/api/v1/articles?status=published')
  .then(response => response.json())
  .then(data => console.log(data));

// Get featured articles in guides category
fetch('/api/v1/articles?category=guides&featured=true')
  .then(response => response.json())
  .then(data => console.log(data));

// Search articles
fetch('/api/v1/articles?search=solar')
  .then(response => response.json())
  .then(data => console.log(data));
```

### 5.2 Authentication
All API endpoints can be secured with JWT token authentication. To authenticate:

```javascript
// Login to get token
fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password'
  })
})
.then(response => response.json())
.then(data => {
  localStorage.setItem('token', data.token);
});

// Use token for authenticated requests
const token = localStorage.getItem('token');
fetch('/api/v1/members', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

## 6. Admin Interface Features

### 6.1 Dashboard
The Active Admin dashboard provides an overview of all SaaS metrics:
- Total members and active members
- Product access count
- Sponsored items and active count
- Articles and published count

### 6.2 Filtering and Searching
Each admin section includes:
- Advanced filtering options
- Search functionality
- Sorting capabilities
- Pagination controls

### 6.3 Batch Actions
Common batch operations:
- Activate/suspend members
- Extend/revoke product access
- Publish/archive articles
- Activate/pause sponsored items

### 6.4 Detailed Views
Each resource includes:
- Comprehensive attribute display
- Related resource tables
- Comment threads for collaboration
- Audit trails

## 7. Data Relationships

### 7.1 Member Relationships
- Members have many ProductAccess records
- Members have many Solutions through ProductAccess
- Members have unique slugs for friendly URLs

### 7.2 Product Access Relationships
- ProductAccess belongs to Member
- ProductAccess belongs to Solution
- ProductAccess tracks access level and expiration

### 7.3 Sponsored Relationships
- Sponsored items are standalone entities
- Positioned in specific page locations
- Scheduled with start/end dates

### 7.4 Article Relationships
- Articles belong to categories
- Articles have authors
- Articles support featured flag

## 8. Best Practices for Frontend Implementation

### 8.1 Data Loading
```javascript
// Implement loading states
const [loading, setLoading] = useState(true);
const [members, setMembers] = useState([]);

useEffect(() => {
  fetch('/api/v1/members')
    .then(response => response.json())
    .then(data => {
      setMembers(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching members:', error);
      setLoading(false);
    });
}, []);
```

### 8.2 Error Handling
```javascript
// Handle API errors gracefully
const handleError = (error) => {
  if (error.response && error.response.status === 401) {
    // Redirect to login
    localStorage.removeItem('token');
    window.location.href = '/login';
  } else {
    // Show user-friendly error message
    alert('An error occurred. Please try again.');
  }
};
```

### 8.3 Caching Strategy
```javascript
// Implement caching for better performance
const CACHE_KEY = 'members_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedMembers = () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  return null;
};

const setCachedMembers = (data) => {
  const cache = {
    data: data,
    timestamp: Date.now()
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};
```

## 9. Security Considerations

### 9.1 Authentication
- JWT tokens with expiration
- Secure password hashing
- Role-based access control

### 9.2 Authorization
- API endpoints secured by authentication
- Admin interface protected by Devise
- Granular permissions for different user roles

### 9.3 Data Protection
- Encrypted sensitive data
- Secure database connections
- Regular security audits

## 10. Performance Optimization

### 10.1 Database Indexes
- Indexed frequently queried fields
- Composite indexes for complex queries
- Foreign key constraints for data integrity

### 10.2 API Caching
- HTTP caching headers
- ETags for conditional requests
- CDN integration for static assets

### 10.3 Pagination
- Configurable page sizes
- Cursor-based pagination for large datasets
- Efficient counting algorithms

This comprehensive SaaS management system provides all the tools needed to operate a successful solar energy platform with membership, product access control, sponsored content, and article publishing capabilities.