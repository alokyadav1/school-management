/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import styles from "./modal.module.css";
import {GrClose} from "react-icons/gr";
function CustomModal({modalTitle,name,standard, children, handleRequestClose}) {

  const handleModalClick = () => {
    handleRequestClose()
  }

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  }
  return (
    <>
      <div className={`${styles.overlay}`} onClick={handleModalClick}>
        <div className={` ${styles.modal} relative `} onClick={handleModalContentClick}>
          <header className="">
            <h1 className="text-2xl w-fit mx-auto">{modalTitle?modalTitle:"Title"}</h1>
            {name && <div className="flex gap-2 items-center pb-1 text-center w-fit mx-auto">
              <p className="text uppercase font-bold ">{name}</p>
              <span className="bg-blue-700 rounded-lg text-sm px-2 text-white font-bold py-0 pt-1">{standard} <sup>th</sup> </span>
            </div>}
            <button onClick={handleRequestClose} className="absolute top-1 right-2 rounded-lg active:border-4 active:border-blue-200 p-2"><GrClose /></button>
          </header>
          <hr />
          <main className={`${styles.modalContent} pt-2`}>
           {children}
          </main>
          
        </div>
      </div>
    </>
  );
}

export default CustomModal;
