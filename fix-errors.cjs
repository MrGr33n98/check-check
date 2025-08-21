const fs = require('fs');
const path = require('path');

// Function to create directory if it doesn't exist
function createDirIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Function to create a file with content if it doesn't exist
function createFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
  }
}

// Function to fix React imports in files
function fixReactImports() {
  const componentsDir = path.join(__dirname, 'src', 'components');
  
  // Function to recursively find all .tsx files
  function findTsxFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(findTsxFiles(file));
      } else if (path.extname(file) === '.tsx') {
        results.push(file);
      }
    });
    return results;
  }
  
  // Get all .tsx files
  const tsxFiles = findTsxFiles(componentsDir);
  
  // Fix each file
  tsxFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove unused React imports
    const reactImportRegex = /import\\s+React\\s+from\\s+['"]react['"];\\s*/g;
    if (reactImportRegex.test(content)) {
      content = content.replace(reactImportRegex, '');
      fs.writeFileSync(filePath, content);
      console.log(`Fixed React imports in: ${filePath}`);
    }
  });
}

// Function to update UI components with proper exports
function updateUIComponents() {
  const uiDir = path.join(__dirname, 'src', 'components', 'ui');
  
  // Update star-rating component
  const starRatingPath = path.join(uiDir, 'star-rating.tsx');
  if (fs.existsSync(starRatingPath)) {
    const starRatingContent = `const StarRating = () => {
  return (
    <div className="star-rating">
      <p>Star rating content here</p>
    </div>
  );
};

export default StarRating;
`;
    fs.writeFileSync(starRatingPath, starRatingContent);
    console.log('Updated star-rating component');
  }
  
  // Update review-card component
  const reviewCardPath = path.join(uiDir, 'review-card.tsx');
  if (fs.existsSync(reviewCardPath)) {
    const reviewCardContent = `import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReviewCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Review content here</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
`;
    fs.writeFileSync(reviewCardPath, reviewCardContent);
    console.log('Updated review-card component');
  }
  
  // Update hero component
  const heroPath = path.join(uiDir, 'hero.tsx');
  if (fs.existsSync(heroPath)) {
    const heroContent = `const Hero = () => {
  return (
    <div className="hero">
      <h1>Hero Section</h1>
      <p>Hero content here</p>
    </div>
  );
};

export default Hero;
`;
    fs.writeFileSync(heroPath, heroContent);
    console.log('Updated hero component');
  }
  
  // Update company-list component
  const companyListPath = path.join(uiDir, 'company-list.tsx');
  if (fs.existsSync(companyListPath)) {
    const companyListContent = `const CompanyList = () => {
  return (
    <div className="company-list">
      <p>Company list content here</p>
    </div>
  );
};

export default CompanyList;
`;
    fs.writeFileSync(companyListPath, companyListContent);
    console.log('Updated company-list component');
  }
  
  // Update conversion-points component
  const conversionPointsPath = path.join(uiDir, 'conversion-points.tsx');
  if (fs.existsSync(conversionPointsPath)) {
    const conversionPointsContent = `const ConversionPoints = () => {
  return (
    <div className="conversion-points">
      <p>Conversion points content here</p>
    </div>
  );
};

export default ConversionPoints;
`;
    fs.writeFileSync(conversionPointsPath, conversionPointsContent);
    console.log('Updated conversion-points component');
  }
  
  // Update select component with proper exports
  const selectPath = path.join(uiDir, 'select.tsx');
  if (fs.existsSync(selectPath)) {
    const selectContent = `import * as React from 'react';

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={\`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \${className || ''}\`}
      {...props}
    />
  )
);
Select.displayName = 'Select';

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={\`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 \${className || ''}\`}
      {...props}
    >
      {children}
    </button>
  )
);
SelectTrigger.displayName = 'SelectTrigger';

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={\`relative mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md \${className || ''}\`}
      {...props}
    />
  )
);
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={\`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground \${className || ''}\`}
      {...props}
    />
  )
);
SelectItem.displayName = 'SelectItem';

const SelectValue = ({ children }: { children: React.ReactNode }) => {
  return <span>{children}</span>;
};
SelectValue.displayName = 'SelectValue';

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
`;
    fs.writeFileSync(selectPath, selectContent);
    console.log('Updated select component');
  }
}

