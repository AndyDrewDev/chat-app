import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-regular-svg-icons";

const style = {
  emojiContainer: `flex h-8 w-8 cursor-pointer items-center justify-center text-gray-300 hover:text-white`,
};

const EmojiButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className={style.emojiContainer}
      onClick={onClick}
      aria-label="Додати смайлик"
    >
      <FontAwesomeIcon icon={faFaceLaugh} size="lg" />
    </button>
  );
};

export default EmojiButton;
