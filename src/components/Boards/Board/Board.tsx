import BoardColumn from '@components/Boards/BoardColumn/BoardColumn';
import ModalWindow from '@components/shared/ModalWindow/ModalWindow';
import TaskCard from '@components/TaskCard/TaskCard/TaskCard';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import useUpdateTask from '@hooks/useUpdateTask';
import { getCardsByBoardId, getListsByBoardId } from '@services/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import styles from './Board.module.scss';
import { buildColumns } from './buildColumns';

type BoardProps = {
  boardId: string;
};

const Board: React.FC<BoardProps> = ({ boardId }) => {
  const tasksQueryKey = ['tasks', boardId];
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const { data: columns = [] } = useQuery({
    queryKey: ['columns', boardId],
    queryFn: () => getListsByBoardId(boardId),
  });

  const { data: tasks = [] } = useQuery({
    queryKey: tasksQueryKey,
    queryFn: () => getCardsByBoardId(boardId),
  });

  const tasksByColumn = useMemo(() => buildColumns(columns, tasks), [columns, tasks]);
  const selectedTask = useMemo(() => tasks.find((task) => task.id === selectedTaskId) ?? null, [tasks, selectedTaskId]);

  const { mutate: updateTask } = useUpdateTask(boardId);

  const handleCardClick = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleModalClose = () => {
    setSelectedTaskId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return;

    const { source, target } = event.operation;
    const taskId = source?.id;
    const columnId = target?.id;

    if (typeof taskId !== 'string' || typeof columnId !== 'string') {
      return;
    }

    const draggedTask = tasks.find((task) => task.id === taskId);

    if (!draggedTask || draggedTask.idList === columnId) {
      return;
    }

    updateTask({
      ...draggedTask,
      idList: columnId,
    });
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
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

      <ModalWindow open={!!selectedTask} onClose={handleModalClose}>
        {selectedTask && <TaskCard task={selectedTask} boardId={boardId} />}
      </ModalWindow>
    </DragDropProvider>
  );
};

export default Board;
