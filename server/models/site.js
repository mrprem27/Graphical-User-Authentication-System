const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = mongoose.Schema({
    name: { type: String, default: 'gawds' },
    pool: [{ type: String }],
    poolLength: { type: Number, default: 0 }
});

const Site = mongoose.model('Site', siteSchema);
module.exports = Site;