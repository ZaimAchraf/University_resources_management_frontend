import React from 'react'
import CIcon from '@coreui/icons-react'
import CPrinter from '@coreui/icons-react'

import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import Teachers from './views/departement/Teachers'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Departement',
  },
  {
    component: CNavGroup,
    roles: ['ROLE_CHEF_DEP'],
    name: 'Sent Requests',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [

      {
        component: CNavItem,
        name: 'All Requests',
        to: '/sent-requests',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Send Request',
        to: '/send-final-demand',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />
      },
    ],
  },
  {
    component: CNavGroup,
    roles: ['ROLE_CHEF_RESOURCES'],
    name: 'Ressources',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Resource',
        to: '/resources/',
        icon: <CIcon icon={CPrinter} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Computers',
        to: '/resources/computers',
        icon: <CIcon customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Printers',
        to: '/resources/printers',
        icon: <CIcon icon={CPrinter} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Departement',
    roles: ['ROLE_CHEF_DEP', 'ROLE_ADMIN'],
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Departments',
        to: '/departement/departments',
      },
      {
        component: CNavItem,
        name: 'Teachers',
        to: '/departement/teachers',
      },
      {
        component: CNavItem,
        name: 'Administrative',
        to: '/departement/administrative',
      },
    ],
  },
  {
    component: CNavGroup,
    roles: ['ROLE_CHEF_DEP'],
    name: 'Recieved Requests',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Requests',
        to: '/recieved-requests',
        icon: <CIcon customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    roles: ['ROLE_PROF','ROLE_CHEF_DEP'],
    name: 'My Resources Requests',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Requests',
        to: '/my-requests',
        icon: <CIcon customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Send Request',
        to: '/request-resources/',
        icon: <CIcon icon={CPrinter} customClassName="nav-icon" />,
      }
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Teachers',
  //   roles: ['ROLE_ADMIN'],
  //   to: '/departement/teachers',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  {
    component: CNavGroup,
    name: 'Offers',
    roles: ['ROLE_CHEF_RESOURCES'],
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Send Offer',
        to: '/sendoffers',
        icon: <CIcon customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'All offers',
        to: '/offers',
        icon: <CIcon icon={CPrinter} customClassName="nav-icon" />,
      }
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'ChefDep',
  //   roles: ['ROLE_CHEF_DEP'],
  //   to: '/chefDepartement/teachers',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'my-resources',
    to: '/my-resources',
    roles: ['ROLE_PROF'],
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Pannes',
    to: '/pannes',
    roles: ['ROLE_Respo_Maint'],
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Pannes',
    to: '/responsable/pannes',
    roles: ['ROLE_CHEF_RESOURCES'],
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },

]
/*
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
] */

export default _nav
