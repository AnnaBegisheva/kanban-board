import { Result } from 'antd';
import { Link } from 'react-router';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you are looking for does not exist."
        extra={
          <Link className={styles.button} to="/">
            Back to boards
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;
