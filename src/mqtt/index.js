const mqtt = require('mqtt');
const common = require('@bgroves/common');

var mqttClient;
var { MQTT_SERVER,MQTT_PORT } = process.env;

module.exports = function (app) {
  common.log(`MQTT_SERVER=${MQTT_SERVER},MQTT_PORT=${MQTT_PORT}`);
  mqttClient = mqtt.connect(`mqtt://${MQTT_SERVER}:${MQTT_PORT}`);

  mqttClient.on('connect', function () {
    mqttClient.subscribe('Alarm13319-1', function (err) {
      if (!err) {
        common.log('tool13319api subscribed to: Alarm13319-1');
      }
    });
    mqttClient.subscribe('Alarm13319-2', function (err) {
      if (!err) {
        common.log('tool13319api subscribed to: Alarm13319-2');
      }
    });
  });
  // message is a buffer
  mqttClient.on('message', function (topic, message) {
    const p = JSON.parse(message.toString()); // payload is a buffer
    common.log(`tool13319api.mqtt=>${message.toString()}`);
    // let msg;
    // if ('Kep13319' == topic) {
    //   app
    //     .service('kep13319')
    //     .update(p.updateId, { updateId:p.updateId,value: p.value,transDate: p.transDate })
    //     .then(async (res) => {
    //       common.log(`updated kep13319 updateId=${p.updateId}, value=${p.value}. transDate=${p.transDate}`);
    //     })
    //     .catch((e) => {
    //       console.error('Authentication error', e);
    //     });
    // }
  });
};
/*
app
  .service('users')
  .create({
    email: 'user@buschegroup.com',
    password: 'password',
    userName: 'bgroves',
    firstName: 'Brent',
    lastName: 'Groves',
    isAdmin: true,
    roles: ['Admin', 'Manager', 'Quality']
  })
  .then(async res => {
    console.log('created user!');
  })
  .catch(e => {
    console.error('Authentication error', e);
  });
*/
