import React from 'react'

// Departement
const Teachers = React.lazy(() => import('./views/departement/Teachers'))
const Providers = React.lazy(() => import('./views/Responsable/Providers'))
const Departments = React.lazy(() => import('./views/departement/Departments'))
const Profile = React.lazy(() => import('./views/Users/Profile'))
const Administrative = React.lazy(() => import('./views/departement/Administrative'))

const ChefDep = React.lazy(() => import('./views/chefDep/ChefDep'))

const SendOffers = React.lazy(() => import('./views/offers/Offers'))
const Offers = React.lazy(() => import('./views/offers/AllOffers'))
const Computers = React.lazy(() => import('./views/ressources/Computers'))
const MyRessources = React.lazy(() => import('./views/Users/MyRessources'))
const Resources = React.lazy(() => import('./views/ressources/Ressources'))
const SendDemand = React.lazy(() => import('./views/demands/SendDemand'))
const Demands = React.lazy(() => import('./views/demands/MyDemands'))
const SendFinalDemand = React.lazy(() => import('./views/demands/SendFinalDemand'))
const Requests = React.lazy(() => import('./views/recieved_requests/AllRequests'))
const SentRequests = React.lazy(() => import('./views/sent_requests/AllSentRequests'))
const Printers = React.lazy(() => import('./views/ressources/Printers'))
const Pannes = React.lazy(() => import('./views/RespoMaintenance/ListesDesPannes'))
const PannesForResp = React.lazy(() => import('./views/Responsable/ListesDesPannes'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

const Logout = React.lazy(() => import('./views/pages/logout/Logout'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/pannes' , name: 'Pannes' , element: Pannes},
  { path: '/responsable/pannes' , name: 'PannesForResp' , element: PannesForResp},
  { path: '/responsable/providers' , name: 'providers' , element: Providers},
  { path: '/departement/teachers', name: 'Teachers', element: Teachers },
  { path: '/chefDepartement/teachers', name: 'ChefDep', element: ChefDep },
  { path: '/departement/departments', name: 'Department', element: Departments },
  { path: '/departement/administrative', name: 'Administrative', element: Administrative },
  { path: '/resources/computers', name: 'Computers', element: Computers },
  { path: '/resources/printers', name: 'Computers', element: Printers },
  { path: '/sendoffers' , name: 'SendOffers' , element: SendOffers},
  { path: '/offers' , name: 'AllOffers' , element: Offers},
  { path: '/my-resources', name: 'MyRessources', element: MyRessources },
  { path: '/recieved-requests', name: 'RecievedRequests', element: Requests },
  { path: '/sent-requests', name: 'SentRequests', element: SentRequests },
  { path: '/request-resources', name: 'DemandResources', element: SendDemand },
  { path: '/send-final-demand', name: 'FinalDemandResources', element: SendFinalDemand },
  { path: '/my-requests', name: 'Demands', element: Demands },
  { path: '/resources/', name: 'Resources', element: Resources },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/logout', name: 'Logout', element: Logout },
]

export default routes
