import s from "./Timer.module.scss";
import Countdown, { zeroPad } from "react-countdown";

const Timer = ({ date, title }) => {
  const renderer = ({ days, hours, minutes, seconds }) => (
    <div className={s.timer}>
      <div className={s.block}>
        <span>{zeroPad(days)}</span>
        <span className={s.measurement}>days</span>
      </div>
      <span className={s.split}>:</span>
      <div className={s.block}>
        <span>{zeroPad(hours)}</span>
        <span className={s.measurement}>hrs</span>
      </div>
      <span className={s.split}>:</span>
      <div className={s.block}>
        <span>{zeroPad(minutes)}</span>
        <span className={s.measurement}>mins</span>
      </div>
      <span className={s.split}>:</span>
      <div className={s.block}>
        <span>{zeroPad(seconds)}</span>
        <span className={s.measurement}>sec</span>
      </div>
    </div>
  );

  return (
    <div className={s.container}>
      <h3 className={s.title}>{title}</h3>
      <Countdown date={date} renderer={renderer} />
    </div>
  );
};

export default Timer;
