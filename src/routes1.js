import Icon from "@mui/material/Icon";
import Home from "./pages/Home";
import HomeIcon from '@mui/icons-material/Home';
import Menu from "./pages/Menu";


const routes = [
  {
    type: "collapse",
    name: "Shopping",
    key: "shopping",
    route: "/shopping",
    icon: <HomeIcon />,
    component: <Menu />,
    noCollapse: true,
  }
];

export default routes;
