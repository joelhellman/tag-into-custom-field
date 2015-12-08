(function() {

  return {
    ready: false,
    settings: {
      customFieldId: null,
      regex: null,
      textify: false
    },

    events: {
      'app.activated': 'onAppActivated',
      'ticket.tags.changed': 'processChangedTags'
    },

    onAppActivated: function(app) {
      if (app.firstLoad) {
        _.defer(this.initialize.bind(this));
      }
    },

    initialize: function() {
      this.settings.regex = this.setting('regex');
      this.settings.textify = this.setting('textify');
      this.settings.customFieldId = this.setting('custom_field_id');
      this.ready = true;
    },

    processChangedTags: function(e) {
      if (!this.ready) return;
      var ticket = this.ticket();
      var matches = [];
      var value;

      _.each(ticket.tags(), function(tag) {
        value = (tag.match(this.settings.regex) || [])[1] || null;
        if (value) {
          matches.push(value);
          ticket.tags().remove(tag);
        }
      }, this);

      // workaround the bug that tags().remove() doesn't update ui
      ticket.tags(ticket.tags());

      _.each(matches, function(match) {
        this.setCustomFieldValue(match);
      }, this);

    },

    setCustomFieldValue: function(value) {
      if (this.settings.textify) {
        value = value.replace(/_/g,' ');
      }
      this.ticket().customField(helpers.fmt("custom_field_%@", this.settings.customFieldId), value);
    }

  };

}());
