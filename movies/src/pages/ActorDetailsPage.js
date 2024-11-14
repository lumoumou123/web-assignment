import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getActorByName } from "../api/tmdb-api";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const ActorDetails = () => {
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery(
    ["actorSearch", { id: id }], () => getActorByName(id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return <h1>Actor not found</h1>;
  }

  const actor = data.results[0];

  return (
    <Container>
      <Box sx={{ marginTop: "20px" }}>
        <Grid container spacing={4}>
          {/* 演员简介 */}
          <Grid item xs={12} md={4} lg={3}>
            <Card>
              <CardMedia
                sx={{ height: 500 }}
                image={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : "https://image.tmdb.org/t/p/w500/dNsFLihmWfA2KCENbZCtq9AjSob.jpg"
                }
                title={actor.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {actor.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Known for: {actor.known_for_department}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* 演员详情 */}
          <Grid item xs={12} md={8} lg={9}>
            <Typography variant="h4" component="div" sx={{ marginBottom: "20px" }}>
              Actor Biography
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {actor.biography || "Biography not available."}
            </Typography>
            <Typography variant="h4" component="div" sx={{ marginBottom: "20px", marginTop: "40px" }}>
              Known For
            </Typography>
            <Grid container spacing={2}>
              {actor.known_for.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <CardMedia
                      sx={{ height: 300 }}
                      image={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                          : "https://image.tmdb.org/t/p/w500/dNsFLihmWfA2KCENbZCtq9AjSob.jpg"
                      }
                      title={movie.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ActorDetails;
