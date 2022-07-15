import s from "./Quote";
const Quote = () => {
  return (
    <div>
      <blockquote className={s.quote}>
        Books are the ships of thoughts, wandering through the waves of time.
      </blockquote>
      <p className={s.author}>Francis Bacon</p>
    </div>
  );
};

export default Quote;
