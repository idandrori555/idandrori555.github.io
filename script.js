const projects = [
  {
    id: "acne-ai",
    category: "אפליקציית AI",
    title: "Acne AI",
    description: "צילום וניתוח האוכל היומי שלך באמצעות בינה מלאכותית כדי לחזות ולהציג את רמת ההשפעה שלו על עור הפנים.",
    technologies: [
      "Bun",
      "TypeScript",
      "Express",
      "Supabase",
      "Gemini API",
      "Tailwind"
    ],
    icon: "M5 7h1l2-2h8l2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2 M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    link: "https://acne-ai.onrender.com/",
  },
  {
    id: "zhut-kdima",
    category: "משחק לימוד",
    title: "זכות קדימה",
    description: "משחק תחרותי, ראש בראש מול חברים על שאלות תיאוריה",
    technologies: [
      "Bun",
      "TypeScript",
      "Express",
      "Sqlite",
      "HTML CSS JS",
    ],
    icon: "M12 3l9 9-9 9-9-9 9-9zM16.5 10.5l-4.5 4.5M12 15l-3-3",
    link: "https://zhut-kdima.onrender.com/",
  },
  {
    id: "compiler-project",
    category: "קומפיילר",
    title: "MOE Compiler Project (Wrapper)",
    description: "סביבת הרצה וקומפילציה אונליין שנבנתה במיוחד עבור תלמידי מדעי המחשב, התומכת במחלקות ובספריות הרשמיות של משרד החינוך לבגרות.",
    technologies: ["Bun", "TypeScript", "Express", "Docker", "Java CLI"],
    icon: "M7 8l-4 4l4 4 M17 8l4 4l-4 4 M14 4l-4 16",
    link: "https://github.com/idandrori555/Edu-Compiler",
  },
  {
    id: "mashov-api",
    category: "ממשק תכנות יישומים (API)",
    title: "Mashov Api",
    description: "עטיפת API (Wrapper) לא רשמית, מהירה ומאובטחת למערכת 'משוב' של משרד החינוך, המאפשרת שליפת נתונים קלה לאפליקציות צד-שלישי.",
    technologies: ["Bun", "TypeScript"],
    icon: "M3 15h18M3 9h18M6 15v-2M6 9V7M18 15v-2M18 9V7",
    link: "https://github.com/idandrori555/mashov-api",
  },
  {
    id: "nomos",
    category: "מסגרת פיתוח ווב",
    title: "Nomos",
    description: "מימוש מאפס של HTTP Web Framework ב-C++23 מונחה עצמים. כולל Thread Pool מותאם לניהול משימות מקבילי, ארכיטקטורת ניתוב, ואינטגרציה ישירה מול הסוקטים (TCP) של מערכת ההפעלה.",
    technologies: ["C++", "TCP Sockets"],
    icon: "M7 8l-4 4l4 4 M17 8l4 4l-4 4 M14 4l-4 16",
    link: "https://github.com/idandrori555/nomos",
  },
  {
    id: "physics-simulator",
    category: "סימולטור פיזיקה",
    title: "Physics Simulator",
    description: "סימולטור פיזיקלי דו-ממדי המדמה כוחות, התנגשויות ותנועה בזמן אמת, תוך דגש על ביצועים גבוהים וניהול זיכרון יעיל.",
    technologies: ["C++", "SDL3"],
    icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
    link: "https://github.com/idandrori555/physics-simulator",
  },
  {
    id: "transclive",
    category: "אפליקציית AI",
    title: "Transclive",
    description: "כלי חכם המשתמש במודלי שפה כדי להקליט, לתמלל ולסכם שיעורים והרצאות בבית הספר בזמן אמת.",
    technologies: ["HTML CSS JS", "Web Audio API", "Gemini API"],
    icon: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v1a7 7 0 0 1-14 0v-1 M12 18v4 M8 22h8",
    link: "/projects/transclive/",
  },
  {
    id: "invalidate",
    category: "אפליקציית AI",
    title: "Invalidate",
    description: "מנוע אימות עובדות מבוסס בינה מלאכותית הפועל בצורה דומה ל'שאזאם' – מקשיב או מקבל טקסט ומזהה מיידית האם הטענה נכונה או שקרית.",
    technologies: ["HTML CSS JS", "Gemini API"],
    icon: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0 M21 21l-6 -6 M15 7l.5 1.5l1.5 .5l-1.5 .5l-.5 1.5l-.5 -1.5l-1.5 -.5l1.5 -.5z",
    link: "/u/invalidate/mock-v6/",
  },
  {
    id: "boil",
    category: "כלי CLI",
    title: "Boil",
    description: "כלי אוטומציה מהיר לשורת הפקודה (CLI) המאפשר יצירה מהירה של תבניות פרויקטים (Boilerplates) וניהול סביבות עבודה בקליק.",
    technologies: ["BASH", "Shell Scripting", "Linux Automation"],
    icon: "M7 8l-4 4l4 4 M17 8l4 4l-4 4 M14 4l-4 16",
    link: "https://github.com/idandrori555/boil",
  },
  {
    id: "alias",
    category: "משחק ווב",
    title: "Alias",
    description: "גרסת דפדפן אינטראקטיבית ומהירה למשחק חברתי המבוסס על הסבר והבנת מילים תחת לחץ זמן.",
    technologies: ["HTML CSS JS"],
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    link: "/projects/alias/",
  },
  {
    id: "fill-free",
    category: "משחק ווב",
    title: "Fill Free",
    description: "משחק קנבס מינימליסטי ומהיר המבוסס על מכניקת תזמון קצבית לחוויית משחק ממכרת.",
    technologies: ["HTML5 Canvas", "JavaScript", "Web Audio"],
    icon: "M12 12m-10 0a10 10 0 1120 0 10 10 0 01-20 0",
    link: "/projects/fill-free/",
  },
  {
    id: "accutrack",
    category: "אפליקציית מעקב",
    title: "Accutrack",
    description: "מערכת מעקב וניהול יומן אישי עבור מטופלים ברואקוטן, הכוללת ניטור תופעות לוואי, מינונים ותזכורות בדיקות דם.",
    technologies: ["HTML CSS JS", "ImgBB API"],
    icon: "M5 7h1l2-2h8l2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2 M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    link: "/projects/accutrack/",
  },
];

