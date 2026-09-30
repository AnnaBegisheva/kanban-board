import type { Task } from '../../../services/types';
import { Button, Collapse, Popconfirm, Timeline, Typography } from 'antd';
import { Input, Select } from 'antd';
import { formatDate } from '../../../utils/formatDate';
import styles from './TaskCard.module.scss';
import { useState } from 'react';
import { deleteTaskById, getActionsByTaskId, getListsByBoardId, updateTaskById } from '../../../services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';

type TaskCardProps = {
  task: Task;
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [taskTitle, setTaskTitle] = useState(task.name);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(task.desc || '');

  const { id: boardId } = useParams<{ id: string }>();
  const { data: columns } = useQuery({
    queryKey: ['columns', boardId],
    queryFn: () => getListsByBoardId(boardId!),
    enabled: Boolean(boardId),
  });

  const queryClient = useQueryClient();
  const { mutate: updateTask } = useMutation({
    mutationFn: (newTask: Task) => updateTaskById(task.id, newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('Error updating task:', error);
    },
  });

  const { data: actions } = useQuery({
    queryKey: ['actions', task.id],
    queryFn: () => getActionsByTaskId(task.id),
  });

  const { mutate: deleteTask } = useMutation({
    mutationFn: () => deleteTaskById(task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('Error deleting task:', error);
    },
  });

  const handleCancelDescription = () => {
    setDescription(task.desc ?? '');
    setIsEditingDescription(false);
  };

  const handleSaveDescription = () => {
    updateTask({ ...task, desc: description });
    setDescription('');
  };

  return (
    <div className={styles.cardDetails}>
      <section className={styles.section}>
        <Typography.Title
          level={3}
          editable={{
            onChange: (value) => setTaskTitle(value),
            onEnd: () => updateTask({ ...task, name: taskTitle }),
          }}
        >
          {taskTitle}
        </Typography.Title>
      </section>

      <section className={styles.section}>
        <Typography.Text strong>Статус</Typography.Text>

        <Select
          value={task.idList}
          onChange={(value) => updateTask({ ...task, idList: value })}
          options={columns?.map((column) => ({
            value: column.id,
            label: column.name,
          }))}
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Typography.Text strong>Описание</Typography.Text>
          <Button onClick={() => setIsEditingDescription(true)}>Редактировать</Button>
        </div>
        {isEditingDescription ? (
          <div className={styles.descriptionEditor}>
            <Input.TextArea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              autoSize={{ minRows: 4, maxRows: 10 }}
            />

            <div className={styles.actions}>
              <Button onClick={handleCancelDescription}>Отмена</Button>
              <Button type="primary" onClick={handleSaveDescription}>
                Сохранить
              </Button>
            </div>
          </div>
        ) : (
          <Typography.Paragraph>{task.desc || 'Описание отсутствует'}</Typography.Paragraph>
        )}
      </section>

      <section className={styles.section}>
        <Typography.Text strong>Дополнительная информация</Typography.Text>

        <div className={styles.metadata}>
          <div className={styles.metadataItem}>
            <Typography.Text type="secondary">Дата создания: </Typography.Text>
            <Typography.Text>{formatDate(task.date)}</Typography.Text>
          </div>

          <div className={styles.metadataItem}>
            <Typography.Text type="secondary">Последнее изменение: </Typography.Text>
            <Typography.Text>{formatDate(task.dateLastActivity)}</Typography.Text>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Typography.Title level={5}>История изменений</Typography.Title>

        <Collapse>
          <Collapse.Panel key="activity" header="Показать историю">
            <Timeline
              items={actions?.map((activity) => ({
                children: (
                  <div>
                    <Typography.Text strong>{activity.memberCreator.fullName}</Typography.Text>

                    <div>{`Статус изменен: ${activity.data.listBefore.name} -> ${activity.data.listAfter.name}`}</div>

                    <Typography.Text type="secondary">{formatDate(activity.date)}</Typography.Text>
                  </div>
                ),
              }))}
            />
          </Collapse.Panel>
        </Collapse>
      </section>

      <section className={styles.dangerZone}>
        <Popconfirm
          title="Удалить карточку?"
          description="Это действие нельзя отменить."
          onConfirm={() => deleteTask()}
          okText="Удалить"
          cancelText="Отмена"
        >
          <Button danger>Удалить</Button>
        </Popconfirm>
      </section>
    </div>
  );
};

export default TaskCard;
