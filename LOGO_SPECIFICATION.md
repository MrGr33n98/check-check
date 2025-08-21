# Logo Specification for SolarFinder

## Current Logo Location
The logo is currently located at:
`/Users/felipemorais/Desktop/Solar-finder/src/assets/logo.png`

## Logo Requirements

### Dimensions
- **Optimal size**: 200px width × 60px height
- **Minimum size**: 100px width × 30px height
- **Maximum size**: 400px width × 120px height
- **Aspect ratio**: Maintain 10:3 ratio for best appearance

### File Format
- **Primary**: PNG with transparent background
- **Alternative**: SVG for scalability
- **Backup**: JPG (if transparency is not required)

### Color Scheme
- **Primary colors**: Solar yellow/orange (#F59E0B or #F97316)
- **Secondary colors**: Sky blue (#3B82F6) or clean white
- **Accent colors**: Green (#10B981) for sustainability theme

### Design Elements
1. **Symbol/Icon**:
   - Sun or solar panel representation
   - Clean, modern design
   - Recognizable at small sizes

2. **Text**:
   - "SolarFinder" text
   - Sans-serif font (Helvetica, Arial, or similar)
   - Clear legibility at all sizes

3. **Style**:
   - Flat design (no gradients or shadows)
   - Minimalist approach
   - Professional appearance

### Usage Guidelines

#### Web Implementation
- Use responsive sizing with CSS
- Implement `srcset` for different resolutions
- Optimize file size (<50KB for PNG)

#### Placement
- Header navigation (height: 32px)
- Mobile menu (height: 24px)
- Footer (height: 24px)
- Marketing materials (variable sizes)

### Responsive Behavior
- Scale proportionally to container
- Maintain readability at small sizes
- Hide text label on very small screens (keep only icon)

### Accessibility
- Provide meaningful `alt` text: "SolarFinder Logo"
- Ensure sufficient contrast ratio (4.5:1 minimum)
- Avoid text in images when possible

## Implementation Notes

The current implementation in `Header.tsx` uses:
```jsx
<img 
  src={logo} 
  alt="SolarFinder Logo" 
  className="h-8 w-auto"
/>
```

This ensures:
- Consistent height of 32px (h-8 in Tailwind)
- Automatic width calculation (w-auto)
- Proper alt text for accessibility
- Responsive scaling

For different contexts, adjust the height class:
- Mobile: `h-6` (24px)
- Desktop: `h-8` (32px)
- Large displays: `h-10` (40px)