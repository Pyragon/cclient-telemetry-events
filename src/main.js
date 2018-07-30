const dateFormat = require('dateformat');

var _telemetry = function() {

  var events = [];

  var updated;

  function addEvent(name) {
    events.unshift({
      name,
      time: new Date().getTime()
    });
    ui.getPlugins().updateDom('cclient-telemetry-events');
  }

  return {

    init: (config) => {
      ui.getTelemetry().subscribeToEvents([{
        name: 'logged_in',
        callback: (data) => {
          addEvent('logged_in');
        }
      }, {
        name: 'logged_out',
        callback: (data) => {
          addEvent('logged_out');
        }
      }]);
    },

    getDom: () => {

      var container = document.createElement('div');

      var title = document.createElement('p');
      title.id = 'telemetry-title';
      title.innerHTML = 'Telemetry Events';

      container.appendChild(title);

      if (userData == null) {
        var loader = document.createElement('div');
        loader.id = 'latest-loader';
        var spinner = document.createElement('i');
        spinner.className = 'fa fa-spinner fa-spin';

        loader.appendChild(spinner);
        container.appendChild(loader);
        return container;
      } else if (userData != null && events.length <= 0) {
        var noEvents = document.createElement('p');
        noEvents.id = 'no-events';
        noEvents.innerHTML = 'No events fired yet...';

        container.appendChild(noEvents);

        return container;
      }

      for (var i = 0; i < events.length; i++) {
        var event = events[i];

        var firedEvent = document.createElement('div');
        firedEvent.className = 'fired-event';

        var eventTitle = document.createElement('p');
        eventTitle.className = 'event-title';
        eventTitle.innerHTML = event.name;

        var eventTime = document.createElement('p');
        eventTime.className = 'event-time';
        var eventLine = 'Fired at ';
        eventLine += dateFormat(event.time, 'h:MM:ss TT');
        eventTime.innerHTML = eventLine;

        firedEvent.appendChild(eventTitle);
        firedEvent.appendChild(eventTime);

        container.appendChild(firedEvent);

      }
      return container;
    },

    update: () => {
      if (userData != null && !updated) {
        updated = true;
        ui.getPlugins().updateDom('cclient-telemetry-events');
      }
    },

    getName: () => {
      return 'cclient-telemetry-events';
    },

    getDelay: () => {
      return 1000;
    },

    getStylesheets: () => {
      return ['styles/style.css'];
    }

  };
};
module.exports = _telemetry;