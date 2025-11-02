const projects = [
  {
    id: "magshi-date",
    category: "לוח זמנים",
    title: "Magshi Date",
    description:
      "אפליקציה נקייה לבדיקת שיעורי מגשימים קרובים לפי תאריך. (באר שבע בלבד)",
    technologies: ["HTML", "Tailwind", "JS"],
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    link: "/projects/magshi-date/",
    unlisted: false,
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
    unlisted: false,
  },
  {
    id: "terminal-portfolio",
    category: "פורטפוליו",
    title: "Terminal Portfolio",
    description: "פורטפוליו בסיסי עם עיצוב של טרמינל וכמה פקודות",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm4.5 4.5l3 3-3 3M13 12h4",
    link: "/projects/terminal-portfolio",
    unlisted: false,
  },
  {
    id: "mashov-api",
    category: "ממשק תכנות יישומים",
    title: "Mashov Api",
    description: "ממשק תכנות יישומים לא רשמי בשביל המשוב",
    technologies: ["Deno", "Typescript"],
    icon: "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M8 8h8 M8 12h8 M8 16h8 M12 4v3 M12 17v3 M4 12h3 M17 12h3",
    link: "https://github.com/idandrori555/mashov-api",
    unlisted: false,
  },
  {
    id: "alias",
    category: "משחק",
    title: "Alias",
    description: "משחק כיף עם חברים, צריך להסביר מילים לחברים לקבוצה",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9.172 9.172a4 4 0 015.656 0M12 18a6 6 0 100-12 6 6 0 000 12z",
    link: "/projects/alias/",
    unlisted: false,
  },
  {
    id: "moovit-bus-pass",
    category: "כלי",
    title: "Moovit Bus Pass",
    description: "כרטיס אוטובוס מזויף של מוביט",
    technologies: ["HTML"],
    icon: "M3 10h18M3 6h18M3 14h18M3 18h18",
    link: "/projects/moovit_bus_pass/",
    unlisted: false,
  },
  {
    id: "invalidate",
    category: "ניסוי",
    title: "Invalidate Mocks",
    description: "מספר ניסויים ומבחנים",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    link: "/u/invalidate/mock-v1/",
    unlisted: true,
  },
  {
    id: "lesson-ai",
    category: "AI",
    title: "Lesson AI",
    description: "פרויקט AI שמסכם שיעורים (לא עובד)",
    technologies: ["HTML"],
    icon: "M9.75 17.375c-2.25 0-4.125-1.875-4.125-4.125S7.5 9.125 9.75 9.125s4.125 1.875 4.125 4.125-1.875 4.125-4.125 4.125zM18 9.375c0-2.25-1.875-4.125-4.125-4.125S9.75 7.125 9.75 9.375",
    link: "/u/lesson-ai/",
    unlisted: true,
  },
  {
    id: "moovit-bus-pass-2",
    category: "כלי",
    title: "Moovit Bus Pass v2",
    description: "גרסה משופרת של כרטיס האוטובוס המזויף",
    technologies: ["HTML", "CSS", "JS"],
    icon: "M3 10h18M3 6h18M3 14h18M3 18h18",
    link: "/u/moovit-bus-pass/",
    unlisted: true,
  },
  {
    id: "organizer",
    category: "ארגון",
    title: "Organizer",
    description: "כלי לארגון וסידור",
    technologies: ["HTML"],
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    link: "/u/organizer/",
    unlisted: true,
  },
  {
    id: "poker-advisor",
    category: "משחק",
    title: "Poker Advisor",
    description: "יועץ פוקר שעוזר לך להחליט מה לעשות",
    technologies: ["HTML", "CSS", "TypeScript"],
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    link: "/u/poker-advisor/",
    unlisted: true,
  },
  {
    id: "poker-debt",
    category: "כלי",
    title: "Poker Debt",
    description: "מחשבון חובות למשחקי פוקר",
    technologies: ["HTML"],
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm4-8a2 2 0 11-4 0 2 2 0 014 0z",
    link: "/u/poker-debt/",
    unlisted: true,
  },
];

const projectTemplate = (
  project,
) => `<div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 card-hover 
                    transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
            <div class="flex justify-between items-start mb-4">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
                          project.icon
                        }"/>
                    </svg>
                </div>
                <span class="bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 
                             text-xs font-medium px-2.5 py-1 rounded">
                    ${project.category}
                </span>
            </div>
            <a href="${
              project.link
            }" target="_blank" rel="noopener noreferrer" class="block">
                <h2 class="text-2xl font-bold text-gray-600 dark:text-gray-100 mb-3 
                           hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    ${project.title}
                </h2>
                <p class="text-gray-600 dark:text-gray-300 mb-6">
                    ${project.description}
                </p>
                <div class="flex justify-between items-center flex-wrap gap-y-2">
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies
                          .map(
                            (tech) => `
                                <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                                             text-xs font-medium px-2.5 py-1 rounded">
                                    ${tech}
                                </span>
                            `,
                          )
                          .join("")}
                    </div>
                </div>
            </a>
        </div>
    `;

document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.querySelector("#projects-grid");
  const unlistedProjectsContainer = document.querySelector(
    "#unlisted-projects-grid",
  );

  const listedProjects = projects.filter((p) => !p.unlisted);
  const unlistedProjects = projects.filter((p) => p.unlisted);

  projectsContainer.innerHTML = listedProjects
    .map((project) => projectTemplate(project))
    .join("");

  unlistedProjectsContainer.innerHTML = unlistedProjects
    .map((project) => projectTemplate(project))
    .join("");
});

