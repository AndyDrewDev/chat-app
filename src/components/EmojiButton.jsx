import { Emoji } from 'emoji-picker-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceLaugh } from '@fortawesome/free-regular-svg-icons'

const style = {
  emojiContainer:
    'w-20 h-14 flex items-center justify-center bg-gray-900 text-white cursor-pointer color-white hover:bg-gray-800',
}
const EmojiButton = ({ onClick }) => {
  return (
    <div className={style.emojiContainer} onClick={onClick}>
      <FontAwesomeIcon icon={faFaceLaugh} size='lg' />
    </div>
  )
}

export default EmojiButton
