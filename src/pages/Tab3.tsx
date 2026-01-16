import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { getUserInfo } from '../services/GithubService';
import './Tab3.css';

const Tab3: React.FC = () => {
const [userInfo, setUserInfo] = useState({
  name: 'No se puede cargar el usuario',
  username: 'no-username',
  bio: 'no se puede cargar la biografía',
  avatar_url: 'https://ionicframework.com/docs/img/demos/card-media.png',
});

const loadUserInfo = async () => {
  const response = await getUserInfo();
  if (response) {
    setUserInfo({
      name: response.name,
      username: response.login,
      bio: response.bio,
      avatar_url: response.avatarUrl,
    });
  }
}


  useIonViewDidEnter(() => {
    loadUserInfo();
  });

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
      <img alt="Jose Alejandro Recalde" src={userInfo.avatar_url} />
      <IonCardHeader>
        <IonCardTitle>{userInfo.username}</IonCardTitle>
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
