import React, { useState, useEffect } from "react";
import { useTheme, styled } from '@mui/material/styles';
import { Modal, Box, Typography, TextField, Button } from "@mui/material";


export default function AboutModal(props) {

  const handleClose = () => {
    props.setIsAboutModalOpen(false);
  };

  return (
    <Modal
      open={props.isAboutModalOpen}
      onClose={handleClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '70%', height: '70%', bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
        <Typography variant="h3" gutterBottom>
          About EconProblems
        </Typography>
        <Box mt={2}>
          <Typography>
            Welcome to EconSolutions! The goal of this project is to give you an interactive experience where you can practice your Economics skills. Eventually we hope to have a wide variety of interactive apps for you to play and learn with that involve a multitude of econ topics. Please continue to check back with us as we grow.  <br />Send any feedback to economicsproblems@gmail.com.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};