const developers = [
  {
    id: "dev-001",
    name: "Aarav Sharma",
    role: "Full Stack Developer",
    experience: 3,
    location: "Bengaluru",
  },
  {
    id: "dev-002",
    name: "Riya Mehta",
    role: "Backend Developer",
    experience: 4,
    location: "Pune",
  },
  {
    id: "dev-003",
    name: "Kabir Patel",
    role: "Frontend Developer",
    experience: 2,
    location: "Bengaluru",
  },
  {
    id: "dev-004",
    name: "Ananya Rao",
    role: "Data Engineer",
    experience: 4,
    location: "Hyderabad",
  },
  {
    id: "dev-005",
    name: "Vihaan Singh",
    role: "Cloud Engineer",
    experience: 5,
    location: "Gurugram",
  },
  {
    id: "dev-006",
    name: "Meera Nair",
    role: "AI Engineer",
    experience: 3,
    location: "Bengaluru",
  },
  {
    id: "dev-007",
    name: "Arjun Kapoor",
    role: "Backend Developer",
    experience: 3,
    location: "Mumbai",
  },
  {
    id: "dev-008",
    name: "Ishita Shah",
    role: "Full Stack Developer",
    experience: 2,
    location: "Bengaluru",
  },
  {
    id: "dev-009",
    name: "Dev Malhotra",
    role: "DevOps Engineer",
    experience: 5,
    location: "Delhi",
  },
  {
    id: "dev-010",
    name: "Sara Khan",
    role: "Frontend Developer",
    experience: 2,
    location: "Chennai",
  },
];

const skills = [
  {
    id: "skill-001",
    name: "Frontend Development",
    category: "Development",
  },
  {
    id: "skill-002",
    name: "Backend Development",
    category: "Development",
  },
  {
    id: "skill-003",
    name: "API Development",
    category: "Development",
  },
  {
    id: "skill-004",
    name: "Database Design",
    category: "Data",
  },
  {
    id: "skill-005",
    name: "System Design",
    category: "Architecture",
  },
  {
    id: "skill-006",
    name: "Cloud Computing",
    category: "Infrastructure",
  },
  {
    id: "skill-007",
    name: "DevOps",
    category: "Infrastructure",
  },
  {
    id: "skill-008",
    name: "Data Engineering",
    category: "Data",
  },
  {
    id: "skill-009",
    name: "Machine Learning",
    category: "AI",
  },
  {
    id: "skill-010",
    name: "UI Engineering",
    category: "Frontend",
  },
  {
    id: "skill-011",
    name: "Testing",
    category: "Quality",
  },
  {
    id: "skill-012",
    name: "Security",
    category: "Security",
  },
  {
    id: "skill-013",
    name: "Real-Time Systems",
    category: "Architecture",
  },
  {
    id: "skill-014",
    name: "Distributed Systems",
    category: "Architecture",
  },
  {
    id: "skill-015",
    name: "AI Engineering",
    category: "AI",
  },
];

const technologies = [
  { id: "tech-001", name: "React", category: "Frontend" },
  { id: "tech-002", name: "Next.js", category: "Frontend" },
  { id: "tech-003", name: "TypeScript", category: "Language" },
  { id: "tech-004", name: "Node.js", category: "Backend" },
  { id: "tech-005", name: "Express.js", category: "Backend" },
  { id: "tech-006", name: "Python", category: "Language" },
  { id: "tech-007", name: "FastAPI", category: "Backend" },
  { id: "tech-008", name: "PostgreSQL", category: "Database" },
  { id: "tech-009", name: "MongoDB", category: "Database" },
  { id: "tech-010", name: "Redis", category: "Database" },
  { id: "tech-011", name: "Docker", category: "DevOps" },
  { id: "tech-012", name: "Kubernetes", category: "Infrastructure" },
  { id: "tech-013", name: "AWS", category: "Cloud" },
  { id: "tech-014", name: "Kafka", category: "Data" },
  { id: "tech-015", name: "TensorFlow", category: "AI" },
];

const projects = [
  {
    id: "project-001",
    name: "DevLens",
    description: "Developer intelligence and repository analysis platform",
    category: "Developer Tools",
  },
  {
    id: "project-002",
    name: "ShopSphere",
    description: "Full-stack e-commerce platform",
    category: "E-Commerce",
  },
  {
    id: "project-003",
    name: "FinTrack",
    description: "Personal finance and transaction management platform",
    category: "FinTech",
  },
  {
    id: "project-004",
    name: "HealthSync",
    description: "Healthcare appointment and data management platform",
    category: "HealthTech",
  },
  {
    id: "project-005",
    name: "DataPulse",
    description: "Real-time analytics and data processing platform",
    category: "Data",
  },
  {
    id: "project-006",
    name: "CloudDeploy",
    description: "Cloud deployment and infrastructure management platform",
    category: "Cloud",
  },
  {
    id: "project-007",
    name: "ChatFlow",
    description: "Real-time team communication platform",
    category: "Communication",
  },
  {
    id: "project-008",
    name: "FraudGuard",
    description: "Machine learning based fraud detection system",
    category: "FinTech",
  },
];

