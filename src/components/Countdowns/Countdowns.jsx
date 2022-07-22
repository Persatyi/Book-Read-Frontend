import dayjs from "dayjs";
import Timer from "components/Timer";
import useTranslation from "hooks/useTranslation";
import s from "./Countdowns.module.scss";

const Countdowns = ({ date }) => {
  const { t } = useTranslation("Countdowns");
  const endOfYear = dayjs().endOf("year").format();
  return (
    <div className={s.container}>
      <Timer title={t.years} date={endOfYear} />
      <Timer title={t.goals} date={date} />
    </div>
  );
};

export default Countdowns;
