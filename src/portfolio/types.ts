export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  targetObjective: string;
  features: string[];
  technologies: string[];
  myRole: string;
  liveUrl: string;
  screenshotUrl: string;
  badge: string;
}

export interface SkillCategory {
  categoryName: string;
  description: string;
  iconName: string;
  skills: string[];
}

export interface ServicePackage {
  title: string;
  startingPrice: string;
  startingPriceRaw: number;
  highlight: string;
  inclusions: string[];
  targetAudience: string[];
  processSteps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
}

export interface ContactInfo {
  name: string;
  title: string;
  address: string;
  whatsappNumber: string;
  whatsappInternational: string;
  email: string;
  domain: string;
  googleMapsUrl: string;
  defaultWaMessage: string;
}
