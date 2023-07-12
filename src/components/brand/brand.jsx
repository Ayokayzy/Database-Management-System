import { Link } from "react-router-dom";

const Brand = ({ height, white }) => {
  return (
    <Link to={"/"}>
      {white ? (
        <img
          src={require("../../assets/brand.png")}
          alt=""
          className={`${height || "h-10"}`}
        />
      ) : (
        <img
          src={require("../../assets/brand.png")}
          alt=""
          className={`${height || "h-10"}`}
        />
      )}
    </Link>
  );
};

export default Brand;
