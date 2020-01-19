const app = require("express");
const Trello = require("trello");
const fetch = require("node-fetch");
const moment = require("moment");
const cfg = require("../config");

const trello = new Trello(cfg.trello.key, cfg.trello.token);
const router = app.Router();

router.post("/", async (req, res) => {
  const desc = `**Account Name:** ${req.body.acct}\n\n---\n**Character Name:** ${req.body.char}\n**dbref:** ${req.body.dbref}\n\n---\n${req.body.body}`;
  const idLabels = req.labels.get(req.body.bucket) || req.labels.get("NONE");
  let card = await trello.addCardWithExtraParams(
    req.body.title,
    {
      idLabels,
      desc,
      due: moment()
        .add(48, "hours")
        .toDate()
    },
    req.list
  );

  res.json(card);
});

module.exports = router;
