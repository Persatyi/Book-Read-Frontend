import NumberText from "components/NumberText";
import s from "./Goal.module.scss";

function Goal({ training }) {
  const booksNumber = training?.books?.length ?? 0;
  const daysNumber = training?.end ? training?.end - training?.start : 0;
  return (
    <div className={s.container}>
      <p className={s.title}>Моя мета прочитати</p>
      <ul className={s.numbers}>
        <li>
          <NumberText number={booksNumber} text="Кількість книжок" />
        </li>
        <li>
          <NumberText number={daysNumber} text="Кількість днів" />
        </li>
      </ul>
    </div>
  );
}
export default Goal;
