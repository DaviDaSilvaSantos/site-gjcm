import { initialProjects } from "../data/projects.js";

const STORAGE_KEY = "coracao-mariano:projects:v1";

function normalizeProject(project) {
  return {
    id: project.id || crypto.randomUUID(),
    slug: project.slug || (project.title || "projeto").toLocaleLowerCase("pt-BR")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    title: String(project.title || "").trim(),
    shortDescription: String(project.shortDescription || "").trim(),
    description: String(project.description || "").trim(),
    category: String(project.category || "Iniciativa").trim(),
    coverImage: project.coverImage || "",
    status: project.status || "published",
    featured: Boolean(project.featured),
    createdAt: project.createdAt || new Date().toISOString(),
    updatedAt: project.updatedAt || new Date().toISOString(),
    order: Number.isFinite(project.order) ? project.order : 0,
  };
}

export function getProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return initialProjects.map(normalizeProject);
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) throw new Error("Formato de projetos inválido.");
    return parsed.map(normalizeProject);
  } catch (error) {
    console.error("Não foi possível carregar os projetos:", error);
    return [];
  }
}

function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return { success: true };
  } catch (error) {
    console.error("Não foi possível salvar os projetos:", error);
    return {
      success: false,
      message: error?.name === "QuotaExceededError"
        ? "O armazenamento do navegador está cheio. Remova imagens ou utilize arquivos menores."
        : "Não foi possível salvar os dados neste navegador.",
    };
  }
}

export function createProject(input) {
  if (!input.title?.trim()) return { success: false, message: "Informe o título do projeto." };
  const projects = getProjects();
  const now = new Date().toISOString();
  const project = normalizeProject({ ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now });
  const result = saveProjects([project, ...projects]);
  return result.success ? { ...result, project } : result;
}

export function updateProject(id, input) {
  if (!input.title?.trim()) return { success: false, message: "Informe o título do projeto." };
  const projects = getProjects();
  if (!projects.some((project) => project.id === id)) {
    return { success: false, message: "Projeto não encontrado." };
  }
  const updated = projects.map((project) => project.id === id
    ? normalizeProject({ ...project, ...input, id, createdAt: project.createdAt, updatedAt: new Date().toISOString() })
    : project);
  const result = saveProjects(updated);
  return result.success ? { ...result, project: updated.find((project) => project.id === id) } : result;
}

export function deleteProject(id) {
  const projects = getProjects();
  if (!projects.some((project) => project.id === id)) {
    return { success: false, message: "Projeto não encontrado." };
  }
  return saveProjects(projects.filter((project) => project.id !== id));
}

export function findProject(id) {
  return getProjects().find((project) => project.id === id) || null;
}
