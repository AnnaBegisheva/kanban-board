import ModalWindow from '@components/shared/ModalWindow/ModalWindow';
import TaskCard from '@components/TaskCard/TaskCard/TaskCard';
import { getCardsByBoardId, getListsByBoardId } from '@services/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import BoardColumn from '../BoardColumn/BoardColumn';
import styles from './Board.module.scss';
import { buildColumns } from './buildColumns';

type BoardProps = {
  boardId: string;
};

const Board: React.FC<BoardProps> = ({ boardId }) => {
  const { data: columns } = useQuery({
    queryKey: ['columns', boardId],
    queryFn: () => getListsByBoardId(boardId),
  });

  const { data: tasks } = useQuery({
    queryKey: ['tasks', boardId],
    queryFn: () => getCardsByBoardId(boardId),
  });

  const tasksByColumn = useMemo(() => {
    if (!columns || !tasks) return [];
    return buildColumns(columns, tasks);
  }, [columns, tasks]);

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedTask = tasks?.find((task) => task.id === selectedTaskId) ?? null;

  const handleCardClick = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  return (
    <>
      <section className={styles.board}>
        {tasksByColumn.map((column) => (
          <BoardColumn
            key={column.id}
            columnId={column.id}
            tasks={column.tasks ?? []}
            title={column.name}
            onCardClick={handleCardClick}
          />
        ))}
      </section>
      <ModalWindow open={!!selectedTaskId} onClose={() => setSelectedTaskId(null)}>
        {selectedTask ? <TaskCard task={selectedTask} /> : null}
      </ModalWindow>
    </>
  );
};

export default Board;
