export const projects = [
  {
    id: "01",
    slug: "godrive",
    title: "GoDrive",
    pinned: true,
    category: { EN: "Full-Stack Platform", CZ: "Full-Stack Platforma" },
    description: {
      EN: "Secure file-sharing platform built with Next.js and Go.",
      CZ: "Zabezpečená platforma pro sdílení souborů postavená na Next.js a Go."
    },
    image: "/images/projects/1.png", 
    year: "2026",
    tags: ["Next.js", "Go", "PostgreSQL"],
  },
  {
    id: "02",
    slug: "terminalclock",
    title: "Terminal Clock",
    pinned: false,
    category: { EN: "CLI UI", CZ: "CLI UI" },
    description: {
      EN: "A simple digital clock app that runs in terminal",
      CZ: "Jednoduchá aplikace zobrazující digitální hodiny v terminálu."
    },
    image: "/images/projects/2.png",
    year: "2025",
    tags: ["Python", "Textual"],
  },
  {
    id: "03",
    slug: "walkawaylock",
    title: "WalkAway-Lock",
    pinned: true,
    category: { EN: "Security scripts", CZ: "Bezpečnostní skripty" },
    description: {
      EN: "Monitors BL RSSI and automatically locks host if out of range",
      CZ: "Skript měří Bluetooth RSSI a automaticky zamkne počítač při ztrátě dosahu."
    },
    image: null,
    year: "2025",
    tags: ["Python", "Bluetooth", "Security"],
  },
  {
    id: "04",
    slug: "books",
    title: "Books",
    pinned: false,
    category: { EN: "Front end", CZ: "Front end" },
    description: {
      EN: "Webpage displaying all the books I read that year",
      CZ: "Webová stránka ukazující knihy, které jsem toho roku přečetl."
    },
    image: "/images/projects/4.png",
    year: "2024",
    tags: ["HTML", "CSS", "JS"],
  },
  {
    id: "05",
    slug: "utility-bot",
    title: "Mineflayer Utility Bot",
    pinned: true,
    category: { EN: "Automation & Robotics", CZ: "Automatizace a Robotika" },
    description: {
      EN: "Multi-functional Minecraft bot capable of pathfinding, ore detection, and automated combat.",
      CZ: "Multifunkční Minecraft bot schopný hledání cesty, detekce rud a automatizovaného boje."
    },
    image: "/images/projects/5.png",
    year: "2026",
    tags: ["Node.js", "Mineflayer", "Pathfinding"],
  }
];