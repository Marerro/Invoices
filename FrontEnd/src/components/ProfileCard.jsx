import avatar from "../../images/avatar.svg";
function ProfileCard({ name, email }) {
  return (
    <>
    <img src={avatar} alt="" className="w-[100px] h-[100px] rounded-full" />
      <div className="text-white text-center grid items-center h-[20vh]"></div>
      <div className="mx-auto bg-[#1E2139] bg-opacity-80 h-[50vh] w-[25vw] border border-[#252945]">

        <div>
            <p className="text-white text-center text-[23px] pt-10">Username</p>
          <h1 className="text-gray-400 text-center text-[20px]">{name}</h1>

          <p className="text-white text-center text-[23px] pt-10">Email address</p>
          <h1 className="text-gray-400 text-center text-[20px]">{email}</h1>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
