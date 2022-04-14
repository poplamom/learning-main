import React from 'react'
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom'
import Signin from './Signin'
import FirstPage from './FirstPage'
import UserProfile from './dashboard/UserProfile'
import AllModule from './dashboard/AllModule'
import ModuleDetail from './dashboard/ModuleDetail'
import LeaningDetail from './dashboard/Leaning/LeaningDetail'
import AdminProfile from './dashboard/admin/AdminProfile'
import CrateRoom from './dashboard/admin/CrateRoom'
import UpdateRoom from './dashboard/admin/UpdateRoom'
import TaskSetting from './dashboard/admin/TaskSetting'
import UserSetting from './dashboard/admin/UserSetting'
import UpdateUser from './dashboard/admin/UpdateUser'
import SettingProfile from './dashboard/SettingProfile'

import SignUp from './Signup'
import StaticCourse from './dashboard/admin/StaticCourse'
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <FirstPage></FirstPage>
      </Route>
      <Route path="/Signin">
        <Signin></Signin>
      </Route>
      <Route path="/SignUp">
        <SignUp></SignUp>
      </Route>
      <Route path="/userprofile">
        <UserProfile></UserProfile>
      </Route>
      <Route path="/adminprofile">
        <AdminProfile></AdminProfile>
      </Route>
      <Route path="/moduledetail/:id">
        <ModuleDetail></ModuleDetail>
      </Route>
      <Route path="/LeaningDetail/:id">
        <LeaningDetail></LeaningDetail>
      </Route>
      <Route path="/allmodule">
        <AllModule></AllModule>
      </Route>
      <Route path="/createroom">
        <CrateRoom></CrateRoom>
      </Route>
      <Route path="/usersetting">
        <UserSetting></UserSetting>
      </Route>
      <Route path="/updateuser/:id">
        <UpdateUser></UpdateUser>
      </Route>

      <Route path="/tasksetting/:id">
        <TaskSetting></TaskSetting>
      </Route>
      <Route path="/staticcourse/:id">
        <StaticCourse></StaticCourse>
      </Route>
      <Route path="/updateroom/:id">
        <UpdateRoom></UpdateRoom>
      </Route>
      <Route path="/updateuser">
        <UpdateUser></UpdateUser>
      </Route>
      <Route path="/settingprofile">
        <SettingProfile></SettingProfile>
      </Route>
    </Switch>
  )
}
