import React from "react";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonModal,
  IonInput,
  IonButton,
} from "@ionic/react";

import "./Tab1.css";

import { RepositoryItem } from "../interfaces/RepositoryItem";
import {
  fetchRepositories,
  deleteRepository,
  updateRepository,
} from "../services/GithubService";

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<RepositoryItem[]>([]);

  const [selectedRepo, setSelectedRepo] =
    React.useState<RepositoryItem | null>(null);

  const [showModal, setShowModal] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  };

  useIonViewDidEnter(() => {
    console.log("Cargando repositorios...");
    loadRepos();
  });

  const handleDelete = async (repo: RepositoryItem) => {
    try {
      await deleteRepository(repo.owner!, repo.name);
      loadRepos();
    } catch (error) {
      console.error(error);
      alert("Error eliminando repositorio");
    }
  };

  const openEditModal = (repo: RepositoryItem) => {
    setSelectedRepo(repo);
    setNewName(repo.name);
    setNewDescription(repo.description || "");
    setShowModal(true);
  };

  const saveChanges = async () => {
    if (!selectedRepo) return;

    try {
      await updateRepository(selectedRepo.owner!, selectedRepo.name, {
        name: newName,
        description: newDescription,
      });

      setShowModal(false);
      loadRepos();
    } catch (error) {
      console.error(error);
      alert("Error actualizando repositorio");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repos.map((repo, index) => (
            <IonItemSliding key={index}>
              <IonItem>
                <IonLabel>
                  <h2>{repo.name}</h2>
                  <p>{repo.description}</p>
                </IonLabel>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption
                  color="warning"
                  onClick={() => openEditModal(repo)}
                >
                  Editar
                </IonItemOption>

                <IonItemOption
                  color="danger"
                  onClick={() => handleDelete(repo)}
                >
                  Eliminar
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        >
          <IonContent className="ion-padding">
            <h2>Editar repositorio</h2>

            <IonInput
              value={newName}
              placeholder="Nombre"
              onIonChange={(e) => setNewName(e.detail.value!)}
            />

            <IonInput
              value={newDescription}
              placeholder="Descripción"
              onIonChange={(e) => setNewDescription(e.detail.value!)}
            />

            <IonButton expand="block" onClick={saveChanges}>
              Guardar
            </IonButton>

            <IonButton
              expand="block"
              color="medium"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;