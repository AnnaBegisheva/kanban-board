import { getListsByBoardId } from '@services/api';
import { useQuery } from '@tanstack/react-query';
import { Select, Typography } from 'antd';
import { memo } from 'react';
import { useParams } from 'react-router';

import styles from './taskColumn.module.scss';

type TaskStatusProps = {
  value: string;
  onChange: (value: string) => void;
};

const TaskCardColumn: React.FC<TaskStatusProps> = memo(({ value, onChange }) => {
  const { id: boardId } = useParams<{ id: string }>();

  const { data: columns } = useQuery({
    queryKey: ['columns', boardId],
    queryFn: () => getListsByBoardId(boardId!),
    enabled: Boolean(boardId),
  });
  return (
    <section className={styles.status}>
      <Typography.Text strong>Статус: </Typography.Text>

      <Select
        className={styles.select}
        value={value}
        options={columns?.map((column) => ({
          value: column.id,
          label: column.name,
        }))}
        onChange={onChange}
      />
    </section>
  );
});

export default TaskCardColumn;
