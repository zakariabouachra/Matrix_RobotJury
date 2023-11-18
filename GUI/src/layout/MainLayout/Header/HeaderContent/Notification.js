import { useRef, useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  useMediaQuery,
  Typography,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  ListItem
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined } from '@ant-design/icons';


// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [incompleteProfile, setIncompleteProfile] = useState(false);
    const [notifications, setNotifications] = useState([]); // État pour stocker les notifications

  

    useEffect(() => {
      const userData = localStorage.getItem('userData');
  
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const hasNullValues = Object.values(parsedUserData).some(value => value === null || value === '');
  
        if (hasNullValues) {
          setIncompleteProfile(true);
        } else {
          setIncompleteProfile(false);
        }
      }
  
      const Notifications = [
        ...(incompleteProfile
          ? [{ message: 'Please complete your profile' , link:'/view_profile' }]
          : [])
      ];
  
      setNotifications(Notifications); 
    }, [incompleteProfile]); 

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={notifications.length} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggle}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                   {notifications.map((notification, index) => (
                    <Link key={index} to={notification.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton  >
                      <ListItem >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1">
                              {notification.message}
                            </Typography>
                          }
                        />
                      </ListItem>
                     
                      <ListItemSecondaryAction>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    </Link>
                    ))}

                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
