import { formatDate } from '@utils/formatDate';
import { Typography } from 'antd';
import { memo } from 'react';

import styles from '../TaskCard/taskCard.module.scss';

type TaskMetadataProps = {
  date: string;
  dateLastActivity: string;
};

const TaskCardMetaData: React.FC<TaskMetadataProps> = memo(({ date, dateLastActivity }) => {
  return (
    <section className={styles.section}>
      <Typography.Text strong>Дополнительная информация: </Typography.Text>

      <div className={styles.metadata}>
        <div className={styles.metadataItem}>
          <Typography.Text type="secondary">Дата создания: </Typography.Text>

          <Typography.Text>{date ? formatDate(date) : 'Дата неизвестна'}</Typography.Text>
        </div>

        <div className={styles.metadataItem}>
          <Typography.Text type="secondary">Последнее изменение: </Typography.Text>

          <Typography.Text>{dateLastActivity ? formatDate(dateLastActivity) : 'Дата неизвестна'}</Typography.Text>
        </div>
      </div>
    </section>
  );
});

export default TaskCardMetaData;
