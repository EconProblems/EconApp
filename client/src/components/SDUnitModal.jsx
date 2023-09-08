import React from "react";
import { useTheme, styled } from '@mui/material/styles';
import { Modal, Box, Typography, TextField, Button, DialogContent } from "@mui/material";
import DemandCurve from "../../dist/images/demandCurve.png";
import demandRight from "../../dist/images/demandRight.png";
import demandLeft from "../../dist/images/SupplyLeft.png";



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


export default function SDUnitModal(props) {
  const handleClose = () => {
    props.setIsSDUnitModalOpen(false);
  };

  return (
    <Modal
      open={props.isSDUnitModalOpen}
      onClose={handleClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '80%', height: '80%', bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Supply and Demand Unit
        </Typography>
        <NoScrollbarDialogContent dividers>
        <Typography>

            <strong>Understanding the Laws of Supply and Demand</strong> 
            <br />
            Supply and demand are the foundational principles that drive economic activity in markets. They are fundamental to understanding how prices are determined and how markets function efficiently. Let's delve into these concepts.<br /><br />
       
            <strong>The Law of Demand:</strong>
            <br />
            The Law of Demand states that, all else being equal, as the price of a good or service decreases, the quantity demanded increases, and as the price increases, the quantity demanded decreases. In other words, there is an inverse relationship between price and quantity demanded.            <br /><br />
            <strong>Key Takeaways:</strong>
            <br />
            <li>When a product becomes cheaper, consumers tend to buy more of it.</li>
            <li>When a product becomes more expensive, consumers tend to buy less of it.</li>
            <br />
            <strong>The Law of Supply:</strong> 
            <br />
            The Law of Supply, on the other hand, states that, all else being equal, as the price of a good or service increases, the quantity supplied increases, and as the price decreases, the quantity supplied decreases. In simple terms, there is a direct relationship between price and quantity supplied.
            <br /><br />
            <strong>Key Takeaways:</strong>
            <br />
            <li>When the price of a product rises, producers are incentivized to supply more of it.</li>
            <li>When the price of a product falls, producers may reduce the quantity they are willing to supply.</li>
            <br />

            <strong>The Equilibrium Price:</strong>
            <br />
            In the marketplace, supply and demand interact to determine the equilibrium price and quantity. This is the point where the quantity demanded equals the quantity supplied. At the equilibrium price, there is neither a shortage nor a surplus of the product. Prices tend to naturally gravitate towards this point in competitive markets.

            <br /><br />
          </Typography>
          </NoScrollbarDialogContent>
      </Box>
    </Modal>
  );
};