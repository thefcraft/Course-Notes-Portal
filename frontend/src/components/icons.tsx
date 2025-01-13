import { Moon, SunMedium, Twitter, Github, Loader2, BookOpen, Menu, Bell, Search, User } from 'lucide-react'
const MicrosoftLogo: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23 23"
      width="20"
      height="20"
      {...props}
    >
      <path fill="#f25022" d="M1 1h10v10H1z" />
      <path fill="#00a4ef" d="M1 12h10v10H1z" />
      <path fill="#7fba00" d="M12 1h10v10H12z" />
      <path fill="#ffb900" d="M12 12h10v10H12z" />
    </svg>
  );
};
export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  gitHub: Github,
  logo: BookOpen,
  menu: Menu,
  spinner: Loader2,
  bell: Bell,
  search: Search,
  user: User,
  MicrosoftLogo: MicrosoftLogo
//   logo: (props: ) => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       strokeWidth="1.5"
//       stroke="currentColor"
//       fill="none"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       {...props}
//     >
//       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//       <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
//       <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
//       <line x1="3" y1="6" x2="3" y2="19" />
//       <line x1="12" y1="6" x2="12" y2="19" />
//       <line x1="21" y1="6" x2="21" y2="19" />
//     </svg>
//   ),
}

