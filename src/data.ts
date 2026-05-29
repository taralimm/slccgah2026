// Static metadata for Activities, Gallery and Sponsors

export interface Activity {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  details: string;
  image: string;
}

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'pickleball',
    title: "1st Louisian Pickleball Tournament",
    date: "June 20 & 21, 2026 | 8:00 AM",
    category: "Fundraising Activity",
    description: "Match up and smash at the court! In cooperation with SLSM Batch 01 - Alumni. Our pioneer pickleball gathering seeks to build camaraderie among alumni while raising funds for Homecoming.",
    details: "Reg Fee: ₱800. Free commemorative jersey if registered before May 31, 2026. Executive Level: Mens/Mixed/Womens Low (Prize: 5k, 3k, 2k). Invitational Level: Mixed Low & Mens Low (Prize: 5k, 3k, 2k), Mens Intermediate (Prize: 8k, 5k, 3k). Location: Saint Louis College of Cebu Gymnasium. Contact: REX 0992 734 0142. Powered by BAX, XP, PROTECH XP.",
    image: "/src/assets/images/SLCC%20Pickleball%20event%20banner.jpg" // Use official generated poster as featured image
  },
  {
    id: 'musicfest',
    title: "Louisian Music Fest",
    date: "June 27, 2026",
    category: "Fundraising Activity",
    description: "An open-air evening acoustic event featuring local nostalgic acoustic bands singing 90s alternative rock hits and pop classics.",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'treeplanting',
    title: "Tree Planting Activity",
    date: "July 11, 2026",
    category: "Community Outreach Activity",
    description: "Bridging alumni and environmental protection. Help us seed mangrove saplings and foster clean future coastlines for Saint Louis College-Cebu's future.",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'medical',
    title: "Medical & Dental Mission with Legal Services",
    date: "July 18, 2026",
    category: "Community Outreach Activity",
    description: "A comprehensive civic compassion service providing free basic health consults, dental checkups, essential medicines, and gratis legal counsel to neighbors.",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'feeding',
    title: "Feeding Program",
    date: "July 25, 2026",
    category: "Community Outreach Activity",
    description: "Spreading joy and proper nutrition to children in local community areas of consolacion and adjacent cities in Cebu.",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'homecoming',
    title: "SLCC Grand Alumni Homecoming 2026",
    date: "August 1, 2026",
    category: "Main Event",
    description: "The main arena night: '90's Throwback Reunion'. Get ready to throw it back to the dopest decade with retro photo zones, karaoke, trivia, and food panels.",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
  }
];

export interface GalleryItem {
  id: number;
  album: string;
  url: string;
  title: string;
  desc: string;
}

export const GALLERY_DATA: GalleryItem[] = [];

export interface Sponsor {
  name: string;
  logo: string;
}

export const SPONSORS_DATA: Sponsor[] = [
  { name: 'Partner Placeholder 1', logo: '' },
  { name: 'Partner Placeholder 2', logo: '' },
  { name: 'Sponsor Placeholder 1', logo: '' },
  { name: 'Sponsor Placeholder 2', logo: '' }
];
