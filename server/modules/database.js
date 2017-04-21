module.exports = {
  process: require('child_process'),

  exec: function(command, callback) {
    let child = this.process.exec(command, function (error, stdout, stderr) {
      if (error !== null) {
        console.log(stderr);
      } else {
        callback(stdout);
      }
    });
  },

  load: function(name) {
    this.name = name;

    // 1. check branch {name} exists
    // 2. if not, pull branch or create branch
    // 3. if still no branch

    this.exec('git show-ref refs/heads/' + name, function(result) {
      console.log(result);
      if (result == "") {
        console.log("not");
      }
    });

    return this;
  },

  addDirectory: function() {

  },

  addObject: function() {

  },

  updateObject: function() {

  },

  removeObject: function() {

  },
}
