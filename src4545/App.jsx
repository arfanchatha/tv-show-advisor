import { useEffect, useState } from "react";
import { TVShowAPI } from "./API/tv-show";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./TVShowDetail/TVShowDetail";
import { Logo } from "./Logo/Logo";
import logoImg from './assets/images/logo.png';
import { TVShowListItem } from "./TVShowListItem/TVShowListItem";
import { TVShowList } from "./TVShowList/TVShowList";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    console.log("current tv show has changed");
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  async function fetchPopulars() {
    const popularTVShowList = await TVShowAPI.fetchPopulars();
    if (popularTVShowList.length > 0) {
      setCurrentTVShow(popularTVShowList[3]);
    }
  }
  async function fetchRecommendations(tvShowId) {
    try{
    const recommendationListResp = await TVShowAPI.fetchRecommendations(
      tvShowId
    );
    if (recommendationListResp.length > 0) {
      setRecommendationList(recommendationListResp.slice(0, 10));
    }
  }catch(error){
    console.log(error)
  }
  }
  console.log(recommendationList)
  function updateCurrentTvShow(tvShow) {
    setCurrentTVShow(tvShow);
  }

  function updateCurrentTVShow(tvShow) {
    setCurrentTVShow(tvShow);
  }

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
             url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              title="Watowatch"
              subtitle="Find a show you may like"
              img={logoImg}
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <input style={{ width: "100%" }} type="text" />
          </div>
        </div>
      </div>
      <div className={s.tv_show_details}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {currentTVShow && (
          <TVShowList
            onClickItem={updateCurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}