interface IProps {
  title: string;
  image: string;
  imageSize?: string;
  direction: "ROW" | "COL";
}

const Logo = ({ image, title, imageSize, direction }: IProps) => {
  return (
    <div
      className={`${
        direction === "ROW" ? "flex" : "flex flex-col"
      } items-center gap-5   `}
    >
      <img
        className={` ${imageSize ? imageSize : "w-16 h-16"}  `}
        src={image}
      />
      <p className="text-4xl text-[#1A1F24] dark:text-white font-semibold">
        {title}
      </p>
    </div>
  );
};

export default Logo;
