/**
 * Type definitions for UI components
 * Extracted from homepage for reusability across the application
 */

/**
 * GardenCard - Represents a card in the garden section
 * @property icon - Lucide icon component
 * @property title - Card title
 * @property desc - Card description
 * @property tag - Category tag for the card
 */
export interface GardenCard {
  icon: any;
  title: string;
  desc: string;
  tag: string;
}

/**
 * QuickLink - Represents a quick link item
 * @property href - URL destination
 * @property name - Display name for the link
 * @property desc - Brief description of the link destination
 */
export interface QuickLink {
  href: string;
  name: string;
  desc: string;
}
