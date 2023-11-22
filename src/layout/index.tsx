import * as React from "react";
import {CSSObject, styled, Theme, useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import {Link, useNavigate} from "react-router-dom";
import {routes} from "../routes/mainRoutes";
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";

const drawerWidth = 300;
function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawer = () => {
        setOpen(!open);
    };

    const navigate = useNavigate();

    return (
        <Box sx={{display: "flex",}}>
            <Drawer variant="permanent" open={open}

            >
                <div className="flex justify-center items-center h-24">
                    <div
                        className={`bg-sky-50 py-2 px-3  flex items-center justify-center  rounded-xl  mr-4 duration-500 ${!open && "hidden"}`}>
                        <div>
                            <>
                                <div className="relative   items-center ">

                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0">


                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ">
                                            <div>
                                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute " />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img
                                                        className="h-12 w-12 rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button

                                                                className={classNames(active ? 'bg-gray-100' : '', 'w-full block text-left px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Your Profile
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button

                                                                className={classNames(active ? 'bg-gray-100' : '', 'w-full block text-left px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Settings
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button

                                                                className={classNames(active ? 'bg-gray-100' : '', 'w-full block text-left px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Sign out
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>



                            </>
                        </div>
                        <div className="ml-3 ">
                            <p className="font-medium text-sky-500">Username</p>
                            <p className="text-sm">user@gmail.ccom</p>
                        </div>

                    </div>
                    <ArrowBackIosRoundedIcon onClick={handleDrawer}
                                             className={`p-1 bg-gray-200 rounded-full duration-500 ${!open && "rotate-180"}`}/>
                </div>


                <Divider/>
                <List
                    className=" h-full"

                >

                    <ListItem disablePadding sx={{display: "block", marginTop: 3}}>


                        {routes.map((route, index) => (
                            <Link to={route.path} key={index} style={{textDecoration: 'none',}}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,

                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {route.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={route.displayName} sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </Link>
                        ))}


                    </ListItem>

<div className={"absolute bottom-0 py-2 bg-gray-200 w-full text-center"}>version : 1.0.0</div>
                </List>
            </Drawer>
            <Box component="main"></Box>
        </Box>
    );
}
