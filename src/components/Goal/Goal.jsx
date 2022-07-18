import PropTypes from "prop-types";

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
      <ul className={isActiveTraining ? s.activeNumbers : s.numbers}>
        <li>
          <NumberText
            number={booksNumber}
            text="Кількість книжок"
            isActiveTraining={isActiveTraining}
          />
        </li>
        <li>
          <NumberText
            number={daysNumber}
            text="Кількість днів"
            isActiveTraining={isActiveTraining}
          />
        </li>
        {isActiveTraining && (
          <li>
            <NumberText
              number={booksLeft}
              text="Залишилось книжок"
              isActiveTraining={isActiveTraining}
              numberClassName={s.accent}
            />
          </li>
        )}
      </ul>
    </div>
  );
}
Goal.propTypes = {
  training: PropTypes.shape({
    start: PropTypes.object,
    end: PropTypes.object,
    books: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        pages: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        resume: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Goal;
