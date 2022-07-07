import { IonModal } from "@ionic/react";
import React, { ComponentProps, useLayoutEffect, useRef } from "react";

type IonModalProps = ComponentProps<typeof IonModal>;

const CustomModal: React.FC<IonModalProps> = (props) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  useLayoutEffect(
    () => () => {
      // hack to fix
      modalRef.current?.dismiss();
    },
    []
  );

  return (
    <div>
      <IonModal ref={modalRef} {...props} isOpen={true}>
        {props.children}
      </IonModal>
    </div>
  );
};

export default CustomModal;
