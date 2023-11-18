import PropTypes from 'prop-types';
import { useRef, useState , useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import { useNavigate } from 'react-router-dom'; // Ajout de Navigate


// assets
import avatar1 from 'assets/images/users/avatar-1.png';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const navigate = useNavigate(); // Utilisation de useNavigate


  useEffect(() => {
    const userData = localStorage.getItem('userData');
  
    // Vérifier si les données utilisateur existent dans le localStorage
    if (userData && userLoggedIn) {
      setUserData(JSON.parse(userData));
      setUserLoggedIn(true);
    } else {
      const user_id = localStorage.getItem('user_id');
      if (user_id) {
        fetch(`http://127.0.0.1:5000/user/${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setUserData(data);
            localStorage.setItem('userData', JSON.stringify(data));
            setUserLoggedIn(true);
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            localStorage.clear(); 
            navigate("/login");
            setUserLoggedIn(false);
          });
      } else {
        setUserLoggedIn(false);
        localStorage.clear(); 
        navigate("/login");
      }
    }
  }, []);

  const handleLogout = async () => {
    if (userLoggedIn) {
      localStorage.clear(); 
      setUserLoggedIn(false);
      navigate("/login");
    }
  };

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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const iconBackColorOpen = 'grey.300';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1">
          {userData && (
            <>
              {userData.nom} {userData.prenom}
            </>
          )}
        </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
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
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />
                            <Stack>
                              <Typography variant="h6">
                              {userData && (
                                  <>
                                    {userData.nom} {userData.prenom}
                                  </>
                                )}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                              {userData && (
                                  <>
                                    {userData.email}
                                  </>
                                )}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <IconButton size="large" color="secondary" onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                            <Tab
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'capitalize'
                              }}
                              icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                              label="Profile"
                              {...a11yProps(0)}
                            />
                            <Tab
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'capitalize'
                              }}
                              icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                              label="Setting"
                              {...a11yProps(1)}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <ProfileTab handleLogout={handleLogout} />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                          <SettingTab />
                        </TabPanel>
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
