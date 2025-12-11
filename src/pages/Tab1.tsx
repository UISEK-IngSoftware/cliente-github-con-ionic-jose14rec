import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import './Tab1.css';


const Tab1: React.FC = () => {
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
          <RepoItem name="android-repo" imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1745px-Android_robot.svg.png" />
          <RepoItem name="ios-repo" imageUrl="https://www.nicepng.com/png/full/945-9459181_apple-logo-wonderful-picture-images-ios-white-logo.png" />
          <RepoItem name="ionic-repo" imageUrl="https://cdn.iconscout.com/icon/free/png-256/free-ionic-logo-icon-sbg-download-png-2945013.png" />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
