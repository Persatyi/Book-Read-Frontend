import Timer from "components/Timer";
import dayjs from "dayjs";
import s from "./Countdowns.module.scss";

const Countdowns = ({ date }) => {
  const endOfYear = dayjs().endOf("year");
  return (
    <div className={s.container}>
      <Timer title="Years countdown" date={endOfYear} />
      <Timer title="Goals countdown" date={date} />
    </div>
  );
};

export default Countdowns;
