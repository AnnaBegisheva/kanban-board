import { getActionsByTaskId } from '@services/api';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@utils/formatDate';
import { Collapse, Timeline, Typography } from 'antd';
import { memo, useMemo } from 'react';

type TaskHistoryProps = {
  taskId: string;
};

const TaskCardHistory: React.FC<TaskHistoryProps> = memo(({ taskId }) => {
  const { data: actions } = useQuery({
    queryKey: ['actions', taskId],
    queryFn: () => getActionsByTaskId(taskId),
  });

  const timelineItems = useMemo(
    () =>
      actions?.map((activity) => ({
        children: (
          <div>
            <Typography.Text strong>{activity.memberCreator.fullName}</Typography.Text>

            <div>
              Статус изменен: {activity.data.listBefore.name}
              {' → '}
              {activity.data.listAfter.name}
            </div>

            <Typography.Text type="secondary">{formatDate(activity.date)}</Typography.Text>
          </div>
        ),
      })) ?? [],
    [actions],
  );

  return (
    <section>
      <Typography.Text strong>История изменений: </Typography.Text>

      {actions?.length ? (
        <Collapse>
          <Collapse.Panel key="activity" header="Показать историю">
            <Timeline items={timelineItems} />
          </Collapse.Panel>
        </Collapse>
      ) : (
        <div>Нет изменений </div>
      )}
    </section>
  );
});
export default TaskCardHistory;
