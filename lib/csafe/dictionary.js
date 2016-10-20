'use srict';

var commands = {}
  , flags = {};

flags = {
  ExtendedStartFlag : 0xF0,
  StandardStartFlag : 0xF1,
  StopFlag          : 0xF2,
  StuffFlag         : 0xF3,
};

commands['GetStatus'] = {
  id: 0x80,
  type: 'short'
};

commands['Reset'] = {
  id: 0x81,
  type: 'short'
};

commands['GoIdle'] = {
  id: 0x82,
  type: 'short'
};

commands['GoHaveID'] = {
  id: 0x83,
  type: 'short'
};

commands['GoInUse'] = {
  id: 0x85,
  type: 'short'
};

commands['GoFinished'] = {
  id: 0x86,
  type: 'short'
};

commands['GoReady'] = {
  id: 0x87,
  type: 'short'
};

commands['BadID'] = {
  id: 0x88,
  type: 'short'
};

commands['GetVersion'] = {
  id: 0x91,
  type: 'short'
};

commands['GetID'] = { // User identifier number.
  id: 0x92,
  type: 'short'
};

commands['GetUnits'] = {
  id: 0x93,
  type: 'short'
};

commands['GetSerial'] = {
  id: 0x94,
  type: 'short'
};

commands['GetList'] = {
  id: 0x98,
  type: 'short'
};

commands['GetUtilization'] = { // Utilization is the duraction of the current workout.
  id: 0x99,
  type: 'short'
};

commands['GetMotorCurrent'] = {
  id: 0x9A,
  type: 'short'
};

commands['GetOdometer'] = {
  id: 0x9B,
  type: 'short'
};

commands['GetErrorCode'] = {
  id: 0x9C,
  type: 'short'
};

commands['GetServiceCode'] = {
  id: 0x9D,
  type: 'short'
};

commands['GetUserCfg1'] = {
  id: 0x9E,
  type: 'short'
};

commands['GetUserCfg2'] = {
  id: 0x9F,
  type: 'short'
};

commands['GetTWork'] = {
  id: 0xA0,
  type: 'short'
};

commands['GetHorizontal'] = { // Work distance of workout.
  id: 0xA1,
  type: 'short'
};

commands['GetVertical'] = {
  id: 0xA2,
  type: 'short'
};

commands['GetCalories'] = {  // Accumulated calories burned.
  id: 0xA3,
  type: 'short'
};

commands['GetProgram'] = {
  id: 0xA4,
  type: 'short'
};

commands['GetSpeed'] = {
  id: 0xA5,
  type: 'short'
};

commands['GetPace'] = {  // Time elapsed per unit distance for a given stroke.
  id: 0xA6,
  type: 'short'
};

commands['GetCadence'] = {  // Strokes per minute for per stroke.
  id: 0xA7,
  type: 'short'
};

commands['GetGrade'] = {
  id: 0xA8,
  type: 'short'
};

commands['GetGear'] = {
  id: 0xA9,
  type: 'short'
};

commands['GetUpList'] = {
  id: 0xAA,
  type: 'short'
};

commands['GetUserInfo'] = {
  id: 0xAB,
  type: 'short'
};

commands['GetTorque'] = {
  id: 0xAC,
  type: 'short'
};

commands['GetHRCur'] = {  // Current heart beats per minute.
  id: 0xB0,
  type: 'short'
};

commands['GetHRTZone'] = {
  id: 0xB2,
  type: 'short'
};

commands['GetMETS'] = {
  id: 0xB3,
  type: 'short'
};

commands['GetPower'] = {  // Power generated based on the pace per stroke.
  id: 0xB4,
  type: 'short'
};

commands['GetHRAvg'] = {
  id: 0xB5,
  type: 'short'
};

commands['GetHRMax'] = {
  id: 0xB6,
  type: 'short'
};

commands['GetUserData1'] = {
  id: 0xBE,
  type: 'short'
};

commands['GetUserData2'] = {
  id: 0xBF,
  type: 'short'
};

commands['GetAudioChannel'] = {
  id: 0xC0,
  type: 'short'
};

commands['GetAudioVolume'] = {
  id: 0xC1,
  type: 'short'
};

commands['GetAudioMute'] = {
  id: 0xC2,
  type: 'short'
};

commands['DisplayPopup7'] = {
  id: 0xE1,
  type: 'short'
};

commands['PMGetWorkoutType'] = {
  id: 0x89,
  type: 'long'
};

commands['PMGetWorkTime'] = {  // Work time duration of workout.
  id: 0xA0,
  type: 'long'
};

commands['PMGetWorkDistance'] = {  // Work distance of workout.
  id: 0xA3,
  type: 'long'
};

commands['PMGetStrokeState'] = {
  id: 0xBF,
  type: 'long'
};

commands['PMGetDragFactor'] = {
  id: 0xC1,
  type: 'long'
};

module.exports = {
  flags: flags,
  commands: commands
};
