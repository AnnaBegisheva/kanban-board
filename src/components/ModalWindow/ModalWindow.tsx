import { Modal, type ModalProps } from 'antd';
import { type ReactNode } from 'react';

interface ModalWindowProps extends Omit<ModalProps, 'open' | 'onCancel' | 'children'> {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalWindow = ({ open, onClose, children, ...modalProps }: ModalWindowProps) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} destroyOnHidden {...modalProps}>
      {children}
    </Modal>
  );
};

export default ModalWindow;