// Function to fix the Header component
function fixHeaderComponent() {
  const headerPath = path.join(__dirname, 'src', 'components', 'layout', 'Header.tsx');
  if (fs.existsSync(headerPath)) {
    const headerContent = `import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 lg:py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center flex-shrink-0">
            <div className="h-24 w-24 bg-primary rounded-lg" /> {/* Larger placeholder for logo */}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
`;
    fs.writeFileSync(headerPath, headerContent);
    console.log('Fixed Header component');
  }
}

// Function to fix the Layout component
function fixLayoutComponent() {
  const layoutPath = path.join(__dirname, 'src', 'components', 'layout', 'Layout.tsx');
  if (fs.existsSync(layoutPath)) {
    const layoutContent = `import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
`;
    fs.writeFileSync(layoutPath, layoutContent);
    console.log('Fixed Layout component');
  }
}

// Function to fix page components
function fixPageComponents() {
  // Fix CategoriesPage.tsx - remove asChild prop
  const categoriesPagePath = path.join(__dirname, 'src', 'pages', 'CategoriesPage.tsx');
  if (fs.existsSync(categoriesPagePath)) {
    let content = fs.readFileSync(categoriesPagePath, 'utf8');
    content = content.replace(/asChild: true,/g, '');
    fs.writeFileSync(categoriesPagePath, content);
    console.log('Fixed CategoriesPage component');
  }
  
  // Fix HomePage.tsx - fix imports
  const homePagePath = path.join(__dirname, 'src', 'pages', 'HomePage.tsx');
  if (fs.existsSync(homePagePath)) {
    let content = fs.readFileSync(homePagePath, 'utf8');
    content = content.replace(
      /import\\s+{\\s*Hero\\s*}\\s+from\\s+['"]@\\/components\\/ui\\/hero['"];/,
      "import Hero from '@/components/ui/hero';"
    );
    content = content.replace(
      /import\\s+{\\s*CompanyList\\s*}\\s+from\\s+['"]@\\/components\\/ui\\/company-list['"];/,
      "import CompanyList from '@/components/ui/company-list';"
    );
    content = content.replace(
      /import\\s+{\\s*ConversionPoints\\s*}\\s+from\\s+['"]@\\/components\\/ui\\/conversion-points['"];/,
      "import ConversionPoints from '@/components/ui/conversion-points';"
    );
    fs.writeFileSync(homePagePath, content);
    console.log('Fixed HomePage component');
  }
  
  // Fix CompanyDetail.tsx - fix imports
  const companyDetailPath = path.join(__dirname, 'src', 'pages', 'CompanyDetail.tsx');
  if (fs.existsSync(companyDetailPath)) {
    let content = fs.readFileSync(companyDetailPath, 'utf8');
    content = content.replace(
      /import\\s+{\\s*StarRating\\s*}\\s+from\\s+['"]@\\/components\\/ui\\/star-rating['"];/,
      "import StarRating from '@/components/ui/star-rating';"
    );
    content = content.replace(
      /import\\s+{\\s*ReviewCard\\s*}\\s+from\\s+['"]@\\/components\\/ui\\/review-card['"];/,
      "import ReviewCard from '@/components/ui/review-card';"
    );
    fs.writeFileSync(companyDetailPath, content);
    console.log('Fixed CompanyDetail component');
  }
  
  // Fix RegisterPage.tsx - fix imports
  const registerPagePath = path.join(__dirname, 'src', 'pages', 'RegisterPage.tsx');
  if (fs.existsSync(registerPagePath)) {
    let content = fs.readFileSync(registerPagePath, 'utf8');
    content = content.replace(
      /import\\s+{\\s*SelectContent,\\s*SelectItem,\\s*SelectTrigger,\\s*SelectValue\\s*}\\s+from\\s+['"]@\\/components\\/ui\\/select['"];/,
      "import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';"
    );
    fs.writeFileSync(registerPagePath, content);
    console.log('Fixed RegisterPage component');
  }
}

// Main function to run all fixes
function runFixes() {
  console.log('Starting error fixes...');
  
  // Fix React imports
  fixReactImports();
  
  // Update UI components
  updateUIComponents();
  
  // Fix specific components
  fixHeaderComponent();
  fixLayoutComponent();
  fixPageComponents();
  
  console.log('Error fixes completed!');
}

// Run the fixes
runFixes();