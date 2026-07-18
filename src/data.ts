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
    description: "Plant today, protect tomorrow. Together, let us cultivate a greener environment and inspire future generations through environmental stewardship and community partnership.",
    details: "Venue: Bonbon Elementary School. Hosted by Saint Louis College-Cebu Alumni Association and Equitable PCIB Employees Credit Cooperative.",
    image: "/slcc_treeplanting.jpeg"
  },
  {
    id: 'medical',
    title: "Medical, Dental, Optical Mission & Legal Services",
    date: "July 18, 2026",
    category: "Community Outreach Activity",
    description: "Serving with compassion, making a difference together. Reaching out with free medical consultations, dental services, eye check-ups, and legal advice provided by dedicated alumni volunteers.",
    details: "Services Offered: Free Medical Consultation, Free Dental Services, Free Eye Check-up, Free Legal Consultation. Organized by: Saint Louis College-Cebu Alumni Association (Hosted by Batch 2001). Time: 8:00 AM to 12:00 NN. Venue: SLCC High School Gym.",
    image: "/slcc-medical-mission.jpeg"
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

export const GALLERY_DATA: GalleryItem[] = [
  // Pickleball Tournament
  {
    id: 1,
    album: "Pickleball",
    url: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    title: "Opening Championship Game",
    desc: "Alumni competitors face off on the main court during the action-packed morning opening matches."
  },
  {
    id: 2,
    album: "Pickleball",
    url: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80",
    title: "Alumni Jersey Rollout",
    desc: "Proud participants rocking the official commemorative jerseys and custom rackets during warm-ups."
  },
  {
    id: 3,
    album: "Pickleball",
    url: "https://images.unsplash.com/photo-1613918431201-447a74797087?auto=format&fit=crop&w=800&q=80",
    title: "Rally to Victory",
    desc: "A stunning close-up action sequence from the high-energy Men's Intermediate Division finals."
  },

  // Louisian Music Fest
  {
    id: 4,
    album: "Music Fest",
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    title: "Vibrant Stage Atmosphere",
    desc: "An epic crowd shot underneath flashing neon lights celebrating the ultimate Louisian rock-outs."
  },
  {
    id: 5,
    album: "Music Fest",
    url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
    title: "Guitar Solos & High Vocals",
    desc: "Sensational live performances as the Pointblank Cebu band commands the stage."
  },
  {
    id: 6,
    album: "Music Fest",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    title: "Reuniting Over Live Beats",
    desc: "Groups of longtime friends chanting back-to-back anthems together through the night."
  },

  // Tree Planting
  {
    id: 7,
    album: "Tree Planting",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    title: "Hands of Hope",
    desc: "Pioneer class organizers working side-by-side to plant native tree seedlings."
  },
  {
    id: 8,
    album: "Tree Planting",
    url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    title: "Eco-Outreach Organization",
    desc: "Dozens of high-quality seedlings prepared for planting along Cebu's designated green reserve forest."
  },
  {
    id: 9,
    album: "Tree Planting",
    url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
    title: "Forest Replenishment",
    desc: "Volunteers posing proudly after solid hours of manual reforestation with the environment agency."
  },

  // Medical Mission
  {
    id: 10,
    album: "Medical",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    title: "Doctor Consultations Desk",
    desc: "Experienced alumni doctors offering free direct diagnostics and primary health services."
  },
  {
    id: 11,
    album: "Medical",
    url: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=800&q=80",
    title: "Pediatric Wellness Support",
    desc: "Providing kids and mothers in the partner barangays with medical kits and healthy nutrition tips."
  },
  {
    id: 12,
    album: "Medical",
    url: "https://images.unsplash.com/photo-1582750433449-64c024716c17?auto=format&fit=crop&w=800&q=80",
    title: "Dental Screenings & Kits",
    desc: "Providing complimentary dental triage, extractions, and dental hygiene bags for local residents."
  },

  // Feeding Program
  {
    id: 13,
    album: "Feeding",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    title: "Hot Meals, Warm Hearts",
    desc: "Volunteers portioning and serving delicious, locally spiced soup to hundreds of happy local citizens."
  },
  {
    id: 14,
    album: "Feeding",
    url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    title: "Secretariat Assembly",
    desc: "Alumni distribution teams coordinating food, clean water bottles, and safety queues."
  },
  {
    id: 15,
    album: "Feeding",
    url: "https://images.unsplash.com/photo-1532629345422-7515f3d1cbb8?auto=format&fit=crop&w=800&q=80",
    title: "Serving Hope",
    desc: "Interacting playfully and encouragingly with elementary kids during the community program."
  },

  // Grand Homecoming
  {
    id: 16,
    album: "Homecoming",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    title: "The Grand Reunion Stage",
    desc: "The beautifully lights-trimmed banquet room setup expecting hundreds of Louisian alumni."
  },
  {
    id: 17,
    album: "Homecoming",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    title: "Decade Legends Back to the 90's",
    desc: "Epic live dance beats, colorful glow sticks, and throwback soundtracks turning the floor alive."
  },
  {
    id: 18,
    album: "Homecoming",
    url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
    title: "Alumni Table Reunion",
    desc: "Sharing laughter, scanning vintage yearbooks, and honoring classic memories across class batches."
  }
];

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
