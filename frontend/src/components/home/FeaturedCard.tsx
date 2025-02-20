import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import React from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
};

interface Props {
  feature: Feature;
}

export const FeaturedCard: React.FC<Props> = ({ feature }) => {

  return (
    <Grid item xs={12} sm={6} md={3} >
      <Card
        elevation={0}
        sx={{
          textAlign: "center",
          height: "100%",
          backgroundColor: "transparent",
        }}
      >
        <CardContent>
          <Box sx={{ color: "primary.main", mb: 2, "& svg": { fontSize: 40 } }}>{feature.icon}</Box>
          <Typography variant="h6" gutterBottom>
            {feature.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {feature.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
