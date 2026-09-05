import type { UserProps } from "../types/common.types";

export default function Profile({ user, isProfilePage = false }: UserProps) {
  const { name, imageSize, imageUrl, height = 100 } = user;
  const userName = `Profile of ${user.name}`;

  const style = {
    width: imageSize,
    height: height,
  };

  return (
    <>
      <h1>{name}</h1>
      {isProfilePage && <p>{userName}</p>}
      <img className="avatar" src={imageUrl} alt={userName} style={style} />
    </>
  );
}
