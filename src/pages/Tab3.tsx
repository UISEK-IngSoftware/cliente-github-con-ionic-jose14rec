import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <img alt="Jose Alejandro Recalde" src="https://council.science/wp-content/uploads/2025/10/joshua-tsu-YLJF3YLHt6s-unsplash-3000x1688.jpg" />
      <IonCardHeader>
        <IonCardTitle>Jose Alejandro Recalde</IonCardTitle>
        <IonCardSubtitle>jose.recalde@uisek.edu.ec</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        Soy un estudiante de Ingeniería en Software, responsable y motivado por aprender.
      </IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
