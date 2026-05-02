import logo from "../assets/logo.jpg";

function Logo({ width = "100px" }) {
  return (
    <div
      className="flex items-center"
      style={{ width }}
    >
      <img
        src={logo}
        alt="logo"
        className="w-full h-auto object-contain"
      />
    </div>
  );
}

export default Logo;