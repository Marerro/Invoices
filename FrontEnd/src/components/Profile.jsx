import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ProfileCard from "./ProfileCard";
import avatar from "../../images/avatar.svg";

function Profile() {
  const { user, loading } = useContext(UserContext);

    if(loading) {
        return <h1>Loading...</h1>;
    }

  return (
    <>
     <ProfileCard name={user.name} email={user.email} avatar={avatar} />
     </>
    );
}

export default Profile;