const developerSkills = [
  {
    developerId: "dev-001",
    skillId: "skill-001",
    proficiency: "Advanced",
    years: 3,
  },
  {
    developerId: "dev-001",
    skillId: "skill-002",
    proficiency: "Advanced",
    years: 3,
  },
  {
    developerId: "dev-001",
    skillId: "skill-003",
    proficiency: "Advanced",
    years: 3,
  },
  {
    developerId: "dev-001",
    skillId: "skill-005",
    proficiency: "Intermediate",
    years: 2,
  },

  {
    developerId: "dev-002",
    skillId: "skill-002",
    proficiency: "Advanced",
    years: 4,
  },
  {
    developerId: "dev-002",
    skillId: "skill-003",
    proficiency: "Advanced",
    years: 4,
  },
  {
    developerId: "dev-002",
    skillId: "skill-004",
    proficiency: "Advanced",
    years: 3,
  },
  {
    developerId: "dev-002",
    skillId: "skill-005",
    proficiency: "Intermediate",
    years: 2,
  },

  {
    developerId: "dev-003",
    skillId: "skill-001",
    proficiency: "Advanced",
    years: 2,
  },
  {
    developerId: "dev-003",
    skillId: "skill-010",
    proficiency: "Advanced",
    years: 2,
  },
  {
    developerId: "dev-003",
    skillId: "skill-011",
    proficiency: "Intermediate",
    years: 1,
  },

  {
    developerId: "dev-004",
    skillId: "skill-008",
    proficiency: "Advanced",
    years: 4,
  },
  {
    developerId: "dev-004",
    skillId: "skill-004",
    proficiency: "Advanced",
    years: 4,
  },
  {
    developerId: "dev-004",
    skillId: "skill-014",
    proficiency: "Intermediate",
    years: 2,
  },

  {
    developerId: "dev-005",
    skillId: "skill-006",
    proficiency: "Advanced",
    years: 5,
  },
  {
    developerId: "dev-005",
    skillId: "skill-007",
    proficiency: "Advanced",
    years: 5,
  },
  {
    developerId: "dev-005",
    skillId: "skill-014",
    proficiency: "Advanced",
    years: 3,
  },

  {
    developerId: "dev-006",
    skillId: "skill-009",
    proficiency: "Advanced",
    years: 3,
  },
  {
    developerId: "dev-006",
    skillId: "skill-015",
    proficiency: "Advanced",
    years: 3,
  },
  {
    developerId: "dev-006",
    skillId: "skill-008",
    proficiency: "Intermediate",
    years: 2,
  },

  {
    developerId: "dev-007",
    skillId: "skill-002",
    proficiency: "Advanced",
    years: 3,
  },
  {
    developerId: "dev-007",
    skillId: "skill-003",
    proficiency: "Advanced",
    years: 3,
  },
  {
    developerId: "dev-007",
    skillId: "skill-013",
    proficiency: "Advanced",
    years: 2,
  },

  {
    developerId: "dev-008",
    skillId: "skill-001",
    proficiency: "Advanced",
    years: 2,
  },
  {
    developerId: "dev-008",
    skillId: "skill-002",
    proficiency: "Intermediate",
    years: 2,
  },
  {
    developerId: "dev-008",
    skillId: "skill-012",
    proficiency: "Intermediate",
    years: 1,
  },

  {
    developerId: "dev-009",
    skillId: "skill-006",
    proficiency: "Advanced",
    years: 5,
  },
  {
    developerId: "dev-009",
    skillId: "skill-007",
    proficiency: "Advanced",
    years: 5,
  },
  {
    developerId: "dev-009",
    skillId: "skill-014",
    proficiency: "Advanced",
    years: 4,
  },

  {
    developerId: "dev-010",
    skillId: "skill-001",
    proficiency: "Advanced",
    years: 2,
  },
  {
    developerId: "dev-010",
    skillId: "skill-010",
    proficiency: "Advanced",
    years: 2,
  },
  {
    developerId: "dev-010",
    skillId: "skill-011",
    proficiency: "Intermediate",
    years: 1,
  },
];

