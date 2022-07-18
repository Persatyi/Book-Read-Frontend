import NumberText from "components/NumberText";
import Title from "components/Title";

import s from "./Goal.module.scss";

function Goal({ training, isActiveTraining }) {
  const booksNumber = training?.books?.length ?? 0;
  const daysNumber = training?.end
    ? (new Date(training?.end) - new Date(training?.start)) / 86400000
    : 0;
  const booksLeft = training?.books?.reduce(
    (acc, book) => (book.status !== "read" ? acc + 1 : acc),
    0
  );
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
        {isActiveTraining && (
          <li>
            <NumberText number={booksLeft} text="Залишилось книжок" />
          </li>
        )}
      </ul>
    </div>
  );
}
export default Goal;
