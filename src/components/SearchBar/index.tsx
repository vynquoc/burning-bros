import styles from "./styles.module.css";

type Props = {
  onChange: (keyword: string) => void;
  value: string;
};

const SearchBar = ({ onChange, value }: Props) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a keyword"
      />
    </div>
  );
};

export default SearchBar;
