import { sampleProjects, type Project, type ProjectType } from "./projects";

const simulateLatency = async <T>(value: T, delay = 200): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), delay));

export async function listProjects(order: "-created" | "created" = "-created"): Promise<Project[]> {
  const sorted = [...sampleProjects].sort((a, b) => {
    if (order === "-created") {
      return (b.year ?? "").localeCompare(a.year ?? "");
    }
    return (a.year ?? "").localeCompare(b.year ?? "");
  });
  return simulateLatency(sorted);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const project = sampleProjects.find((item) => item.id === id);
  return simulateLatency(project);
}

export async function listProjectsByType(type: ProjectType): Promise<Project[]> {
  const filtered = sampleProjects.filter((project) => project.project_type === type);
  return simulateLatency(filtered);
}

