import Countdown, { zeroPad } from "react-countdown";

import useTranslation from "hooks/useTranslation";
import s from "./Timer.module.scss";

const Timer = ({ date, title }) => {
  const { t } = useTranslation("Timer");

  const renderer = ({ days, hours, minutes, seconds }) => (
    <div className={s.timer}>
      <div className={s.block}>
        <span>{zeroPad(days)}</span>
        <span className={s.measurement}>{t.days}</span>
      </div>
      <span className={s.split}>:</span>
      <div className={s.block}>
        <span>{zeroPad(hours)}</span>
        <span className={s.measurement}>{t.hours}</span>
      </div>
      <span className={s.split}>:</span>
      <div className={s.block}>
        <span>{zeroPad(minutes)}</span>
        <span className={s.measurement}>{t.minutes}</span>
      </div>
      <span className={s.split}>:</span>
      <div className={s.block}>
        <span>{zeroPad(seconds)}</span>
        <span className={s.measurement}>{t.seconds}</span>
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
