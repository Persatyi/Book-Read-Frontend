import useTranslation from "hooks/useTranslation";
import React from "react";
import s from "./TitleReading.module.scss";

export default function TitleReading() {
  const { t } = useTranslation("TitleRead");
  return (
    <ul className={s.titleList}>
      <li className={s.titleListItem}>{t.title}</li>
      <li className={s.titleListItem}>{t.author}</li>
      <li className={s.titleListItem}>{t.year}</li>
      <li className={s.titleListItem}>{t.pages}</li>
    </ul>
  );
}
