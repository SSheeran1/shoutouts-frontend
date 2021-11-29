import { FormEvent, useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import ShoutOut from "../Models/ShoutOut";
import "./AddShoutOutForm.css";
import { storage } from "../firebaseConfig";
import { ref } from "@firebase/storage";
import { getDownloadURL, uploadBytes } from "firebase/storage";

interface Props {
  addShoutOutHandler: (shoutOut: ShoutOut) => void;
  recipient?: string;
}

const AddShoutOutForm = ({ addShoutOutHandler, recipient }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useContext(AuthContext);

  const [to, setTo] = useState(recipient || "");
  const [from, setFrom] = useState(user?.displayName || "");
  const [message, setMessage] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    let shoutOut: ShoutOut = {
      to,
      from,
      message,
      ...(user?.photoURL ? { photoURL: user.photoURL } : {}),
    };
    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0]; // Here is the file we need
      const storageRef = ref(storage, file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((response) => {
          shoutOut.image = response;
          addShoutOutHandler(shoutOut);
        });
      });
    } else {
      addShoutOutHandler(shoutOut);
    }
  };

  return (
    <form className="AddShoutOutForm" onSubmit={submitHandler}>
      <h2>Leave a Shout Out</h2>
      <label htmlFor="to">To</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
        }}
      />
      <label htmlFor="from">From</label>
      <input
        type="text"
        name="from"
        id="from"
        disabled
        value={from}
        onChange={(e) => {
          setFrom(e.target.value);
        }}
      />
      <label htmlFor="message">Message</label>
      <textarea
        name="message"
        id="message"
        cols={30}
        rows={10}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></textarea>
      <input ref={fileInputRef} type="file" />
      <button>Add Shout Out</button>
    </form>
  );
};

export default AddShoutOutForm;
