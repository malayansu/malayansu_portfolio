import {
  Radio,
  Zap,
  Layers,
  Cpu,
  Smartphone,
  Code2
} from 'lucide-react';

export const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_080827_a9e5ad52-b6ee-4e79-b393-d936f179cfd7.mp4';

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Moments', href: '#moments' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' }
];

export const PROJECTS = [
  {
    title: "Smart IoT Web Server",
    description: "Built a custom web server hosted entirely on an ESP32. Featuring modern Glassmorphism aesthetics to monitor sensor data in real-time.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    tags: ["IoT", "ESP32", "C++", "Tailwind CSSS"],
    icon: <Radio className="w-5 h-5" />
  },
  {
    title: "Automation Hub",
    description: "Integrated RFID-RC522 modules, 16x2 LCD displays, and relay modules for electrical control and access security.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1200",
    tags: ["Hardware", "RFID", "Automation"],
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: "Interactive Treasure Hunt",
    description: "Engineered a sequential, riddle-based event for 50+ faculty, managing logic flow and clue distribution systems.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    tags: ["Logic", "Leadership", "Event"],
    icon: <Layers className="w-5 h-5" />
  }
];

export const SKILLS = [
  { title: "Microcontrollers", items: ["ESP8266", "ESP32", "Arduino Portenta"], icon: <Cpu /> },
  { title: "Sensors & IO", items: ["RFID-RC522", "16x2 LCD", "Relay Modules"], icon: <Smartphone /> },
  { title: "Core Science", items: ["Physics (EM Induction)", "Electrochemistry", "Calculus"], icon: <Zap /> },
  { title: "Development", items: ["Python", "Algorithms", "C++ for IoT"], icon: <Code2 /> }
];

export const INSTA_PROFILE_IMG = '/profile.jpg';

export const MOMENTS = [
  {
    id: 1,
    title: "typicalyy_me",
    description: "Sunset whispers and golden dreams. ✨",
    image: "/butterfly.jpg",
    link: "https://www.instagram.com/p/DKJRqcEyuaR/"
  },
  {
    id: 2,
    title: "typicalyy_me",
    description: "Sun-kissed and completely at peace.",
    image: "/post2.png",
    link: "https://www.instagram.com/p/DTKzTX6krMN/"
  },
  {
    id: 3,
    title: "typicalyy_me",
    description: "Finding peace in the silhouettes. 🌑",
    image: "/moon.jpg",
    link: "https://www.instagram.com/p/DX16aywkv6M/"
  },
  {
    id: 4,
    title: "typicalyy_me",
    description: "Morning dew and golden light.",
    image: "/post3.JPG",
    link: "https://www.instagram.com/p/DRmwC_gEoFG/"
  },
  {
    id: 5,
    title: "typicalyy_me",
    description: "Moody landscapes and misty mornings.",
    image: "/post4.jpg",
    link: "https://www.instagram.com/p/DLFTV89SMLV/"
  },
  {
    id: 6,
    title: "typicalyy_me",
    description: "Vibrant vibes and candid captures. 📸",
    image: "/sunlight.png",
    link: "https://www.instagram.com/p/DXqlFVtkpEv/"
  }
];
