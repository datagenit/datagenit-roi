import React from "react";
import "./assets/css/core.css";
import "./assets/css/theme-default.css";
import "./assets/css/demo.css";

import Login from "./component/Login";
import Logout from "./component/Logout";
import PageNotFound from "./component/PageNotFound";

import Index from "./component/dashboard/Index";
import UserBalanceHistory from "./component/dashboard/profile/UserBalanceHistory";

import DetailsReport from "./component/admin/report/DetailsReport";
import SummaryReport from "./component/admin/report/SummaryReport";
import NewSummaryReport from "./component/admin/report/NewSummaryReport";
import SummarySernderWiseReport from "./component/admin/report/SummarySernderWiseReport";
import SummaryDateWiseReport from "./component/admin/report/SummaryDateWiseReport";
import GlobalSearch from "./component/admin/report/GlobalSearch";

import AdminDashboard from "./component/admin/AdminDashboard";
import AddUser from "./component/admin/user/AddUser";
import UsersList from "./component/admin/user/UsersList";
import AddBalance from "./component/admin/user/AddBalance";
import BalanceHistory from "./component/admin/user/BalanceHistory";
import UserServerDetails from "./component/admin/user/UserServerDetails";

import AddSmsc from "./component/admin/smsc/AddSmsc";
import Smsc from "./component/admin/smsc/Smsc";

import KannelStatusReport from "./component/admin/kannel/StatusReport";
import KannelSmscReport from "./component/admin/kannel/SmscReport";

import Manager from "./component/admin/manager/Manager";
import CreateManager from "./component/admin/manager/CreateManager";

import Company from "./component/admin/company/Company";
import AddCompany from "./component/admin/company/AddCompany";


import UserSummaryReport from "./component/dashboard/report/UserSummaryReport";
import userDetailsReport from "./component/dashboard/report/UserDetailsReport";
import DownloadReport from "./component/dashboard/download/DownloadReport";
import MyProfile from "./component/dashboard/profile/MyProfile";
import SenderIDReport from "./component/dashboard/report/SenderIDReport";
import SerndeIDWiseDetailsReport from "./component/dashboard/report/SerndeIDWiseDetailsReport";
import DateWiseSummaryReport from "./component/dashboard/report/DateWiseSummaryReport";

import AdminProtected from "./component/Utils/AdminProtected";
import Protected from "./component/Utils/Protected";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Public Route */}
          <Route exact path="/" component={Login} />
          <Route exact path="/logout" component={Logout} />

          {/* admin */}

          <Protected exact path="/dashboard" component={Index} />

          <Protected
            exact
            path="/dashboard/details-report"
            component={userDetailsReport}
          />

          <Route
            path="/dashboard/serderid-details-report/:sender/:dateform/:dateto"
            render={(props) => <SerndeIDWiseDetailsReport {...props} />}
          ></Route>

          <Protected
            exact
            path="/dashboard/summary-report"
            component={UserSummaryReport}
          />
          <Protected
            exact
            path="/dashboard/date-wise-summary-report"
            component={DateWiseSummaryReport}
          />
          <Protected
            exact
            path="/dashboard/balance-history"
            component={UserBalanceHistory}
          />

          <Route
            path="/dashboard/senderid-report/:header"
            render={(props) => <SenderIDReport {...props} />}
          ></Route>

          <Protected
            exact
            path="/dashboard/download-report"
            component={DownloadReport}
          />
          <Protected exact path="/dashboard/profile" component={MyProfile} />

          {/* admin */}

          <AdminProtected exact path="/admin" component={AdminDashboard} />
          <AdminProtected exact path="/admin/user-list" component={UsersList} />
          <AdminProtected exact path="/admin/add-user" component={AddUser} />
          <AdminProtected
            exact
            path="/admin/balance-history"
            component={BalanceHistory}
          />
          <AdminProtected exact path="/admin/add-smsc" component={AddSmsc} />
          <AdminProtected exact path="/admin/smsc" component={Smsc} />
          <AdminProtected
            exact
            path="/admin/summary-report"
            component={SummaryReport}
          />
          <AdminProtected
            exact
            path="/admin/summary-sender-report/:username/:dateform/:dateto"
            component={SummarySernderWiseReport}
          />
          <AdminProtected
            exact
            path="/admin/summary-date-wise/"
            component={SummaryDateWiseReport}
          />
          <AdminProtected
            exact
            path="/admin/global-search/"
            component={GlobalSearch}
          />
          <AdminProtected
            exact
            path="/admin/summary-date-report/:username/:dateform/:dateto"
            component={SummaryDateWiseReport}
          />
          <AdminProtected
            exact
            path="/admin/new-summary-report"
            component={NewSummaryReport}
          />

          <AdminProtected
            exact
            path="/admin/details-report"
            component={DetailsReport}
          />
          <Route
            path="/admin/details-report/:setuserid/:setsernderid/:dateform/:dateto"
            render={(props) => <DetailsReport {...props} />}
          ></Route>
          <AdminProtected
            exact
            path="/admin/smsc-report"
            component={KannelStatusReport}
          />

          <AdminProtected
            exact
            path="/admin/esme-report"
            component={KannelSmscReport}
          />


          <AdminProtected exact path="/admin/manager" component={Manager} />
          <AdminProtected
            exact
            path="/admin/add-manager"
            component={CreateManager}
          />


          <AdminProtected exact path="/admin/company" component={Company} />
          <AdminProtected
            exact
            path="/admin/add-company"
            component={AddCompany}
          />
          <Route
            path="/admin/add-company/view-edit/:id"
            render={(props) => <AddCompany {...props} />}
          ></Route>

          <Route
            path="/admin/user-list/:id"
            render={(props) => <UsersList {...props} />}
          ></Route>

          <Route
            path="/admin/add-manager/view-edit/:id"
            render={(props) => <CreateManager {...props} />}
          ></Route>

          <Route
            path="/admin/add-balance/:username/:balance"
            render={(props) => <AddBalance {...props} />}
          ></Route>

          <Route
            path="/admin/add-user/view/:username"
            render={(props) => <UserServerDetails {...props} />}
          ></Route>

          <Route
            path="/admin/add-user/edit/:username/:ip"
            render={(props) => <AddUser {...props} />}
          ></Route>

          <Route
            path="/admin/smsc/edit-view/:id"
            render={(props) => <AddSmsc {...props} />}
          ></Route>

          <Route exact component={PageNotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
