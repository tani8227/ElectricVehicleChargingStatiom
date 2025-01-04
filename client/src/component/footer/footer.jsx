import React from 'react';
import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Grid container spacing={4}>
        {/* Logo and About Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            EV Energy
          </Typography>
          <Typography variant="body2">
            Your trusted partner for efficient and eco-friendly electric vehicle recharging solutions.
          </Typography>
        </Grid>

        {/* Quick Links Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <FooterLink href="/about">About Us</FooterLink>
            </li>
            <li>
              <FooterLink >Our Services</FooterLink>
            </li>
            <li>
              <FooterLink href="/contact-us">Contact</FooterLink>
            </li>
            <li>
              <FooterLink >FAQs</FooterLink>
            </li>
          </ul>
        </Grid>

        {/* Social Media Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton color="inherit" href="https://facebook.com" target="_blank" rel="noopener">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" href="https://twitter.com" target="_blank" rel="noopener">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" href="https://instagram.com" target="_blank" rel="noopener">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" href="https://linkedin.com" target="_blank" rel="noopener">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright Section */}
      <Box textAlign="center" mt={4}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} EV Energy. All Rights Reserved.
        </Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
