// import { useParams } from 'react-router-dom';
import P4pHeader from "./P4pHeader";

function Profile({ user,leagueName, appLeagues,ufcResults ,weRlive,results2 ,menow, tapImage, onLogout }) {
//   const {  } = useParams();




  

  return (
    <>
    <P4pHeader onLogout={onLogout} user={user} />
    { user ? 
    <div className="bg-white"><h1 className="text-align-center fs45">{user?.username} {user?.userName}</h1>

    <div className="flex"><div className="RightOne text-align-center">
    {/* <p>Hello, </p> */}
    <p className="pt5">{user?.fullname}</p>
    <p className="pt5">{user?.email}</p>
    {/* <p></p> */}</div>

    <div className="LeftOne">
    <h1 className="ProfilePicPreview" style={{
                        textAlign:'center',
                        margin:' 0 10%',
                        backgroundImage: `url(${user?.image || 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'})`

                      }} alt={`${user?.image}}`}></h1>
     </div>                 
    </div>


    <div style={{paddingTop:'1%',paddingBottom:'5%'}}className="element-with-border3"></div></div>
    
    : <div className="snowwhite marginTop20 flex" >
    <p className="pt5">Please Sign In to view your Profile </p> <h1 className="fs65">&#8599;</h1>
    </div> }
    </>
  );
}

export default Profile;