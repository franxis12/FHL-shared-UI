import { PublicNavbar } from './PublicNavbar'

const NAV_ITEMS = [
  { label: 'Listings', href: '#', isActive: true },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
]

const meta = {
  title: 'Components/PublicNavbar',
  component: PublicNavbar,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    navItems: NAV_ITEMS,
    dashboardHref: '#',
    loginHref: '#',
    registerHref: '#',
  },
}

export default meta

export const LoggedOut = {}

export const LoggedIn = {
  args: {
    isAuthenticated: true,
    userDisplayName: 'Francis Martinez',
    userEmail: 'francis@fhlenterprisesgroup.com',
    avatarUrl: '',
  },
}
