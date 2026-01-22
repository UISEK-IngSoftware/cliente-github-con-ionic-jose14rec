import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_API_TOKEN = `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`;

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
      headers: {
        Authorization: GITHUB_API_TOKEN,
      },
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        affiliation: "owner",
      },
    });

    const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
      name: repo.name,
      description: repo.description ? repo.description : null,
      imageUrl: repo.owner?.avatar_url || null,
      owner: repo.owner?.login || null,
      language: repo.language || null,
    }));

    return repositories;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, repo , {
      headers: {
        Authorization: GITHUB_API_TOKEN,
      },
    }); 
    console.log("Repositorio creado:", response.data);
  } catch (error) {
    console.error("Error creando repositorios:", error);
  }
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user`, {
      headers: {
        Authorization: GITHUB_API_TOKEN,
      },
    })
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}

export const updateRepository = async (
  owner: string,
  repoName: string,
  data: {
    name?: string;
    description?: string | null;
    private?: boolean;
  }
): Promise<void> => {
  try {
    const response = await axios.patch(
      `${GITHUB_API_URL}/repos/${owner}/${repoName}`,
      data,
      {
        headers: {
          Authorization: GITHUB_API_TOKEN,
        },
      }
    );

    console.log("Repositorio actualizado:", response.data);
  } catch (error) {
    console.error("Error actualizando repositorio:", error);
    throw error;
  }
};

export const deleteRepository = async (
  owner: string,
  repoName: string
): Promise<void> => {
  try {
    await axios.delete(
      `${GITHUB_API_URL}/repos/${owner}/${repoName}`,
      {
        headers: {
          Authorization: GITHUB_API_TOKEN,
        },
      }
    );

    console.log("Repositorio eliminado");
  } catch (error) {
    console.error("Error eliminando repositorio:", error);
    throw error;
  }
};

