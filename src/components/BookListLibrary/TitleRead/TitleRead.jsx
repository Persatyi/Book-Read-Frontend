import useTranslation from "hooks/useTranslation";
import s from "./TitleRead.module.scss";

export default function TitleRead() {
  const { t } = useTranslation("TitleRead");
  return (
    <ul className={s.titleList}>
      <li className={s.titleListItem}>{t.title}</li>
      <li className={s.titleListItem}>{t.author}</li>
      <li className={s.titleListItem}>{t.year}</li>
      <li className={s.titleListItem}>{t.pages}</li>
      <li className={s.titleListItem}>{t.rating}</li>
    </ul>
  );
}
