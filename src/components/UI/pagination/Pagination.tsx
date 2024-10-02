/** COMPONENTS */
import Pagination from "@mui/material/Pagination";

/** LIBRARIES */
import { FC } from "react";

/** OTHER */
import useWindowSize from "../../../hooks/useWindowSize";

/** STYLES */
import styles from "./Pagination.module.css";

interface CustomPaginationProps {
  onPageChange: (_event: React.ChangeEvent<unknown>, value: number) => void;
  pages: number;
  currentPage: number;
}

const CustomPagination: FC<CustomPaginationProps> = ({ onPageChange, pages, currentPage }) => {
  const { isExtraSmall, isSmall, isMedium } = useWindowSize();

  const siblings = isExtraSmall || isSmall ? 0 : isMedium ? 1 : 2;

  return (
    <Pagination
      className={styles.container}
      count={pages}
      size="large"
      siblingCount={siblings}
      onChange={onPageChange}
      page={currentPage}
    />
  );
};

export default CustomPagination;
