import styles from './wrapper.module.css';

type WrapperProps = {
  title: string;
  children: React.ReactElement;
};

export const Wrapper = ({ title, children }: WrapperProps) => (
  <div className={styles.center}>
    <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
    {children}
  </div>
);