const projectTechnologies = [
  { projectId: "project-001", technologyId: "tech-001", usage: "Frontend" },
  { projectId: "project-001", technologyId: "tech-004", usage: "Backend" },
  { projectId: "project-001", technologyId: "tech-008", usage: "Database" },
  { projectId: "project-001", technologyId: "tech-011", usage: "Deployment" },

  { projectId: "project-002", technologyId: "tech-001", usage: "Frontend" },
  { projectId: "project-002", technologyId: "tech-003", usage: "Frontend" },
  { projectId: "project-002", technologyId: "tech-004", usage: "Backend" },
  { projectId: "project-002", technologyId: "tech-009", usage: "Database" },

  { projectId: "project-003", technologyId: "tech-002", usage: "Frontend" },
  { projectId: "project-003", technologyId: "tech-004", usage: "Backend" },
  { projectId: "project-003", technologyId: "tech-008", usage: "Database" },
  { projectId: "project-003", technologyId: "tech-010", usage: "Caching" },

  { projectId: "project-004", technologyId: "tech-006", usage: "Backend" },
  { projectId: "project-004", technologyId: "tech-007", usage: "API" },
  { projectId: "project-004", technologyId: "tech-008", usage: "Database" },

  { projectId: "project-005", technologyId: "tech-006", usage: "Processing" },
  { projectId: "project-005", technologyId: "tech-014", usage: "Streaming" },
  { projectId: "project-005", technologyId: "tech-010", usage: "Caching" },

  { projectId: "project-006", technologyId: "tech-011", usage: "Containers" },
  { projectId: "project-006", technologyId: "tech-012", usage: "Orchestration" },
  { projectId: "project-006", technologyId: "tech-013", usage: "Cloud" },

  { projectId: "project-007", technologyId: "tech-001", usage: "Frontend" },
  { projectId: "project-007", technologyId: "tech-004", usage: "Backend" },
  { projectId: "project-007", technologyId: "tech-010", usage: "Real-Time State" },

  { projectId: "project-008", technologyId: "tech-006", usage: "Model Pipeline" },
  { projectId: "project-008", technologyId: "tech-015", usage: "Machine Learning" },
  { projectId: "project-008", technologyId: "tech-008", usage: "Data Storage" },
];

const projectSkills = [
  { projectId: "project-001", skillId: "skill-001" },
  { projectId: "project-001", skillId: "skill-002" },
  { projectId: "project-001", skillId: "skill-003" },
  { projectId: "project-001", skillId: "skill-005" },

  { projectId: "project-002", skillId: "skill-001" },
  { projectId: "project-002", skillId: "skill-010" },
  { projectId: "project-002", skillId: "skill-004" },

  { projectId: "project-003", skillId: "skill-002" },
  { projectId: "project-003", skillId: "skill-004" },
  { projectId: "project-003", skillId: "skill-012" },

  { projectId: "project-004", skillId: "skill-002" },
  { projectId: "project-004", skillId: "skill-003" },
  { projectId: "project-004", skillId: "skill-004" },

  { projectId: "project-005", skillId: "skill-008" },
  { projectId: "project-005", skillId: "skill-013" },
  { projectId: "project-005", skillId: "skill-014" },

  { projectId: "project-006", skillId: "skill-006" },
  { projectId: "project-006", skillId: "skill-007" },
  { projectId: "project-006", skillId: "skill-014" },

  { projectId: "project-007", skillId: "skill-001" },
  { projectId: "project-007", skillId: "skill-002" },
  { projectId: "project-007", skillId: "skill-013" },

  { projectId: "project-008", skillId: "skill-009" },
  { projectId: "project-008", skillId: "skill-015" },
  { projectId: "project-008", skillId: "skill-008" },
];

const developerProjects = [
  { developerId: "dev-001", projectId: "project-001", role: "Full Stack Developer", durationMonths: 10 },
  { developerId: "dev-001", projectId: "project-002", role: "Backend Developer", durationMonths: 6 },

  { developerId: "dev-002", projectId: "project-003", role: "Backend Developer", durationMonths: 12 },
  { developerId: "dev-002", projectId: "project-004", role: "API Developer", durationMonths: 8 },

  { developerId: "dev-003", projectId: "project-002", role: "Frontend Developer", durationMonths: 9 },
  { developerId: "dev-003", projectId: "project-007", role: "Frontend Developer", durationMonths: 6 },

  { developerId: "dev-004", projectId: "project-005", role: "Data Engineer", durationMonths: 11 },

  { developerId: "dev-005", projectId: "project-006", role: "Cloud Engineer", durationMonths: 14 },

  { developerId: "dev-006", projectId: "project-008", role: "AI Engineer", durationMonths: 10 },

  { developerId: "dev-007", projectId: "project-007", role: "Backend Developer", durationMonths: 8 },
  { developerId: "dev-007", projectId: "project-004", role: "Backend Developer", durationMonths: 7 },

  { developerId: "dev-008", projectId: "project-001", role: "Frontend Developer", durationMonths: 7 },
  { developerId: "dev-008", projectId: "project-004", role: "Full Stack Developer", durationMonths: 5 },

  { developerId: "dev-009", projectId: "project-006", role: "DevOps Engineer", durationMonths: 15 },

  { developerId: "dev-010", projectId: "project-002", role: "UI Engineer", durationMonths: 8 },
];

const relatedSkills = [
  ["skill-001", "skill-010"],
  ["skill-001", "skill-005"],
  ["skill-002", "skill-003"],
  ["skill-002", "skill-005"],
  ["skill-003", "skill-004"],
  ["skill-004", "skill-008"],
  ["skill-005", "skill-014"],
  ["skill-006", "skill-007"],
  ["skill-006", "skill-014"],
  ["skill-007", "skill-014"],
  ["skill-008", "skill-009"],
  ["skill-009", "skill-015"],
  ["skill-013", "skill-014"],
  ["skill-012", "skill-005"],
];

module.exports = {
  developers,
  skills,
  technologies,
  projects,
  developerSkills,
  projectTechnologies,
  projectSkills,
  developerProjects,
  relatedSkills,
};
