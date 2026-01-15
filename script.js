const projects = [
  {
    id: "invalidate",
    category: "אפליקציית AI",
    title: "Invalidate AI",
    description:
      "אפליקציה כמו שאזאם אבל בשביל עובדות, והיא מופעלת על ידי בינה מלאכותית.",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    link: "/u/invalidate/mock-v6/",
  },
  {
    id: "compiler-project",
    category: "קומפיילר",
    title: "Compiler Project",
    description:
      "קומפיילר בשביל הבגרות במדעי המחשב עם המחלקות של משרד החינוך לבגרות",
    technologies: ["HTML", "CSS", "JS", "Deno", "Typescript", "Express"],
    icon: "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M12 8a4 4 0 100 8 4 4 0 000-8zm0-2v2 M12 16v2 M8 12H6 M18 12h-2 M15.657 8.343l-1.414 1.414 M9.757 14.243l-1.414 1.414 M15.657 15.657l-1.414-1.414 M9.757 9.757l-1.414-1.414",
    link: "https://github.com/idandrori555/Online-Edu-Java-Compiler",
  },
  {
    id: "terminal-portfolio",
    category: "פורטפוליו",
    title: "Terminal Portfolio",
    description: "פורטפוליו בסיסי עם עיצוב של טרמינל וכמה פקודות",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm4.5 4.5l3 3-3 3M13 12h4",
    link: "/projects/terminal-portfolio",
  },
  {
    id: "mashov-api",
    category: "ממשק תכנות יישומים",
    title: "Mashov Api",
    description: "ממשק תכנות יישומים לא רשמי בשביל המשוב",
    technologies: ["Deno", "Typescript"],
    icon: "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M8 8h8 M8 12h8 M8 16h8 M12 4v3 M12 17v3 M4 12h3 M17 12h3",
    link: "https://github.com/idandrori555/mashov-api",
  },
  {
    id: "alias",
    category: "משחק",
    title: "Alias",
    description: "משחק כיף עם חברים, צריך להסביר מילים לחברים לקבוצה",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9.172 9.172a4 4 0 015.656 0M12 18a6 6 0 100-12 6 6 0 000 12z",
    link: "/projects/alias/",
  },
  {
    id: "boil",
    category: "כלי",
    title: "Boil",
    description: "כלי עזר לכתיבת תבניות",
    technologies: ["BASH"],
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
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
  {
    id: "transclive",
    category: "אפליקציית AI",
    title: "Transclive",
    description: "כלי לסיכום שיעורים בבית הספר עם בינה מלאכותית",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M12 12m-10 0a10 10 0 1120 0 10 10 0 01-20 0",
    link: "/projects/transclive/",
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
