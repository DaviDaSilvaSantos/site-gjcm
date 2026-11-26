import { useCallback, useEffect, useState } from "react";
import { createProject, deleteProject, getProjects, updateProject } from "../services/projectsService.js";

export function useProjects() {
  const [projects, setProjects] = useState(() => getProjects());
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    const sync = () => setProjects(getProjects());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const add = useCallback((data) => {
    const result = createProject(data);
    if (result.success) setProjects(getProjects());
    else setStorageError(result.message);
    return result;
  }, []);

  const edit = useCallback((id, data) => {
    const result = updateProject(id, data);
    if (result.success) setProjects(getProjects());
    else setStorageError(result.message);
    return result;
  }, []);

  const remove = useCallback((id) => {
    const result = deleteProject(id);
    if (result.success) setProjects(getProjects());
    else setStorageError(result.message);
    return result;
  }, []);

  return { projects, add, edit, remove, storageError, clearStorageError: () => setStorageError("") };
}
