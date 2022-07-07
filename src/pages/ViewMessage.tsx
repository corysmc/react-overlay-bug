import { useState } from "react";
import { Message, getMessage } from "../data/messages";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewMessage.css";
import CustomModal from "../components/CustomModal";

function ViewMessage() {
  const [message, setMessage] = useState<Message>();

  const [showIonModal, setShowIonModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);

  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const msg = getMessage(parseInt(params.id, 10));
    setMessage(msg);
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {message ? (
          <>
            <IonButton color="danger" onClick={() => setShowIonModal(true)}>
              Show IonModal
            </IonButton>
            <IonButton onClick={() => setShowCustomModal(true)}>
              Show Custom Modal
            </IonButton>
            <IonItem>
              <IonIcon icon={personCircle} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {message.fromName}
                  <span className="date">
                    <IonNote>{message.date}</IonNote>
                  </span>
                </h2>
                <h3>
                  To: <IonNote>Me</IonNote>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{message.subject}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
      {showIonModal && (
        <IonModal isOpen={true} onDidDismiss={() => setShowIonModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Content</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            Ionic Modal Content here!
            <IonButton color="danger" onClick={() => setShowIonModal(false)}>
              Hide Modal (will break)
            </IonButton>
          </IonContent>
        </IonModal>
      )}
      {showCustomModal && (
        <CustomModal
          isOpen={true}
          onDidDismiss={() => setShowCustomModal(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Custom Modal</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            Custom Modal Content here!
            <IonButton onClick={() => setShowCustomModal(false)}>
              Hide Modal
            </IonButton>
          </IonContent>
        </CustomModal>
      )}
    </IonPage>
  );
}

export default ViewMessage;
