import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ShoutOut from "../Models/ShoutOut";
import {
  addShoutOut,
  deleteShoutOut,
  getNameShoutOuts,
} from "../services/ShoutOutService";
import AddShoutOutForm from "./AddShoutOutForm";
import "./NamedShoutOutsPage.css";
import ShoutOutsList from "./ShoutOutsList";

interface RouteParams {
  name: string;
}

const NamedShoutOutsPage = () => {
  const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>([]);
  const { name } = useParams<RouteParams>();

  useEffect(() => {
    getShoutOutsByNameHandler(name);
  }, [name]);

  const getShoutOutsByNameHandler = (name: string): void => {
    getNameShoutOuts(name).then((response) => {
      setShoutOuts(response);
    });
  };

  const addShoutOutHandler = (shoutOut: ShoutOut): void => {
    addShoutOut(shoutOut).then(() => {
      getShoutOutsByNameHandler(name);
    });
  };

  const deleteShoutOutHandler = (id: string): void => {
    deleteShoutOut(id).then(() => {
      getShoutOutsByNameHandler(name);
    });
  };

  return (
    <div className="NamedShoutOutsPage">
      <h2>Shout Outs for {name}</h2>
      <Link className="links" to="/">
        Back to All Shoutouts
      </Link>
      <ShoutOutsList
        shoutOuts={shoutOuts}
        deleteShoutOutHandler={deleteShoutOutHandler}
      />
      <AddShoutOutForm
        addShoutOutHandler={addShoutOutHandler}
        recipient={name}
      />
    </div>
  );
};

export default NamedShoutOutsPage;
