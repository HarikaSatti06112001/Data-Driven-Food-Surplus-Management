import React, { useState } from "react";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
	let defaultUserInfo = {
		user_email: "",
		user_kind: ""
	}	
	const [userInfo, setUserInfo] = useState(defaultUserInfo);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		<Context.Provider value={{ isLoggedIn, setIsLoggedIn,userInfo,setUserInfo }}>
			{children}
		</Context.Provider>
	);
};
