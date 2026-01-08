# shadcn/ui Integration Guide

## Overview
This project has been successfully integrated with shadcn/ui, a collection of re-usable components built with Radix UI and Tailwind CSS.

## What's Installed

### Dependencies
- `class-variance-authority` - For component variants
- `clsx` - For conditional class names  
- `tailwind-merge` - For merging Tailwind classes
- `lucide-react` - Modern icon library
- `@radix-ui/react-slot` - Radix UI primitive for Button component

### Configuration
- Path aliases configured: `@/*` maps to `./src/*`
- Tailwind CSS v4 with shadcn/ui theme system
- CSS variables for theming (supports light/dark mode)
- `components.json` for shadcn/ui CLI configuration

### Components Available
Currently implemented:
- ✅ Button (with variants: default, destructive, outline, secondary, ghost, link)
- ✅ Card (with CardHeader, CardTitle, CardDescription, CardContent, CardFooter)

## How to Add More Components

You can easily add more shadcn/ui components using the CLI:

```bash
# Add a specific component
npx shadcn@latest add [component-name]

# Examples:
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add select
npx shadcn@latest add table
```

Or manually create components in `src/components/ui/` following the same pattern.

## Popular Components to Consider

### Form Components
- `input` - Text input field
- `textarea` - Multi-line text input
- `select` - Dropdown select
- `checkbox` - Checkbox input
- `radio-group` - Radio button group
- `switch` - Toggle switch
- `label` - Form label
- `form` - Form wrapper with validation

### Feedback Components
- `alert` - Alert messages
- `alert-dialog` - Modal dialogs for important messages
- `toast` - Toast notifications
- `progress` - Progress bar
- `skeleton` - Loading skeleton
- `badge` - Status badges

### Navigation Components
- `dropdown-menu` - Dropdown menus
- `navigation-menu` - Navigation bar
- `tabs` - Tab navigation
- `breadcrumb` - Breadcrumb navigation

### Layout Components
- `dialog` - Modal dialog
- `sheet` - Slide-out panel
- `popover` - Popover overlay
- `accordion` - Collapsible sections
- `separator` - Horizontal/vertical separator

### Data Display
- `table` - Data table
- `avatar` - User avatar
- `calendar` - Date picker calendar
- `command` - Command palette

## Usage Examples

### Button Variants
```tsx
import { Button } from '@/components/ui/button';

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card Component
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Using Icons
```tsx
import { Package, User, Settings } from 'lucide-react';

<Button>
  <Package className="h-4 w-4 mr-2" />
  View Package
</Button>
```

## Theming

The project supports light and dark modes through CSS variables defined in `src/index.css`. To enable dark mode, add the `dark` class to the root element:

```tsx
<html className="dark">
```

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## Next Steps

Consider adding these components based on your needs:
1. **Input** and **Form** - For the "Criar Entrega" form
2. **Dialog** or **Sheet** - For modals when performing actions
3. **Table** - For better data display in lists
4. **Badge** - For status indicators
5. **Alert** or **Toast** - For success/error messages