const projectTemplate = (project) => `
    <div class="glass-panel p-8 rounded-[2.5rem] flex flex-col h-full group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] hover:border-blue-400/40">
        
        <!-- Animated Background Glow -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="flex flex-col h-full justify-between relative z-10">
            <div>
                <div class="flex justify-between items-start mb-6">
                    <!-- Project Icon -->
                    <div class="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all duration-300 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${project.icon}"/>
                        </svg>
                    </div>
                    
                    <!-- Category & CTA Arrow -->
                    <div class="flex items-center gap-3">
                        <span class="bg-slate-800/80 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 tracking-wider group-hover:border-white/20 transition-colors">
                            ${project.category}
                        </span>
                        
                        <!-- Interactive Arrow (Visible on Hover) -->
                        <div class="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <i class="fas fa-arrow-left text-blue-400 text-sm"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Title -->
                <h3 class="text-2xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-l group-hover:from-blue-400 group-hover:to-teal-300 transition-all duration-300">
                    ${project.title}
                </h3>
                
                <!-- Description -->
                <p class="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                    ${project.description}
                </p>
            </div>
            
            <!-- Tech Stack Footer -->
            <div class="flex flex-wrap gap-2 pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors duration-300">
                ${project.technologies
    .map(
      (tech) => `
                    <span class="text-[11px] font-mono font-bold text-blue-200 bg-blue-900/30 border border-blue-700/50 px-2.5 py-1 rounded-md tracking-wide hover:bg-blue-800/50 transition-colors duration-200">
                        ${tech}
                    </span>
                `
    )
    .join("")}
            </div>
        </a>
    </div>
`;

document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.querySelector("#projects-grid");

  if (projectsContainer) {
    projectsContainer.innerHTML = projects
      .map((project) => projectTemplate(project))
      .join("");
  }
});
