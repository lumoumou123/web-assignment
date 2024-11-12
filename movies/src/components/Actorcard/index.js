import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ActorCard({ actor }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 500 }}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : 'https://image.tmdb.org/t/p/w500/dNsFLihmWfA2KCENbZCtq9AjSob.jpg' // Placeholder image
        }
        title={actor.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {actor.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {actor.character}
        </Typography>
      </CardContent>
    </Card>
  );
}
