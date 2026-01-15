const projects = [
  {
    id: "invalidate",
    category: "אפליקציית AI",
    title: "Invalidate",
    description:
      "אפליקציה כמו שאזאם אבל בשביל עובדות, והיא מופעלת על ידי בינה מלאכותית.",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0 M21 21l-6 -6 M15 7l.5 1.5l1.5 .5l-1.5 .5l-.5 1.5l-.5 -1.5l-1.5 -.5l1.5 -.5z",
    link: "/u/invalidate/mock-v6/",
  },
  {
    id: "transclive",
    category: "אפליקציית AI",
    title: "Transclive",
    description: "כלי לסיכום שיעורים בבית הספר עם בינה מלאכותית",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v1a7 7 0 0 1-14 0v-1 M12 18v4 M8 22h8",
    link: "/projects/transclive/",
  },
  {
    id: "acne-ai",
    category: "אפליקציית AI",
    title: "Acne AI",
    description: "צלם את האוכל שלך ותראה כמה זה ישפיע על מצב הפנים",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M5 7h1l2-2h8l2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2 M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    link: "https://acne-ai.onrender.com/",
  },
  {
    id: "compiler-project",
    category: "קומפיילר",
    title: "Compiler Project",
    description:
      "קומפיילר בשביל הבגרות במדעי המחשב עם המחלקות של משרד החינוך לבגרות",
    technologies: ["HTML", "CSS", "JS", "Deno", "Typescript", "Express"],
    icon: "M7 8l-4 4l4 4 M17 8l4 4l-4 4 M14 4l-4 16",
    link: "https://github.com/idandrori555/Online-Edu-Java-Compiler",
  },
  {
    id: "mashov-api",
    category: "ממשק תכנות יישומים",
    title: "Mashov Api",
    description: "ממשק תכנות יישומים לא רשמי בשביל המשוב",
    technologies: ["Deno", "Typescript"],
    icon: "M3 15h18M3 9h18M6 15v-2M6 9V7M18 15v-2M18 9V7",
    link: "https://github.com/idandrori555/mashov-api",
  },
  {
    id: "alias",
    category: "משחק",
    title: "Alias",
    description: "משחק כיף עם חברים, צריך להסביר מילים לחברים לקבוצה",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    link: "/projects/alias/",
  },
  {
    id: "boil",
    category: "כלי",
    title: "Boil",
    description: "כלי עזר לכתיבת תבניות",
    technologies: ["BASH"],
    icon: "M7 8l-4 4l4 4 M17 8l4 4l-4 4 M14 4l-4 16",
    link: "https://github.com/idandrori555/boil",
  },
  {
    id: "fill-free",
    category: "משחק",
    title: "Fill Free",
    description: "משחק דופמין",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M12 12m-10 0a10 10 0 1120 0 10 10 0 01-20 0",
    link: "/projects/fill-free/",
  },
];

const projectTemplate = (project) => `
    <div class="glass-card p-8 rounded-[2.5rem] flex flex-col h-full group transition-all">
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="flex flex-col h-full">
            <div class="flex justify-between items-start mb-6">
                <div class="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${project.icon}"/>
                    </svg>
                </div>
                <span class="bg-white/5 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-wider">
                    ${project.category}
                </span>
            </div>
            
            <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                ${project.title}
            </h3>
            
            <p class="text-gray-400 leading-relaxed mb-8 flex-grow">
                ${project.description}
            </p>
            
            <div class="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                ${project.technologies
                  .map(
                    (tech) => `
                    <span class="text-[10px] font-bold text-blue-300/60 border border-blue-300/20 px-2 py-1 rounded-md uppercase">
                        ${tech}
                    </span>
                `,
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
