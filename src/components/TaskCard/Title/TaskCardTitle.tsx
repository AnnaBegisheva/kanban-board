import { Typography } from 'antd';
import { memo, useState } from 'react';

import styles from './taskTitle.module.scss';

type TaskTitleProps = {
  taskName: string;
  onSave: (value: string) => void;
};

const TaskCardTitle: React.FC<TaskTitleProps> = memo(({ taskName, onSave }) => {
  const [title, setTitle] = useState(taskName);

  return (
    <header className={styles.cardHeader}>
      <Typography.Title
        level={3}
        editable={{
          onChange: setTitle,
          onEnd: () => onSave(title),
        }}
      >
        {title}
      </Typography.Title>
    </header>
  );
});

export default TaskCardTitle;
