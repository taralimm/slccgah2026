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
    image: "/SLCC Pickleball event banner.jpg" // Use official registered poster as featured image from public folder
  },
  {
    id: 'musicfest',
    title: "Louisian Music Fest",
    date: "Saturday, June 27, 2026 | 8:00 PM",
    category: "Fundraising Activity",
    description: `Come for the music. Stay for the experience. Leave with memories worth replaying.

See you in front of the stage.🍻🎶🤘`,
    details: "GATE FEE: ₱250 with 1 FREE Beer. Venue: J-Cob's Cosina Bar & KTV. Featuring Live Performances By: Nicholay, Pointblank Cebu, ILK PH, The Manyanas, Stallions of the Burning Church, System Undone, WED at Wendy's.",
    image: "/Musicfest-flyer.jpg"
  },
  {
    id: 'treeplanting',
    title: "Tree Planting Activity",
    date: "July 11, 2026",
    category: "Community Outreach Activity",
    description: "More Details Coming Soon",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'medical',
    title: "Medical & Dental Mission with Legal Services",
    date: "July 18, 2026",
    category: "Community Outreach Activity",
    description: "More Details Coming Soon",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'feeding',
    title: "Feeding Program",
    date: "July 25, 2026",
    category: "Community Outreach Activity",
    description: "More Details Coming Soon",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'homecoming',
    title: "SLCC Grand Alumni Homecoming 2026",
    date: "August 1, 2026",
    category: "Main Event",
    description: "More Details Coming Soon",
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
