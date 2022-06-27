import React from 'react'
import UserSidebar from "../pages/Sidebar/UserSidebar"

const UserDashboard = () => {
    return (
        <>
            <div style={{ width: "30%" }}>
                <UserSidebar />
            </div>
            <div style={{ width: "70%" }}>
                <h1 style={{marginLeft:"50%"}}>Welome to user Dashboard</h1>
            </div>
        </>
    )
}

export default UserDashboard
