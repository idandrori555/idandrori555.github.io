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
    id: "compiler-project",
    category: "קומפיילר",
    title: "MOE Compiler Project (Wrapper)",
    description: "סביבת הרצה וקומפילציה אונליין שנבנתה במיוחד עבור תלמידי מדעי המחשב, התומכת במחלקות ובספריות הרשמיות של משרד החינוך לבגרות.",
    technologies: ["Deno", "TypeScript", "Express", "Docker", "Java CLI"],
    icon: "M7 8l-4 4l4 4 M17 8l4 4l-4 4 M14 4l-4 16",
    link: "https://github.com/idandrori555/Edu-Compiler",
  },
  {
    id: "mashov-api",
    category: "ממשק תכנות יישומים (API)",
    title: "Mashov Api",
    description: "עטיפת API (Wrapper) לא רשמית, מהירה ומאובטחת למערכת 'משוב' של משרד החינוך, המאפשרת שליפת נתונים קלה לאפליקציות צד-שלישי.",
    technologies: ["Deno", "TypeScript", "REST API", "Fetch API"],
    icon: "M3 15h18M3 9h18M6 15v-2M6 9V7M18 15v-2M18 9V7",
    link: "https://github.com/idandrori555/mashov-api",
  },
  {
    id: "transclive",
    category: "אפליקציית AI",
    title: "Transclive",
    description: "כלי חכם המשתמש במודלי שפה כדי להקליט, לתמלל ולסכם שיעורים והרצאות בבית הספר בזמן אמת.",
    technologies: ["JS Esm", "Web Audio API", "Gemini API", "LocalStore"],
    icon: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v1a7 7 0 0 1-14 0v-1 M12 18v4 M8 22h8",
    link: "/projects/transclive/",
  },
  {
    id: "invalidate",
    category: "אפליקציית AI",
    title: "Invalidate",
    description: "מנוע אימות עובדות מבוסס בינה מלאכותית הפועל בצורה דומה ל'שאזאם' – מקשיב או מקבל טקסט ומזהה מיידית האם הטענה נכונה או שקרית.",
    technologies: ["JS", "AI Model Integration", "Fetch API"],
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
    technologies: ["JavaScript", "CSS Grid", "DOM Manipulation"],
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
    technologies: ["JavaScript", "LocalStorage", "CSS Variables"],
    icon: "M5 7h1l2-2h8l2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2 M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    link: "/projects/accutrack/",
  },
];

const projectTemplate = (project) => `
    <div class="glass-card p-8 rounded-[2.5rem] flex flex-col h-full group transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)]">
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="flex flex-col h-full justify-between">
            <div>
                <div class="flex justify-between items-start mb-6">
                    <div class="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${project.icon}"/>
                        </svg>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="bg-white/5 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 tracking-wider">
                            ${project.category}
                        </span>
                        <!-- Visual indicator for recruiters that this card is a link -->
                        <span class="text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all duration-300 font-bold text-lg">
                           &larr;
                        </span>
                    </div>
                </div>
                
                <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    ${project.title}
                </h3>
                
                <p class="text-gray-400 text-sm leading-relaxed mb-6">
                    ${project.description}
                </p>
            </div>
            
            <div class="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                ${project.technologies
    .map(
      (tech) => `
                    <span class="text-[10px] font-mono font-bold text-blue-300/70 bg-blue-500/5 border border-blue-300/20 px-2 py-1 rounded-md uppercase tracking-wide">
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
