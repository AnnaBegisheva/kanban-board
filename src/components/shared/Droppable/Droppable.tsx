import { useDroppable } from '@dnd-kit/react';

type DroppableProps = {
  id: string;
  children: React.ReactNode;
};

const Droppable: React.FC<DroppableProps> = ({ id, children }) => {
  const { ref } = useDroppable({ id });

  return <div ref={ref}>{children}</div>;
};

export default Droppable;
