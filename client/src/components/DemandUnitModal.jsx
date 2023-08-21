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


export default function DemandUnitModal(props) {
  const handleClose = () => {
    props.setIsDemandUnitModalOpen(false);
  };

  return (
    <Modal
      open={props.isDemandUnitModalOpen}
      onClose={handleClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '80%', height: '80%', bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Demand Unit
        </Typography>
        <NoScrollbarDialogContent dividers>
        <Typography>

            <strong>Demand</strong> is a fundamental concept in economics that refers to the quantity of goods and services consumers are willing to purchase in the market. Imagine a shopper looking to buy clothes or a customer interested in buying laptops – the amount of clothes or laptops they are willing to buy at different prices is their demand.<br /><br />
       
            Several factors also influence demand, known as <strong> determinants of demand</strong>. The main determinants are:
            <br /><br />
            <strong>Income:</strong> The money individuals or households earn. When income increases, people usually have more purchasing power, leading to an increase in their demand for goods and services.<br /><br />

            <strong>Price of Related Goods:</strong> This includes both substitute and complementary goods. Substitute goods are those that can replace each other, like tea and coffee. If the price of one substitute increases, the demand for the other may rise. Complementary goods are consumed together, like smartphones and phone cases. If the price of one complementary good goes up, the demand for the other might decline.<br /><br />

            <strong>Tastes and Preferences:</strong> Consumer preferences and trends can significantly impact demand. If a product becomes trendy or more favored, its demand might rise, while a decline in popularity could lead to decreased demand.<br /><br />

            <strong>Population and Demographics: </strong> The size and composition of the population also affect demand. For instance, if there's a growing young population, the demand for toys and education services might increase.<br /><br />

            <strong>Consumer Expectations: </strong> Anticipated future changes in prices, income, or other factors can influence current demand. If people expect prices to rise in the future, they might increase their demand now.<br /><br />

            Now, let's discuss the demand curve. The demand curve represents the relationship between the price of a product and the quantity consumers are willing to buy. When the price of a good or service decreases, the quantity demanded usually increases, leading to a downward-sloping demand curve.            
            <br /><br />
            <img src={DemandCurve} />
            <br /><br />


            <strong>Shifts in the Demand Curve:</strong>
            <br />
            <strong>When the demand curve shifts to the right:</strong> <br />This happens when there's an increase in demand at every price level. For example, if a new health study shows that consuming a certain fruit reduces the risk of illness, the demand for that fruit might increase, shifting the demand curve to the right.<br /><br />
            <img src={demandRight} />
            <br /><br />
            <strong>When the demand curve shifts to the left:</strong> <br />Conversely, a leftward shift occurs when there's a decrease in demand at every price level. If a popular fashion trend fades, the demand for related clothing items could decrease, causing the demand curve to shift to the left.<br /><br />
            <img src={demandLeft} />
            <br /><br />
          </Typography>
          </NoScrollbarDialogContent>
      </Box>
    </Modal>
  );
};