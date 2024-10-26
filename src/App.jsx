import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import { API_KEY } from "./constants";
import { strings } from "./constants/strings";
import BeatLoader from "react-spinners/BeatLoader";

const App = () => {
  const [searchQyery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [loader, setLoader] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchData = async (searchString) => {
    setLoader(true);
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY.substring(
        0,
        8
      )}`
    );
    updateMovieList(response.data.Search);
    if (movieList.length == 0) setNotFound(true);
    setLoader(false);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 1500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          {/* <MovieImage src="src\assets\Movie Icon.png" /> */}
          <MovieImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKO-lLGWPCfQEv1iVLp3OyTwqsAnsyBSF5eg&s" />
          {strings["APP_TITLE"]}
        </AppName>
        <SearchBox>
          {/* <SearchIcon src="src\assets\Search Icon.png" /> */}
          <SearchIcon src="https://w7.pngwing.com/pngs/608/913/png-transparent-computer-icons-google-search-symbol-mobile-search-search-for-miscellaneous-logo-mobile-phones-thumbnail.png" />
          <SearchInput
            placeholder={strings["SEARCH_INPUT_PLACEHOLDER"]}
            value={searchQyery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <MovieListContainer>
        {loader ? (
          <Loader>
            <BeatLoader color={"#000"} loading={true} size={10} />
          </Loader>
        ) : movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : loader ? (
          <Loader>
            <BeatLoader color={"#000"} loading={loader} size={10} />
          </Loader>
        ) : notFound ? (
          // <Placeholder src="src\assets\Not Found.png" />
          <Placeholder src="https://static.thenounproject.com/png/4147389-200.png" />
        ) : (
          // <Placeholder src="src\assets\Movie Icon.png" />
          <Placeholder src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKO-lLGWPCfQEv1iVLp3OyTwqsAnsyBSF5eg&s" />
        )}
      </MovieListContainer>
    </Container>
  );
};
export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  border-radius: 10px;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 10px;
  width: 1000px;
  background-color: white;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  padding: 5px;
  width: 100%;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
  // border: 1px solid red;
  height: 100vh;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  // opacity: 50%;
`;

const Loader = styled.div`
  // border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
`;
