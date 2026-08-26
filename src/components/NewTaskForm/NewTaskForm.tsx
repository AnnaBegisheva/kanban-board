import { Button, Form, Input, Select } from 'antd';
import type { TaskValues } from '../../assets/data';

type NewTaskFormProps = {
  onSuccess: (values: TaskValues) => void;
};

const NewTaskForm = ({ onSuccess }: NewTaskFormProps) => {
  const [form] = Form.useForm<TaskValues>();

  const handleFinish = (values: TaskValues) => {
    // Handle form submission logic here
    onSuccess(values);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="title" label="Task Title" rules={[{ required: true, message: 'Please enter task title' }]}>
        <Input placeholder="Enter task title" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Task Description"
        rules={[{ required: true, message: 'Please enter task description' }]}
      >
        <Input placeholder="Enter task description" />
      </Form.Item>
      <Form.Item
        name="assignee"
        label="Task Assignee"
        rules={[{ required: true, message: 'Please enter task assignee' }]}
      >
        <Input placeholder="Enter task assignee" />
      </Form.Item>
      <Form.Item
        name="category"
        label="Task Category"
        rules={[
          {
            required: true,
            message: 'Please select task category',
          },
        ]}
      >
        <Select
          placeholder="Select task category"
          options={[
            {
              value: 'billing',
              label: 'Billing',
            },
            {
              value: 'accounts',
              label: 'Accounts',
            },
            {
              value: 'forms',
              label: 'Forms',
            },
            {
              value: 'other',
              label: 'Other',
            },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewTaskForm;
