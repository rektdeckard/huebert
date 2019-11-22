import * as LightActions from './lightActions';
import * as RoomActions from './roomActions';
import * as SceneActions from './sceneActions';
import * as ScheduleActions from './scheduleActions';
import * as RuleActions from './ruleActions';
import * as SensorActions from './sensorActions';
import * as InitActions from './initActions';

export const fetchLights = LightActions.fetchLights;
export const setLight = LightActions.setLight;
export const alertLight = LightActions.alertLight;
export const toggleLight = LightActions.toggleLight;
export const setActiveLight = LightActions.setActiveLight;

export const fetchRooms = RoomActions.fetchRooms;
export const setRoom = RoomActions.setRoom;
export const alertRoom = RoomActions.alertRoom;
export const toggleRoom = RoomActions.toggleRoom;
export const setActiveRoom = RoomActions.setActiveRoom;

export const fetchScenes = SceneActions.fetchScenes;

export const fetchSchedules = ScheduleActions.fetchSchedules;

export const fetchRules = RuleActions.fetchRules;

export const fetchSensors = SensorActions.fetchSensors;

export const initializeApp = InitActions.initializeApp;
export const resetApp = InitActions.resetApp;
export const createUser = InitActions.createUser;