'use strict';

//? Este es el formato con el que los mensajes de morgan se guardan en el log

// const morganSchema = `ACCESS: :status - ip: :remote-addr - method: :method - url: :url - user: :remote-user - HTTP/:http-version - res: :res[content-length] - ref :referrer - agent: :user-agent - :date[web]`;
const morganSchema = `{date: :date[web],head: { HTTP/:http-version, access: :status, method: :method, ip: :remote-addr },url: :url,res: :res[content-length],ref: :referrer,agent: :user-agent}`;
module.exports = { morganSchema };
