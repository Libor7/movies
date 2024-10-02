/** COMPONENTS */
import Box from "@mui/material/Box";

/** LIBRARIES */
import { FC, PropsWithChildren } from "react";

interface TabPanelProps {
  index: number;
  value: number;
}

const TabPanel: FC<PropsWithChildren<TabPanelProps>> = ({
  children,
  value,
  index,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 2, color: "#fff" }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
