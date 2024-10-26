import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../constants/index";
import styled from "styled-components";
import { strings } from "../constants/strings";
import BeatLoader from "react-spinners/BeatLoader";

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const [loader, setLoader] = useState(false);
  const { selectedMovie } = props;
  console.log(selectedMovie)

  useEffect(() => {
    setLoader(true);
    console.log('under useEffect...before api call')
    axios
      .get(
        `http://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY.substring(
          0,
          8
        )}`
      )
      .then((response) => {
          console.log('under useEffect...after api call')
        setMovieInfo(response.data);
        setLoader(false);
      });
  }, [selectedMovie]);
  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type}: {movieInfo?.Title}
            </MovieName>
            <MovieInfo>
              {strings.IMDB_RATING} <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              {strings.YEAR} <span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              {strings.LANGUAGE} <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              {strings.RELEASED} <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              {strings.GENRE} <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              {strings.DIRECTOR} <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              {strings.ACTORS} <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              {strings.PLOT} <span>{movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}><img width={20} height={20} src="https://cdn.icon-icons.com/icons2/1674/PNG/512/close_111152.png" /></Close>
        </>
      ) : (
        <BeatLoader color={"#000"} loading={loader} size={10} />
      )}
    </Container>
  );
};
export default MovieInfoComponent;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 352px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;

const Close = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  // border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Fallback Poster: "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"
