import PropTypes from "prop-types";

import NumberText from "components/NumberText";
import Title from "components/Title";

import useTranslation from "hooks/useTranslation";

import s from "./Goal.module.scss";

function Goal({ training, isActiveTraining, className = "" }) {
  const { t } = useTranslation("Goal");
  const booksNumber = training?.books?.length ?? 0;
  const daysNumber =
    training?.end && training?.start
      ? (new Date(training?.end) - new Date(training?.start)) / 86400000
      : 0;
  const booksLeft = training?.books?.reduce(
    (acc, book) => (book.status !== "read" ? acc + 1 : acc),
    0
  );
  return (
    <div className={`${s.container} ${className}`}>
      <Title text={t.title} className={s.title} />
      <ul className={isActiveTraining ? s.activeNumbers : s.numbers}>
        <li>
          <NumberText
            number={booksNumber}
            text={t.books}
            isActiveTraining={isActiveTraining}
          />
        </li>
        <li>
          <NumberText
            number={daysNumber}
            text={t.days}
            isActiveTraining={isActiveTraining}
          />
        </li>
        {isActiveTraining && (
          <li>
            <NumberText
              number={booksLeft}
              text={t.left}
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
    start: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    end: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
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
