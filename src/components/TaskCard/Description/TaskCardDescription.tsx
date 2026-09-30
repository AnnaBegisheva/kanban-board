import { EditOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import React, { memo, useEffect, useState } from 'react';

import styles from './taskDescription.module.scss';

type TaskDescriptionProps = {
  desc: string;
  onSave: (value: string) => void;
};

const TaskCardDescription: React.FC<TaskDescriptionProps> = memo(({ desc, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(desc);

  useEffect(() => {
    if (!isEditing) {
      setDescription(desc);
    }
  }, [desc, isEditing]);

  const handleEdit = () => {
    setDescription(desc);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDescription(desc);
    setIsEditing(false);
  };

  const handleSave = () => {
    onSave(description);
    setIsEditing(false);
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <Typography.Text strong>Описание: </Typography.Text>

        <EditOutlined onClick={handleEdit} className={styles.editIcon} />
      </div>

      {isEditing ? (
        <div>
          <Input.TextArea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            autoSize={{
              minRows: 4,
              maxRows: 10,
            }}
          />

          <div className={styles.actions}>
            <Button onClick={handleCancel}>Отмена</Button>
            <Button type="primary" onClick={handleSave}>
              Сохранить
            </Button>
          </div>
        </div>
      ) : (
        <Typography.Paragraph className={styles.description}>{desc || 'Описание отсутствует'}</Typography.Paragraph>
      )}
    </section>
  );
});

export default TaskCardDescription;
