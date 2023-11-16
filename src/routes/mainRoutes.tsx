import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';

export const routes = [
    {
      displayName: 'Dashboard',
      path: '/dashboard',
      icon: <WidgetsRoundedIcon/>,
    },
    {
      displayName: 'Projects',
      path: '/projects',
      icon: <CreateNewFolderOutlinedIcon/>,
    },
    {
      displayName: 'Manage People',
      path: '/employees',
      icon: <PeopleOutlineRoundedIcon/>,
    },
    
  ];