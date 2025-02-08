import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-regular-svg-icons";

const style = {
  emojiContainer:
    "color-white flex h-14 w-20 cursor-pointer items-center justify-center bg-gray-800 text-white hover:bg-gray-800",
};
const EmojiButton = ({ onClick }) => {
  return (
    <div className={style.emojiContainer} onClick={onClick}>
      <FontAwesomeIcon icon={faFaceLaugh} size="lg" />
    </div>
  );
};

export default EmojiButton;
