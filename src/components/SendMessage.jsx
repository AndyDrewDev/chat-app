import { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import EmojiButton from "./EmojiButton";
import { sendMessageToDb } from "../utils/sendMessageToDb";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

const style = {
  form: `w-full bg-gray-800 p-2 md:p-3 text-base md:text-xl rounded-t-lg sticky bottom-0`,
  bottomContent: `flex justify-between items-center`,
  textarea: `mb-2 field-sizing-content max-h-20 md:max-h-40 min-h-[40px] w-[100%] resize-none rounded-xl bg-gray-700 px-3 md:pr-4 py-2 md:py-4 text-base md:text-xl text-white`,
  button: `rounded-xl bg-[#395dff] px-3 md:px-6 py-1 md:py-2 text-white hover:bg-green-500 text-sm md:text-base`,
  buttonsContainer: `flex justify-end items-center`,
  emojiButtonContainer: `flex justify-start items-center z-10`,
};

const SendMessage = () => {
  const [input, setInput] = useState("");
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { updateLastSeen } = useOnlineStatus();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleKeyDown = async (e) => {
    if (
      e.key === "Enter" &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey &&
      !isMobile
    ) {
      e.preventDefault();
      updateLastSeen();
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
    e.preventDefault();
    if (input.trim() === "") {
      alert("Please enter a valid message");
      return;
    }
    if (e.type === "submit") {
      updateLastSeen();
    }
    await sendMessageToDb(input);
    setInput("");
    setIsOpenPicker(false);
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
          rows={2}
        />
        <div className={style.bottomContent}>
          <EmojiButton onClick={togglePicker} />
          <button className={style.button} type="submit">
            Send
          </button>
        </div>
      </form>
      <EmojiPicker
        open={isOpenPicker}
        height={450}
        width={isMobile ? "75%" : undefined}
        style={{
          position: "absolute",
          bottom: "150px",
          left: "10px",
          zIndex: 30,
          maxWidth: "calc(100% - 20px)",
        }}
        onEmojiClick={handleEmojiClick}
      />
    </>
  );
};

export default SendMessage;
