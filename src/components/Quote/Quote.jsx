import useTranslation from "hooks/useTranslation";
import s from "./Quote.module.scss";

const Quote = () => {
  const { t } = useTranslation("Quote");

  return (
    <div className={s.quoteWrapper}>
      <blockquote className={s.quote}>{t.text}</blockquote>
      <p className={s.author}>{t.author}</p>
    </div>
  );
};

export default Quote;
