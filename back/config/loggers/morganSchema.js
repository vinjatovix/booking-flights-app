'use strict';

const morganSchema = `ACCESS: {date: :date[web],head: { HTTP/:http-version, access: :status, method: :method, ip: :remote-addr },url: :url,res: :res[content-length],ref: :referrer,agent: :user-agent}`;
module.exports = { morganSchema };
