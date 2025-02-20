import { Avatar, Box, Card, CardContent, Grid, Rating, Stack, Typography } from '@mui/material';
import { Verified } from '@mui/icons-material';
import React from 'react';

interface Experience {
  avatar: string;
  name: string;
  route: string;
  comment: string;
  rating: number;
}

interface Props {
  experience: Experience;
}

export const ExperienceCard: React.FC<Props> = ({ experience }) => {
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Avatar src={experience.avatar} sx={{ width: 56, height: 56 }} />
            <Box>
              <Typography variant="h6">{experience.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Ruta: {experience.route}
              </Typography>
            </Box>
            <Verified sx={{ ml: "auto", color: "primary.main" }} />
          </Stack>
          <Typography variant="body1" paragraph>
            {experience.comment}
          </Typography>
          <Rating value={experience.rating} readOnly />
        </CardContent>
      </Card>
    </Grid>
  );
};
