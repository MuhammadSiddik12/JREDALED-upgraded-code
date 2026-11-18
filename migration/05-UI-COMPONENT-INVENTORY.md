# 05 - UI Component Inventory: JREDALED

## Design System & Theme
- **Framework:** Bootstrap 4 (`assets/css/bootstrap/css/bootstrap.min.css`)
- **Admin Dashboard Layout:** CodedThemes Mega Able Admin Dashboard (`assets/css/style.css`, `assets/pages/waves/css/waves.min.css`)
- **Icon Sets:**
  - FontAwesome 4.7 (`assets/icon/font-awesome/css/font-awesome.min.css`)
  - Themify Icons (`assets/icon/themify-icons/themify-icons.css`)
  - IcoFont (`assets/icon/icofont/css/icofont.css`)
- **Typography:** Google Fonts `Roboto:400,500`
- **Color Palette:**
  - Primary Brand Blue: `#006`, `#164286`, `#000080`
  - Success / Green: `#00D76B`
  - Cyan: `#00D7D7`
  - Warning / Yellow: `#F2C81E`
  - Danger / Red: `#cc6699`, `#F1948A`, `#FF5370`
  - Purple: `#6F00DD`, `#A14189`

---

## Component Inventory

### 1. Layout Components
- **`Header`**: Fixed top navbar containing GEIE logo, toggle hamburger icon, fullscreen toggle, "Jharkhand Renewable Energy Development Agency (JREDA)" agency badge, and user dropdown menu with "Welcome, [User]" and Logout link.
- **`SideMenu`**: Collapsible sidebar navigation dynamically highlighting active routes and displaying permission-checked menu items grouped by:
  - Dashboard
  - Distributor
  - Customer
  - Organizations
  - Inventory
  - RMS/Controller/Pump
  - Testing Tool
  - CMS User
  - Reports
  - Change Password & Logout
- **`Preloader`**: Animated multi-color spinner (`theme-loader`) matching the original HTML.
- **`PageWrapper`**: Standard content wrapper with `.main-body`, `.page-wrapper`, and `.page-body`.

### 2. Dashboard Components
- **`JharkhandInteractiveMap`**: Absolute-positioned clickable district links overlaying the Jharkhand geographic outline (`JharkhandMap.png`).
- **`StatsCounters`**: 6 summary statistic cards (Networks, Total Luminary, Healthy Luminary, Discharged Battery, Faulty Luminary, Energy Saving KWH, Luminary Inventory).
- **`DonutChart`**: Google Charts / SVG donut chart rendering healthy vs faulty luminaries.

### 3. Data Tables & Filters
- **`DataTable`**: Responsive table styling (`.table`, `.table-hover`, `.table-bordered`) with headers, alternate row styling, status badges, and action buttons.
- **`DateFilterBar`**: Date picker inputs with "Search", "Export CSV", and pagination controls.

### 4. Form Components
- **`MaterialForm`**: Floating label input fields (`.form-material`, `.form-group.form-default`).
- **`SelectDropdown`**: Clean dropdown selects with active state.
- **`ActionButtons`**: `.btn.btn-primary.waves-effect.waves-light`, `.btn-danger`, `.btn-success`.
- **`AlertBox`**: Warning/success message banner displaying `$mes` parameters with automated fade-out.

### 5. Access Matrix Grid
- **`AccessMatrixTable`**: Categorized 9-group permission checkbox table for assigning granular access rights per menu item to each user.
