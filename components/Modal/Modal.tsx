'use client';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
}
export default function Modal({ onClose, children }: ModalProps) {
  const router = useRouter();
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
// 'use client';
// import { createPortal } from 'react-dom';
// import css from './Modal.module.css';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// type Props = {
//   children: React.ReactNode;
// };

// const Modal = ({ children }: Props) => {
//   const router = useRouter();

//   const close = () => router.back();

//   return createPortal(
//     <div className={css.backdrop}>
//       <div className={css.modal}>
//         {children}
//         <button onClick={close}>Close</button>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default Modal;
