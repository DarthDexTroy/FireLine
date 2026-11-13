export type Severity = "critical" | "warning" | "advisory";
export type Category = "documents" | "essentials" | "pets";
export type Preference = "critical" | "wildfire" | "evacuation" | "roads";
export const locations = [
  "Oak Valley, California",
  "Pine Hollow, California",
  "Cedar Ridge, California",
] as const;
export const categories: {
  id: Category;
  title: string;
  icon: "document-text-outline" | "bag-handle-outline" | "paw-outline";
  description: string;
}[] = [
  {
    id: "documents",
    title: "Important Documents",
    icon: "document-text-outline",
    description: "Keep the essentials together and easy to reach.",
  },
  {
    id: "essentials",
    title: "Essential Items",
    icon: "bag-handle-outline",
    description: "Pack a go bag for your household.",
  },
  {
    id: "pets",
    title: "Pets",
    icon: "paw-outline",
    description: "A little preparation for your companions, too.",
  },
];
export interface ChecklistItem {
  id: string;
  title: string;
  category: Category;
  hint: string;
}
export const checklist: ChecklistItem[] = [
  {
    id: "identification",
    title: "Identification cards",
    category: "documents",
    hint: "IDs and copies for every household member",
  },
  {
    id: "insurance",
    title: "Insurance documents",
    category: "documents",
    hint: "Home, vehicle, and health policies",
  },
  {
    id: "medical",
    title: "Medical records",
    category: "documents",
    hint: "Prescriptions and important health information",
  },
  {
    id: "contacts",
    title: "Emergency contact information",
    category: "documents",
    hint: "A paper copy of important phone numbers",
  },
  {
    id: "water",
    title: "Water",
    category: "essentials",
    hint: "Drinking water for your household",
  },
  {
    id: "food",
    title: "Food",
    category: "essentials",
    hint: "Nonperishable food and a manual can opener",
  },
  {
    id: "medications",
    title: "Medications",
    category: "essentials",
    hint: "Daily medications and prescriptions",
  },
  {
    id: "flashlight",
    title: "Flashlight",
    category: "essentials",
    hint: "Include spare batteries",
  },
  {
    id: "charger",
    title: "Phone charger",
    category: "essentials",
    hint: "Charging cables and a power bank",
  },
  {
    id: "first-aid",
    title: "First aid kit",
    category: "essentials",
    hint: "A stocked, accessible kit",
  },
  {
    id: "pet-food",
    title: "Pet food",
    category: "pets",
    hint: "Food for each of your pets",
  },
  {
    id: "bowl",
    title: "Water bowl",
    category: "pets",
    hint: "A portable bowl and extra water",
  },
  {
    id: "carrier",
    title: "Leash or carrier",
    category: "pets",
    hint: "A safe way to travel with your pet",
  },
  {
    id: "vet",
    title: "Veterinary records",
    category: "pets",
    hint: "Vaccination records and medication details",
  },
];
export interface DemoAlert {
  id: string;
  title: string;
  severity: Severity;
  time: string;
  description: string;
  detail: string;
  action: string;
  preference: Preference;
}
export const alerts: DemoAlert[] = [
  {
    id: "activity",
    title: "Wildfire Activity Increasing",
    severity: "critical",
    time: "5 minutes ago",
    description: "Fire activity has increased near Oak Valley.",
    detail:
      "Changing wind conditions have increased fire activity along the eastern ridge. Oak Valley and Pine Hollow are affected areas.",
    action: "Review the wildfire map and keep your household plan up to date.",
    preference: "wildfire",
  },
  {
    id: "evacuation",
    title: "Evacuation Warning Issued",
    severity: "warning",
    time: "12 minutes ago",
    description:
      "Residents in designated areas should prepare for possible evacuation.",
    detail:
      "An evacuation warning covers the east side of Oak Valley. A warning means preparation may be needed; it is distinct from an evacuation order.",
    action:
      "Prepare essential belongings and review nearby shelter options.",
    preference: "evacuation",
  },
  {
    id: "road",
    title: "Road Closure",
    severity: "warning",
    time: "25 minutes ago",
    description: "Oak Valley Road is temporarily closed in this scenario.",
    detail:
      "The section of Oak Valley Road near the eastern ridge is marked closed. Review route guidance before leaving.",
    action: "Review the closure marker on the wildfire map.",
    preference: "roads",
  },
  {
    id: "containment",
    title: "Fire Containment Update",
    severity: "advisory",
    time: "1 hour ago",
    description:
      "Fire crews continue containment operations near Oak Valley.",
    detail:
      "Containment is currently 35%. Crews continue working along the northern perimeter.",
    action:
      "Monitor updates and review your preparation checklist.",
    preference: "wildfire",
  },
];
export interface Shelter {
  id: string;
  name: string;
  address: string;
  distanceMiles: number;
  minutes: number;
  petFriendly: boolean;
  overnight: boolean;
  available: boolean;
  availability: "Available" | "Limited" | "Unavailable";
  facilities: string[];
  x: number;
  y: number;
}
export const shelters: Shelter[] = [
  {
    id: "school",
    name: "Oak Valley High School",
    address: "1200 School Lane, Oak Valley",
    distanceMiles: 2.4,
    minutes: 8,
    petFriendly: true,
    overnight: true,
    available: true,
    availability: "Available",
    facilities: [
      "Restrooms",
      "Drinking water",
      "Charging stations",
      "Pet area",
    ],
    x: 125,
    y: 330,
  },
  {
    id: "community",
    name: "Oak Valley Community Center",
    address: "84 Meadow Avenue, Oak Valley",
    distanceMiles: 3.1,
    minutes: 11,
    petFriendly: false,
    overnight: false,
    available: true,
    availability: "Available",
    facilities: ["Restrooms", "Drinking water", "Accessible entrance"],
    x: 300,
    y: 430,
  },
  {
    id: "recreation",
    name: "North Valley Recreation Center",
    address: "600 North Lane, North Valley",
    distanceMiles: 5.2,
    minutes: 17,
    petFriendly: true,
    overnight: true,
    available: true,
    availability: "Limited",
    facilities: ["Restrooms", "Drinking water", "Pet area"],
    x: 175,
    y: 120,
  },
  {
    id: "library",
    name: "Pine Hollow Library",
    address: "12 Pine Street, Pine Hollow",
    distanceMiles: 4.6,
    minutes: 15,
    petFriendly: false,
    overnight: false,
    available: false,
    availability: "Unavailable",
    facilities: ["Restrooms", "Accessible entrance"],
    x: 75,
    y: 210,
  },
];
export const wildfire = {
  id: "oak-valley",
  name: "Oak Valley Wildfire",
  severity: "warning" as Severity,
  distanceMiles: 4.8,
  status: "Active",
  lastUpdated: "5 minutes ago",
  evacuationStatus: "Prepare to Evacuate",
  containment: 35,
};
export const preferenceLabels: Record<Preference, string> = {
  critical: "Critical Alerts",
  wildfire: "Wildfire Updates",
  evacuation: "Evacuation Warnings",
  roads: "Road Closures",
};
