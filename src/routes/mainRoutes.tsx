import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const routes = [
    {
      displayName: 'Dashboard',
      path: '/',
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
    {
      displayName: 'Manage Resources',
      path: '/resources',
      icon: <AssignmentIndIcon/>,
    },

    
  ];