import { Typography } from 'antd';
import { memo } from 'react';

import styles from './taskTitle.module.scss';

type TaskTitleProps = {
  taskName: string;
  onSave: (value: string) => void;
};

const TaskCardTitle: React.FC<TaskTitleProps> = memo(({ taskName, onSave }) => {
  return (
    <header className={styles.cardHeader}>
      <Typography.Title
        level={3}
        editable={{
          onChange: onSave,
        }}
      >
        {taskName}
      </Typography.Title>
    </header>
  );
});

export default TaskCardTitle;
