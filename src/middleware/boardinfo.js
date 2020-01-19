const Trello = require("trello");
const cfg = require("../config");

const trello = new Trello(cfg.trello.key, cfg.trello.token);

module.exports = async (req, _, next) => {
  // First thing we need to do is pull some data from the Trello
  // server to add to our request object.
  const boards = await trello.getBoards("me").catch(err => {
    console.error(err);
    res.end(error);
  });

  for (const board of boards) {
    if (board.name.toLowerCase() === cfg.trello.board.name.toLowerCase()) {
      // Set extra properties on the request object.
      req.board = board.id;
      req.members = board.members;
      req.labels = new Map();
      req.fields = new Map();
      // Get the board labels
      const labels = await trello
        .getLabelsForBoard(board.id)
        .catch(err => console.error(err));
      labels.forEach(label => req.labels.set(label.name, label.id));

      // Get the board lists
      const lists = await trello.getListsOnBoard(board.id).catch(err => {
        console.error(err);
        res.end(err);
      });

      // If there's a list named backlog, save it to the
      // request object.
      for (const list of lists) {
        if (list.name.toLowerCase() === "backlog") {
          req.list = list.id;
          return next();
        }
      }
      req.list = null;
      return next();
    }
  }
  next();
};
