import { SMALL_IMG_COVER_URL } from "../config" 
import s from "./style.module.css"
const maxTitle = 20;

export function TVShowListItem({ tvShow, onClick }) {
  const onClick_ = () => {
    onClick(tvShow);
  };
  return (
    <div onClick={onClick_} className={s.container}>
      <img
        alt={tvShow.name}
        src={SMALL_IMG_COVER_URL + tvShow.backdrop_path}
        className={s.img}
      />
      <div className={s.title}>
        {tvShow.name.length > maxTitle
          ? tvShow.name.slice(0, maxTitle) + "..."
          : tvShow.name}
      </div>
    </div>
  );
}