import { useDraggable } from '@dnd-kit/react';

type DraggableProps = {
    id: string;
    children: React.ReactNode;
  
};

const Draggable: React.FC<DraggableProps> = ({ id, children }) => {
  const { ref } = useDraggable({ id });

  return <div ref={ref}>{children}</div>;
};

export default Draggable;
