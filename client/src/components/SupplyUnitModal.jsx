import React from "react";
import { useTheme, styled } from '@mui/material/styles';
import { Modal, Box, Typography, TextField, Button, DialogContent } from "@mui/material";
import SupplyPic from "../../dist/images/SupplyPic.png";
import SupplyRight from "../../dist/images/SupplyRight.png";
import SupplyLeft from "../../dist/images/SupplyLeft.png";



const NoScrollbarDialogContent = styled(DialogContent)({
  maxHeight: '100%',
  overflowY: 'auto',
  // Hide scrollbar for Chrome, Safari, and Opera
  scrollbarWidth: 'none',
  // Hide scrollbar for IE, Edge, and Firefox
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    width: '0px',
    background: 'transparent', // Optional: If you want to hide the scrollbar track.
  },
  '& img': {
    width: '40%', // Set the width to 50% of its original size
    height: 'auto', // Maintain the aspect ratio
  },
});


export default function SupplyUnitModal(props) {
  const handleClose = () => {
    props.setIsSupplyUnitModalOpen(false);
  };

  return (
    <Modal
      open={props.isSupplyUnitModalOpen}
      onClose={handleClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '80%', height: '80%', bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Supply Unit
        </Typography>
        <NoScrollbarDialogContent dividers>
        <Typography>

            Supply is a fundamental concept in economics that refers to the quantity of goods and services producers are willing to offer for sale in the market. Imagine a farmer who grows apples or a company that manufactures smartphones – the amount of apples or smartphones they are willing to sell at different prices is their supply. <br /><br />

            Several factors influence supply, and these are known as determinants of supply. The main determinants are:<br /><br />

            <strong>Land:</strong> This includes all natural resources used in production, such as fertile soil, minerals, and water. For example, a farmer with more fertile land can produce a larger supply of crops.<br /><br />

            <strong>Labor:</strong> The human effort and skills put into producing goods and services. If a business has a well-trained and motivated workforce, they can increase their supply.<br /><br />

            <strong>Entrepreneurship:</strong> This involves the creativity and risk-taking abilities of individuals who start and manage businesses. Entrepreneurs can impact supply through their innovative ideas and business decisions.<br /><br />

            <strong>Capital:</strong> Refers to the tools, machinery, and equipment used in the production process. When a company has advanced technology and modern equipment, they can produce more efficiently, leading to a higher supply.<br /><br />

            Now, let's talk about the supply curve. The supply curve is a graphical representation of the relationship between the price of a product and the quantity producers are willing to supply. When the price of a good or service increases, the quantity supplied also tends to rise, resulting in an upward-sloping supply curve.<br /><br />
            <img src={SupplyPic} />
            <br /><br />


            <strong>When the supply curve shifts to the right:</strong> <br />This happens when there is an increase in supply at every price level. For instance, if there is a bumper harvest of apples, the supply of apples will increase, and the supply curve will shift to the right.<br /><br />
            <img src={SupplyRight} />
            <br /><br />
            <strong>When the supply curve shifts to the left:</strong> <br />On the other hand, this occurs when there is a decrease in supply at every price level. For example, if a natural disaster damages smartphone factories, the supply of smartphones will decrease, causing the supply curve to shift to the left.<br /><br />

            <img src={SupplyLeft} />
            <br /><br />
          </Typography>
          </NoScrollbarDialogContent>
      </Box>
    </Modal>
  );
};