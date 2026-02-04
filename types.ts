export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
