import { useEffect, useState } from "react";
import styles from "./styles.module.css";

import ProductList from "../../features/Product/components/ProductList";
import SearchBar from "../../components/SearchBar";
import Spinner from "../../components/Spinner";
import { Product } from "../../types";
import productApi from "../../api/productApi";
import useDebounce from "../../hooks/useDebounce";

const SKIP_NUM = 20;

const ProductPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);
  const [productList, setProductList] = useState<Product[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const debouncedKeyword = useDebounce(keyword, 500);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setSkip((prev) => prev + SKIP_NUM);
    }
  };

  const handleSearchChange = (value: string) => {
    setKeyword(value);
    setSkip(0);
    setHasNext(true);
    setProductList([]);
  };

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const { products, total }: any = await productApi.getProducts(skip);

      if (skip + SKIP_NUM >= total) {
        setHasNext(false);
      }

      setProductList((prev) => [...prev, ...products]);
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const searchProducts = async () => {
    setIsLoading(true);
    try {
      const { products }: any = await productApi.searchProducts(
        debouncedKeyword
      );
      setProductList(products);
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (debouncedKeyword) {
      searchProducts();
    } else if (hasNext) {
      getProducts();
    }
  }, [skip, debouncedKeyword]);

  useEffect(() => {
    if (debouncedKeyword === "") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [debouncedKeyword]);

  return (
    <div className={styles.container}>
      <SearchBar
        value={keyword}
        onChange={(value: string) => handleSearchChange(value)}
      />
      <ProductList data={productList} />
      {isLoading && <Spinner />}
      {isError && <p>Something error</p>}
    </div>
  );
};

export default ProductPage;
