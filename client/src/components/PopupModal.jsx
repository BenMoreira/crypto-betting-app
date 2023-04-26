import React, { useState } from 'react';
import LogoutButton from './LogoutButton';

const PopupModal = ({shown, toggleShown, ...props}) =>{

  const handleToggleModal = () => {
    toggleShown(false);
  };

  return (
    <div className="fixed right-10 w-[200px] font-light  rounded-2xl p-2"> 
      {shown && (
        <div className="modal-content flex justify-center bg-coal-900 rounded-lg">
            <LogoutButton />
        </div>
      )}
    </div>
  );
}

export default PopupModal;
