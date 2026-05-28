import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Contacts } from "./pages/Contacts";
import { AddContact } from "./pages/AddContact";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";

//create your first component
const Layout = () => {
    	//the basename is used when your project is published in a subdirectory and not in the root of the domain
    	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    	const basename = process.env.BASENAME || "";

    	return (
            		<div>
                    			<BrowserRouter basename={basename}>
                                				<ScrollToTop>
                                                					<Navbar />
                                                					<Routes>
                                                                    						<Route element={<Contacts />} path="/" />
                                                                    						<Route element={<AddContact />} path="/add" />
                                                                    						<Route element={<AddContact />} path="/edit/:id" />
                                                                    						<Route element={<h1>Not found!</h1>h1>} />
                                                                                            </Route>Routes>
                                                                    </Routes>ScrollToTop>
                                                </ScrollToTop>BrowserRouter>
                                </BrowserRouter>div>
                    	);
                        };
                    
                    export default injectContext(Layout);</div>
