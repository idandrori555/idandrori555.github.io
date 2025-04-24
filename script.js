const projects = [
  {
    id: "moovit-bus-pass",
    category: "תחבורה",
    title: "Moovit Bus Pass",
    description:
      "אפליקציה סטטית פשוטה שיוצרת כרטיס נסיעה לשעה ולתאריך הנוכחיים.",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    link: "/projects/moovit_bus_pass/",
  },
  {
    id: "magshi-date",
    category: "לוח זמנים",
    title: "Magshi Date",
    description:
      "אפליקציה נקייה לבדיקת שיעורי מגשימים קרובים לפי תאריך. (באר שבע בלבד)",
    technologies: ["HTML", "Tailwind", "JS"],
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    link: "/projects/magshi-date/",
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
];

const projectTemplate = (project) => `
    <div class="bg-white rounded-xl shadow-md p-6 card-hover border border-gray-100">
        <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
                      project.icon
                    }"/>
                </svg>
            </div>
            <span class="bg-primary-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded">${
              project.category
            }</span>
        </div>
        <a href="${project.link}" class="block">
            <h2 class="text-2xl font-bold text-gray-800 mb-3 hover:text-primary-600 transition-colors">
                ${project.title}
            </h2>
            <p class="text-gray-600 mb-6">
                ${project.description}
            </p>
            <div class="flex justify-between items-center flex-wrap gap-y-2">
                <div class="flex flex-wrap gap-2">
                    ${project.technologies
                      .map(
                        (tech) => `
                        <span class="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">${tech}</span>
                    `
                      )
                      .join("")}
                </div>
                <button class="text-primary-600 font-medium hover:text-primary-700 flex items-center">
                    לצפייה
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
        </a>
    </div>
`;

document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.querySelector(".grid");
  projectsContainer.innerHTML = projects
    .map((project) => projectTemplate(project))
    .join("");
});
