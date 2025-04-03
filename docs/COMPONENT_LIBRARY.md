
# Component Library

AdvisorWiz uses a comprehensive component library built on top of Shadcn UI and Tailwind CSS. This document provides an overview of the available components and guidelines for their use.

## Core UI Components

These base components form the foundation of the UI:

### Layout Components

- **AppLayout**: Main application layout with header and footer
- **MobileLayout**: Responsive layout for mobile views
- **BaseLayout**: Foundational layout with customizable elements
- **DashboardLayout**: Layout with sidebar for dashboard views

### Interactive Elements

- **Button**: Various button styles with different variants
- **Input**: Text input fields with validation support
- **Select**: Dropdown selection component
- **Checkbox**: Toggle checkbox component
- **RadioGroup**: Radio button group component
- **Switch**: Toggle switch component
- **Slider**: Range slider component
- **DatePicker**: Calendar-based date selection
- **FileUpload**: File upload with preview

### Content Containers

- **Card**: Content container with header, content, and footer sections
- **Dialog**: Modal dialog boxes
- **Drawer**: Side panel that slides in from edges
- **Tabs**: Tabbed interface component
- **Accordion**: Collapsible content panels
- **Popover**: Floating content panel

### Navigation Components

- **NavigationMenu**: Primary navigation component
- **Breadcrumb**: Hierarchical page navigation
- **Pagination**: Page navigation for lists
- **SideBar**: Collapsible side navigation

### Feedback Components

- **Toast**: Transient notifications
- **Alert**: Important message containers
- **Progress**: Progress indicators
- **Skeleton**: Loading placeholders
- **Spinner**: Loading spinner animation
- **Badge**: Small status indicators

## Feature-Specific Components

These components are designed for specific application features:

### Authentication

- **SignInForm**: User login form
- **SignUpForm**: User registration form
- **AuthFormContainer**: Layout for authentication forms

### Matching System

- **MatchCard**: Display for advisor-consumer compatibility
- **MatchExplanation**: Shows reasons for match scores
- **MatchFilterSort**: Interface for filtering and sorting matches

### Profiles

- **ProfileHeader**: Profile summary display
- **ProfileSection**: Container for profile information categories
- **ProfilePictureUpload**: Image upload and cropping for profiles

### Scheduling

- **AppointmentCalendar**: Calendar view for appointments
- **AppointmentItem**: Individual appointment display
- **AppointmentDetailsDialog**: Detailed appointment information

### Communication

- **ChatWindow**: Interface for messaging between users
- **MessageBubble**: Individual message display
- **CallInterface**: Video/audio call interface

## Using the Component Library

### Component Imports

Import components from their respective files:

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
```

### Tailwind Integration

Components use Tailwind classes and can be further customized:

```typescript
<Button className="bg-primary-600 hover:bg-primary-700">
  Custom Button
</Button>
```

### Component Variants

Many components support variants through the `variant` prop:

```typescript
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

### Responsive Design

Components are designed to be responsive, but you can add specific responsive behavior:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Content 1</Card>
  <Card>Content 2</Card>
  <Card>Content 3</Card>
</div>
```

## Accessibility

Our components follow accessibility best practices:

- All interactive components are keyboard navigable
- Form elements have proper labeling
- Appropriate ARIA attributes are used
- Color contrast meets WCAG standards

## Component Examples

### Basic Card Example

```tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ExampleCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  );
};
```

### Form Example

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ExampleForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

## Custom Theming

The component library supports theming through Tailwind's configuration. See `tailwind.config.js` for details on customizing colors, spacing, and other design tokens.

## Contributing New Components

When creating new components:

1. Follow the established naming conventions
2. Ensure components are accessible
3. Include proper TypeScript types
4. Write documentation comments
5. Consider responsive behavior
6. Follow the project's code standards

For more details on component structure and standards, see [CODE_STANDARDS.md](./CODE_STANDARDS.md).
