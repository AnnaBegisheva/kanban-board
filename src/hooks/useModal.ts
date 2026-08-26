import { useCallback,useState } from 'react';

export const useModal = (defaultState?: boolean): [isOpen: boolean, open: () => void, close: () => void] => {
  const [isOpen, setIsOpen] = useState(defaultState ?? false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [isOpen, handleOpen, handleClose];
};
