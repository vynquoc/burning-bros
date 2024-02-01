import { Product } from "../../../../types";
import styles from "./styles.module.css";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className={styles.container}>
      <img
        src={product.images[0]}
        alt={product.title}
        className={styles.productImg}
      />
      <p>{product.title}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductCard;
