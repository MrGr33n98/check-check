#!/bin/bash

# Test all new SaaS API endpoints

echo "Testing SaaS Management API Endpoints"
echo "====================================="

# Test Members endpoint
echo "1. Testing Members Endpoint"
curl -s http://localhost:3000/api/v1/members | head -10
echo -e "\n"

# Test Product Accesses endpoint
echo "2. Testing Product Accesses Endpoint"
curl -s http://localhost:3000/api/v1/product_accesses | head -10
echo -e "\n"

# Test Sponsoreds endpoint
echo "3. Testing Sponsoreds Endpoint"
curl -s http://localhost:3000/api/v1/sponsoreds | head -10
echo -e "\n"

# Test Articles endpoint
echo "4. Testing Articles Endpoint"
curl -s http://localhost:3000/api/v1/articles | head -10
echo -e "\n"

# Test specific member
echo "5. Testing Specific Member"
curl -s http://localhost:3000/api/v1/members/1
echo -e "\n"

# Test specific product access
echo "6. Testing Specific Product Access"
curl -s http://localhost:3000/api/v1/product_accesses/1
echo -e "\n"

# Test specific sponsored item
echo "7. Testing Specific Sponsored Item"
curl -s http://localhost:3000/api/v1/sponsoreds/1
echo -e "\n"

# Test specific article
echo "8. Testing Specific Article"
curl -s http://localhost:3000/api/v1/articles/1
echo -e "\n"

echo "API tests completed. Check responses above."