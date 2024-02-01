import styles from "./styles.module.css";

import ProductCard from "../ProductCard";
import { Product } from "../../../../types";

type Props = {
  data: Product[];
};

const ProductList = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      {data.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductList;
