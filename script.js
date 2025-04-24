const projects = [
  {
    id: "moovit-bus-pass",
    category: "תחבורה",
    title: "Moovit Bus Pass",
    description:
      "אפליקציה סטטית פשוטה שיוצרת כרטיס נסיעה לשעה ולתאריך הנוכחיים.",
    technologies: ["HTML", "CSS", "JavaScript"],
    icon:
      "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    link: "/projects/moovit_bus_pass/",
  },
  {
    id: "magshi-date",
    category: "לוח זמנים",
    title: "Magshi Date",
    description:
      "אפליקציה נקייה ודוברת שתי שפות לבדיקת שיעורי מגשימים הקרובים לפי תאריך.",
    technologies: ["HTML", "Tailwind", "JavaScript"],
    icon:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    link: "/projects/magshi-date/",
  },

  {
    id: "compiler-project",
    category: "קומפיילר",
    title: "Compiler Project",
    description:
      "קומפיילר בשביל הבגרות במדעי המחשב עם המחלקות של משרד החינוך לבגרות",
    technologies: ["HTML", "CSS", "JavaScript", "Typescript", "Express"],
    icon: "PLACE_ICON_HERE",
    link: "https://github.com/idandrori555/Online-Edu-Java-Compiler",
  },
];

const projectTemplate = (project) => `
    <div class="bg-white rounded-xl shadow-md p-6 card-hover border border-gray-100">
        <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${project.icon}"/>
                </svg>
            </div>
            <span class="bg-primary-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded">${project.category}</span>
        </div>
        <a href="${project.link}" class="block">
            <h2 class="text-2xl font-bold text-gray-800 mb-3 hover:text-primary-600 transition-colors">
                ${project.title}
            </h2>
            <p class="text-gray-600 mb-6">
                ${project.description}
            </p>
            <div class="flex justify-between items-center">
                <div class="flex space-x-2 space-x-reverse">
                    ${
  project.technologies
    .map(
      (tech) => `
                        <span class="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">${tech}</span>
                    `,
    )
    .join("")
}
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
