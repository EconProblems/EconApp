import React from 'react';
import { Typography, Card, TableCell  } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default ThemeExample = () => {
  const theme = useTheme();

  var cardStyle = {
    display: 'flex',
    transitionDuration: '0.3s',
    padding: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    minWidth: 'fit-content',
  };

  return (
    <>
      <Box id='font-examples' sx={{ width: '100%', flexGrow: 1 }}>
        <Grid container spacing={1} sx={{ backgroundColor: 'white', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography variant='h1'>
              My Heading 1
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography variant='h2'>
              My Heading 2
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography variant='h3'>
              My Heading 3
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography variant='h4'>
              My Heading 4
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography variant='bodyText' component='p'>
              My Body Text 1
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography variant='bodyText2' component='p'>
              My Body Text 2
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box id='color-palette-examples' sx={{ flexGrow: 1, minWidth: 'fit-content' }}>
        <Grid container spacing={2} p={4} sx={{ backgroundColor: theme.palette.background.default, flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='bodyText' sx={{ width: '100%', textAlign: 'center' }}>theme.palette.background.default</Typography>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card sx={{ ...cardStyle, backgroundColor: theme.palette.primary.blue}}>
              <Typography variant='h4'>theme.palette.primary.blue</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card sx={{ ...cardStyle, backgroundColor: theme.palette.primary.mint}}>
              <Typography variant='h4'>theme.palette.primary.mint</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card sx={{ ...cardStyle, backgroundColor: theme.palette.primary.razzmatazz}}>
              <Typography variant='h4'>theme.palette.primary.razzmatazz</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card sx={{ ...cardStyle, backgroundColor: theme.palette.primary.saffron}}>
              <Typography variant='h4'>theme.palette.primary.saffron</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card sx={{ ...cardStyle, backgroundColor: theme.palette.primary.tomato}}>
              <Typography variant='h4'>theme.palette.primary.tomato</Typography>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} p={4} sx={{ backgroundColor: theme.palette.background.secondary, flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='bodyText' sx={{ width: '100%', textAlign: 'center' }}>theme.palette.background.secondary</Typography>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card sx={{ ...cardStyle, backgroundColor: theme.palette.secondary.black}}>
              <Typography variant='h4'>theme.palette.secondary.black</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};