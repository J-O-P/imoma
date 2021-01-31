import React from "react"
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom"

//import { createStore, applyMiddleware } from "redux"
//import { composeWithDevTools } from "redux-devtools-extension"

//import { Provider } from "react-redux"
//import thunk from "redux-thunk"
//import logger from "redux-logger"
//import { rootReducer } from "../redux/rootReducer"

//import { MyErrorBoundary } from "../shared/utilities"

import { HomePage } from "./home/Homepage"
import { Footer } from "./Footer"
import { HeaderMenu } from "./HeaderMenu"
import { NewBookingPage } from "./newBooking/NewBookingPage"
//import { TestFormikTutorial } from "./TestFormikTutorial"
//import { GuestPage } from "../pages/GuestPage"
import { TestPage } from "./TestPage"
//import { ActivitiesPage } from "../pages/ActivitiesPage"
import { BookingListPage } from "./bookingList/BookingListPage"
//import { PaymentsPage } from "../pages/PaymentsPage" 
//import { BookingPage } from "../pages/BookingPage"
import { DetailsPage } from "./booking/DetailsPage"

/*
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
)*/

export const Main: React.FC<{}> = () => {
  return (
      <BrowserRouter>
        <HeaderMenu />
        <Switch>
          <Route path="/today" component={HomePage} />
          <Route path="/bookings" component={BookingListPage} />
          <Route path="/booking/new" component={NewBookingPage} />
          <Route
            exact
            path="/booking/:mandant/:apartment/:bookingId"
            component={DetailsPage}
          />
          <Route path="/test" component={TestPage} />
          <Redirect to="/today" />
        </Switch>
        <Footer />
      </BrowserRouter>
  )
}
