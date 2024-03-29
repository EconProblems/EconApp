import * as React from 'react';
import { useSpring, animated } from 'react-spring';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import supplyAward from "../../dist/SupplyAward.png";
import demandAward from "../../dist/images/demandLogo.png";
import Tooltip from '@mui/material/Tooltip';
import sdLogo from "../../dist/images/sdLogo.png";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

const drawerWidth = 210;

export default function PermanentDrawerLeft(props) {
  const [selectedLink, setSelectedLink] = React.useState(null);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = React.useState(false);
  const [streakValue, setStreakValue] = React.useState(props.userProfileData.streak);


  React.useEffect(() => {
    if (props.isStreakActive) {
      let curVal = Math.max(streakValue, 1);
      setStreakValue(curVal);
    }
  }, [props.isStreakActive]);

  const openDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(true);
  };

  const closeDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(false);
  };

  const handleLinkClick = (link) => {
    setSelectedLink(selectedLink === link ? null : link);
  };

  const handleCloseClick = () => {
    setSelectedLink(null);
  };

  const handleDeleteButton = () => {
    openDeleteAccountModal();
  };

  

  const hasReceivedFriendRequest = () => {
    if (!props.userProfileData || !props.userProfileData.friends) return false;

    for (const friend of props.userProfileData.friends) {
      if (friend.receivedRequest) return true;
    }

    return false;
  };


  const handleDeleteAccount = () => {
    // Make a DELETE request to the server to delete the account associated with the userId.
    fetch(`/user/${props.userProfileData.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('User account deleted successfully');
          props.handleLogout()
        } else {
          // Handle deletion failure
          console.error('Failed to delete user account');
        }
      })
      .catch((error) => {
        console.error('Error during account deletion:', error);
        // Handle any other errors that might occur during the account deletion process.
      });
  };
  

  const handleCloseSwipeable = () => {
    props.setIsDrawerOpen(false)
  };

  const renderInnerDrawer = () => {
    let SupplyAwardsImage = null;
    let DemandAwardsImage = null;
    let SupplyDemandAwardsImage = null;

    if (selectedLink === 'Awards' && props.userProfileData.skills?.demand1) {
      SupplyAwardsImage = (
        <Tooltip title="You've mastered the basics of Supply!">
        <img
          src={supplyAward}
          alt="Supply Award"
          style={{ width: '70px', height: '70px', borderRadius: '8px' }}
        />
      </Tooltip>
      )
    } 
    if (selectedLink === 'Awards' && props.userProfileData.skills?.demand1) {
      DemandAwardsImage = (
        <Tooltip title="You've mastered the basics of Demand!">
        <img
          src={demandAward}
          alt="Demand Award"
          style={{ width: '70px', height: '70px', borderRadius: '8px' }}
        />
      </Tooltip>
      )
    } if (selectedLink === 'Awards' && props.userProfileData.skills?.pControls1) {
      SupplyDemandAwardsImage = (
        <Tooltip title="You've mastered the basics of Supply AND Demand!">
        <img
          src={sdLogo}
          alt="Supply and Demand Award"
          style={{ width: '70px', height: '70px', borderRadius: '8px' }}
        />
      </Tooltip>
      )
    }
    if (SupplyAwardsImage === null) {
      SupplyAwardsImage = <span style={{ color: "red" }}>No Awards Yet</span>;
    }

    let innerDrawerContent;
    switch (selectedLink) {
      case 'Profile':
        innerDrawerContent = <div>
          <br />
          <ListItem disablePadding>
            <ListItemButton onClick={props.handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleDeleteButton}>
              <ListItemText primary="Delete Account" />
            </ListItemButton>
          </ListItem>
        </div>
        break;
      case 'Awards':
        innerDrawerContent = (
        <div>
          <br />
          <Typography variant="h3" >{<span>&nbsp; &nbsp;</span>}Awards</Typography>
          <br />
          {<span>&nbsp; &nbsp;</span>}{SupplyAwardsImage}{DemandAwardsImage}
        </div>
      );
        break;
      case 'Skills':
        innerDrawerContent = <div>Skills Drawer Content</div>;
        break;
      case 'Streak':
        innerDrawerContent = <div>Streak Drawer Content</div>;
        break;
      case 'Friends':
        innerDrawerContent = <div>Friends Drawer Content</div>;
        break;
      case 'Units':
        innerDrawerContent = <div><br /><Typography variant="h3" >{<span>&nbsp; &nbsp;</span>}Units</Typography>
        <ListItem disablePadding onClick={props.handleSupplyUnitSubmit}>
        <span>&nbsp; &nbsp;</span><ListItemText primary="Supply Unit" />
        </ListItem>
        </div>

        break;
      default:
        innerDrawerContent = null;
    }

    const slideIn = useSpring({
      to: { marginLeft: selectedLink ? 0 : -drawerWidth },
    });

    const innerDrawerStyle = {
      width: drawerWidth,
    };

    const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    };

    return (
      <animated.div style={slideIn}>
        <Drawer
          anchor="left"
          open={Boolean(selectedLink)}
          onClose={() => handleLinkClick(selectedLink)}
          ModalProps={{
            BackdropProps: {
              invisible: true,
            },
          }}
        >
          <div style={innerDrawerStyle}>
            {innerDrawerContent}
            {selectedLink && (
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleCloseClick}>
                    <ListItemText primary="Close" />
                  </ListItemButton>
                </ListItem>
              </List>
            )}

            {/* Modal Confirmation Dialog */}
            <Modal
              open={isDeleteAccountModalOpen}
              onClose={closeDeleteAccountModal}
              aria-labelledby="delete-account-modal-title"
              aria-describedby="delete-account-modal-description"
            >
              <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" component="h2" id="delete-account-modal-title">
                  Confirm Account Deletion
                </Typography>
                <Typography sx={{ mt: 2 }} id="delete-account-modal-description">
                  Are you sure you want to delete your account? This action cannot be undone.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button onClick={closeDeleteAccountModal} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteAccount} color="error" variant="contained" sx={{ ml: 2 }}>
                    Confirm Delete Account
                  </Button>
                </Box>
              </Box>
            </Modal>
          </div>
        </Drawer>
      </animated.div>
    );
  };

  return (
    <div>
      <CssBaseline />
      {!props.matches ? ( <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img src="/images/Econ3.png"
          alt="SupplyAward"
          style={{ transform: 'scale(1.5)' }}
          title="You've mastered the basics of Supply!"
        />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLinkClick('Profile')}>
              <img
                src={props.profilePic}
                alt="Profile"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <Typography variant="body1"> &nbsp; &nbsp;Current Streak: {streakValue} days</Typography>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLinkClick('Awards')}>
              <ListItemText primary="Awards" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton onClick={props.openFriendsModal}>
              <Badge
                color="error"
                badgeContent={hasReceivedFriendRequest() ? 1 : 0}
                showZero={false}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <ListItemText primary="Friends" />
              </Badge>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLinkClick('Units')}>
              <ListItemText primary="Units" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={props.openAboutModal}>
              <ListItemText primary="About EconProblems" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      ) : (
        <SwipeableDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            position: 'fixed', // Fixed position
            top: "0", // Stick to the top
            zIndex: "999", // Ensure it's on top of other content
          },
        }}
          anchor="left"
          open={props.isDrawerOpen}
          onClose={handleCloseSwipeable}
        >
        <img src="/images/Econ3.png"
          alt="SupplyAward"
          style={{ transform: 'scale(1.5)' }}
          title="You've mastered the basics of Supply!"
        />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLinkClick('Profile')}>
              <img
                src={props.profilePic}
                alt="Profile"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <Typography variant="body1"> &nbsp; &nbsp;Current Streak: {streakValue} days</Typography>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLinkClick('Awards')}>
              <ListItemText primary="Awards" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton onClick={props.openFriendsModal}>
              <Badge
                color="error"
                badgeContent={hasReceivedFriendRequest() ? 1 : 0}
                showZero={false}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <ListItemText primary="Friends" />
              </Badge>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLinkClick('Units')}>
              <ListItemText primary="Units" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={props.openAboutModal}>
              <ListItemText primary="About EconProblems" />
            </ListItemButton>
          </ListItem>
        </List>
      </SwipeableDrawer>


      )}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
      </Box>
      {renderInnerDrawer()}
    </div>
  );
}
