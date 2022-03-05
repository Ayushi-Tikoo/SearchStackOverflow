const express = require('express');
const cors = require('cors');
const axios = require('axios');
const runQuery = require('./src/db/db');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get('/search/:title', async (req, res) => {
  try {
    const data = await axios.get(
      'https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=' +
        req.params.title +
        '&site=stackoverflow'
    );
    const searchData = data.data.items;
    searchData.forEach(async (data) => {
      const tags = data.tags.toString();
      const is_answered = data.is_answered;
      const last_activity_date = data.last_activity_date;
      const title = data.title.toString();
      const query = `INSERT INTO search(title, is_answered, last_activity, tags, search_string) VALUES('${title}','${is_answered}','${last_activity_date}','${tags}', '${req.params.title.toString()}')`;
      const result = await runQuery(query);
    });

    return res.status(200).json({ msg: data.data.items });
  } catch (error) {
    return res.status(200).json({ msg: error });
  }
});

app.listen(PORT, () => {
  console.log('Listening on port 5000');
});
