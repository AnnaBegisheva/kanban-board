import { Button, Form, Input } from 'antd';

interface NewBoardFormProps {
  onSuccess: (title: string) => void;
}

const NewBoardForm = ({ onSuccess }: NewBoardFormProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { title: string }) => {
    // Handle form submission logic here
    console.log('Form submitted with values:', values);
    onSuccess(values.title);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="title" label="Board Title" rules={[{ required: true, message: 'Please enter a board title' }]}>
        <Input placeholder="Enter board title" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Board
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewBoardForm;
