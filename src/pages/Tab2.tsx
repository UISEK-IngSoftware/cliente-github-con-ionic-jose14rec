import { IonButton, IonContent, IonHeader, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import './Tab2.css';
import { createRepository } from '../services/GithubService';



const Tab2: React.FC = () => {
  const history = useHistory();
  
  const repoFormData : RepositoryItem = {
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language: null,
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;
  }

  const setDescription = (value: string) => {
    repoFormData.description = value;
  }

  const saveRepo = () => {
    console.log('Guardando repositorio:', repoFormData);
    if (repoFormData.name.trim() === '') {
      alert('El nombre del repositorio es obligatorio.');
      return;
    }
    createRepository(repoFormData).then(() => {
      history.push('/tab1');
    }).catch((error) => {
      console.error('Error al crear el repositorio:', error);
      alert('Hubo un error al crear el repositorio. Por favor, inténtalo de nuevo.');
    });
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container">
          <IonInput
           className="form-field" 
           label="Nombre del repositorio"
           labelPlacement="floating"
           fill="outline" 
           placeholder="repositorio-de-ejemplo"
           value={repoFormData.name}
           onIonChange={e => setRepoName(e.detail.value!)}
           ></IonInput>

          <IonTextarea
           label="Descripción del repositorio"
           labelPlacement="floating"
           fill="outline"
           placeholder="Este es un repositorio de ejemplo."
           value={repoFormData.description}
           onIonChange={e => setDescription(e.detail.value!)}
           rows={6}></IonTextarea>

           <IonButton expand="block" className="form-field" onClick={saveRepo}>Guardar</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
