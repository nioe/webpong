if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to webpong.";
  };

  Template.client.saySomething = function() {
    return "This is a Client Screen!";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Meteor.startup(function() {
    document.body.insertAdjacentHTML('beforeend', Template.client());
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
