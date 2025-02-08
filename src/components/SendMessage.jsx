import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import EmojiButton from "./EmojiButton";
import { sendMessageToDb } from "../utils/sendMessageToDb";

const style = {
  form: `w-full max-w-[728px] bg-gray-800 p-3 text-xl`,
  textarea: `mb-2 field-sizing-content max-h-40 min-h-20 w-[100%] resize-none rounded-xl bg-gray-700 px-4 py-4 text-xl text-white`,
  button: `rounded-xl bg-[#395dff] px-6 text-white hover:bg-green-500`,
};
const SendMessage = ({ scroll }) => {
  const [input, setInput] = useState("");
  const [isOpenPicker, setIsOpenPicker] = useState(false);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      await sendMessage(e);
    } else if (
      (e.key === "Enter" && e.ctrlKey) ||
      (e.key === "Enter" && e.metaKey)
    ) {
      setInput((prev) => prev + "\n");
    }
  };

  const togglePicker = () => {
    setIsOpenPicker(!isOpenPicker);
  };

  const sendMessage = async (e) => {
    if (input.trim() === "") {
      alert("Please enter a valid message");
      return;
    }
    e.preventDefault();
    await sendMessageToDb(input);
    setInput("");

    if (scroll?.current) {
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }
  };

  const handleEmojiClick = (emojiData) => {
    setInput((previousInput) => previousInput + emojiData.emoji);
  };

  return (
    <>
      <form onSubmit={sendMessage} className={style.form}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsOpenPicker(false)}
          onKeyDown={handleKeyDown}
          className={style.textarea}
          type="text"
          placeholder="Type a message..."
        />
        <div className="flex justify-between">
          <EmojiButton onClick={togglePicker} />
          <button className={style.button} type="submit">
            Send
          </button>
        </div>
      </form>
      <EmojiPicker
        open={isOpenPicker}
        height={450}
        style={{ position: "absolute", bottom: "70px", left: "10px" }}
        onEmojiClick={handleEmojiClick}
      />
    </>
  );
};

export default SendMessage;
