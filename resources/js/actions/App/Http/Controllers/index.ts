import DashboardController from './DashboardController'
import Settings from './Settings'
import Auth from './Auth'
import UserController from './UserController'
import ReservationController from './ReservationController'
import ActiveDispatchController from './ActiveDispatchController'
import FleetController from './FleetController'
import AnnouncementController from './AnnouncementController'
import Driver from './Driver'
import SystemLogController from './SystemLogController'
import MyReservationController from './MyReservationController'
import MyActiveReservationsController from './MyActiveReservationsController'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
Settings: Object.assign(Settings, Settings),
Auth: Object.assign(Auth, Auth),
UserController: Object.assign(UserController, UserController),
ReservationController: Object.assign(ReservationController, ReservationController),
ActiveDispatchController: Object.assign(ActiveDispatchController, ActiveDispatchController),
FleetController: Object.assign(FleetController, FleetController),
AnnouncementController: Object.assign(AnnouncementController, AnnouncementController),
Driver: Object.assign(Driver, Driver),
SystemLogController: Object.assign(SystemLogController, SystemLogController),
MyReservationController: Object.assign(MyReservationController, MyReservationController),
MyActiveReservationsController: Object.assign(MyActiveReservationsController, MyActiveReservationsController),
}

export default Controllers