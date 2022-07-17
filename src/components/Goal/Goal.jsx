import NumberText from "components/NumberText";
import Title from "components/Title";

import s from "./Goal.module.scss";

function Goal({ training }) {
  const booksNumber = training?.books?.length ?? 0;
  const daysNumber = training?.end ? training?.end - training?.start : 0;
  return (
    <div className={s.container}>
      <Title text="Моя мета прочитати" />
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
