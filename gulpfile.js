const fetch = require("node-fetch");
var fs = require("fs");
var gulp = require("gulp");
// import fetch from "node-fetch";

const TOKEN = "";

const fetchStatData = async (id) => {
  try {
    const res = await fetch(
      `https://lv001-abia.inecelectionresults.ng/api/v1/elections/63f8f25b594e164f8146a213/lga/state/${id}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        "Content-Type": "application/json",
      }
    );
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
};

async function defaultTask(cb) {
  // place code for your default task here
  const promises = [];

  for (let index = 1; index < 38; index++) {
    promises.push(fetchStatData(index));
  }

  const results = await Promise.all(promises);
  // console.log(results);
  const states = [],
    lgas = [],
    wards = [];

  results.forEach((r) => {
    if (r && r.data) {
      const data = r.data;
      const { name, state_id, _id } = data[0].state;
      states.push({ name, state_id, _id });

      data.forEach((d) => {
        const { name, lga_id, _id, state_id, state } = d.lga;
        lgas.push({ name, lga_id, _id, state_id, state });
        wards.push(...d.wards);
      });
    }
  });

  // console.log(states);
  writeToFile("states.json", states, cb);
  writeToFile("lgas.json", lgas, cb);
  writeToFile("wards.json", wards, cb);
}

const writeToFile = (name, content, cb = () => {}) => {
  fs.writeFile(`${__dirname}/src/assets/json/${name}`, JSON.stringify(content), { flag: "w" }, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    cb();
  });
};

exports.default = defaultTask;
