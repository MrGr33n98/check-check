#!/bin/bash

# Test API endpoints for SolarFinder integration

echo "Testing SolarFinder API Endpoints"
echo "================================="

# Test categories endpoint
echo "1. Testing Categories Endpoint"
curl -s http://localhost:3000/api/v1/categories | head -20
echo -e "\n"

# Test solutions endpoint
echo "2. Testing Solutions Endpoint"
curl -s http://localhost:3000/api/v1/solutions | head -20
echo -e "\n"

# Test reviews endpoint
echo "3. Testing Reviews Endpoint"
curl -s http://localhost:3000/api/v1/reviews | head -20
echo -e "\n"

# Test specific category
echo "4. Testing Specific Category"
curl -s http://localhost:3000/api/v1/categories/1
echo -e "\n"

# Test specific solution
echo "5. Testing Specific Solution"
curl -s http://localhost:3000/api/v1/solutions/1
echo -e "\n"

echo "API tests completed. Check responses above."